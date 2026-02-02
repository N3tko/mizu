import { type Todo, todoTable } from '@mizu/minato-domain'
import { db } from '@mizu/minato-repository'

export const getTodos = async (): Promise<Todo[]> => {
  return await db.select().from(todoTable)
}
