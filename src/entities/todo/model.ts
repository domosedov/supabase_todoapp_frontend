import { createStore, createEffect, createEvent, sample } from 'effector'
import { supabase } from '~/supabase_client'
import { authModel } from '../auth'
import { CreateTodoSchema } from './schema'
import type { Todo } from './types'

export const $todos = createStore<Todo[]>([])

export const fetchTodosFx = createEffect<void, Todo[]>()

export const fetchTodos = createEvent()

fetchTodosFx.use(async () => {
  const { data, error } = await supabase.from<Todo>('todos').select()
  if (error) throw error
  return data ?? []
})

$todos.on(fetchTodosFx.doneData, (_, todos) => todos)

sample({
  clock: fetchTodos,
  target: fetchTodosFx,
})

// Create todo

export const createTodo = createEvent<CreateTodoSchema>()
const createTodoFx = createEffect<Partial<Todo>, void>(async inputs => {
  const result = await supabase.from<Todo>('todos').insert(inputs)
  console.log(result)
})

sample({
  clock: createTodo,
  source: authModel.$userId,
  filter: (userId): userId is string => userId !== null,
  fn: (user_id: string, inputs) => ({ ...inputs, user_id }),
  target: createTodoFx,
})
