import { type Todo, todoTable } from '@mizu/studio-domain'
import { db } from '@mizu/studio-repository'
import { eq } from 'drizzle-orm'

export const getTodo = async (todoId: string): Promise<Todo | undefined> => {
  return await db
    .select()
    .from(todoTable)
    .where(eq(todoTable.id, todoId))
    .then(([result]) => result)
}
