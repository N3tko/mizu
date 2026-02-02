import { type Todo, todoTable } from '@mizu/studio-domain'
import { db } from '@mizu/studio-repository'

export const getTodos = async (): Promise<Todo[]> => {
  return await db.select().from(todoTable)
}
