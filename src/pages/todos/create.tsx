import * as React from 'react'
import type { NextPage } from 'next'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateTodoSchema, createTodoSchema } from '~/entities/todo/schema'
import { useEvent } from 'effector-react/scope'
import { todoModel } from '~/entities/todo'

const CreateTodoPage: NextPage = () => {
  const create = useEvent(todoModel.createTodo)
  const { register, handleSubmit } = useForm<CreateTodoSchema>({
    resolver: zodResolver(createTodoSchema),
  })

  const titleId = React.useId()
  const descriptionId = React.useId()

  const onSubmit = handleSubmit(values => {
    console.log(values)
    create(values)
  })

  return (
    <div>
      <h1>Create todo</h1>

      <div>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor={titleId}>Tile</label>
            <input
              className='rounded-sm border p-2'
              type='text'
              {...register('title')}
              id={titleId}
            />
          </div>
          <div>
            <label htmlFor={descriptionId}>Tile</label>
            <textarea
              className='rounded-sm border p-2'
              {...register('description')}
              id={descriptionId}
            />
          </div>
          <button
            className='rounded-sm bg-emerald-500 px-6 py-2 text-sm font-bold uppercase text-white'
            type='submit'
          >
            Create todo
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateTodoPage
