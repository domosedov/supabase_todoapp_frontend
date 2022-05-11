import type { NextPage, GetServerSideProps } from 'next'
import Link from 'next/link'
import { fork, allSettled, serialize } from 'effector'
import { useStore } from 'effector-react/scope'
import { todoModel } from '~/entities/todo'
import { authModel } from '~/entities/auth'

export const getServerSideProps: GetServerSideProps = async ctx => {
  const scope = fork()

  await allSettled(authModel.getUserByCookie, { scope, params: ctx.req })
  await allSettled(todoModel.fetchTodos, { scope })

  const serialized = serialize(scope)

  return {
    props: {
      initialState: serialized,
    },
  }
}

const TodosPage: NextPage = () => {
  const todos = useStore(todoModel.$todos)
  return (
    <div className='container mx-auto px-2'>
      <h1 className='text-center text-3xl font-bold text-gray-800'>Todos</h1>
      <Link href='/todos/create'>
        <a>Create</a>
      </Link>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default TodosPage
