import * as React from 'react'
import type { NextPage } from 'next'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const todoSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().optional(),
  user_id: z.string(),
})

type Inputs = z.infer<typeof todoSchema>

const CreateTodoPage: NextPage = () => {
  const { register, handleSubmit } = useForm<Inputs>({
    resolver: zodResolver(todoSchema),
  })
  return (
    <div>
      <h1>Create todo</h1>
    </div>
  )
}

export default CreateTodoPage
