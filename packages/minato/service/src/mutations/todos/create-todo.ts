import { type Todo, type TodoInsert, todoTable } from '@mizu/minato-domain'
import { db } from '@mizu/minato-repository'

export const createTodo = async (data: TodoInsert): Promise<Todo | undefined> => {
  return await db
    .insert(todoTable)
    .values(data)
    .returning()
    .then(([result]) => result)
}
