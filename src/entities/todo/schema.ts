import { z } from 'zod'
import type { Todo } from './types'

export const createTodoSchema: z.ZodType<Pick<Todo, 'title' | 'description'>> = z.object({
  title: z.string().nonempty(),
  description: z.string().optional(),
})

export type CreateTodoSchema = z.infer<typeof createTodoSchema>
