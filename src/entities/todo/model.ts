import { createStore, createEffect, createEvent, sample } from "effector";
import { supabase } from "~/supabase_client";
import type { Todo } from "./types";

export const $todos = createStore<Todo[]>([]);

export const fetchTodosFx = createEffect<void, Todo[]>();

export const fetchTodos = createEvent();

fetchTodosFx.use(async () => {
  const { data, error } = await supabase.from<Todo>("todos").select();
  if (error) throw error;
  return data ?? [];
});

$todos.on(fetchTodosFx.doneData, (_, todos) => todos);

sample({
  clock: fetchTodos,
  target: fetchTodosFx,
});
