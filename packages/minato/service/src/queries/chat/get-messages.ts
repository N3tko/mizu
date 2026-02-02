import { type ChatMessage, chatMessageTable } from '@mizu/minato-domain'
import { db } from '@mizu/minato-repository'
import { desc } from 'drizzle-orm'

export const getChatMessages = async (limit = 100): Promise<ChatMessage[]> => {
  const messages = await db
    .select()
    .from(chatMessageTable)
    .orderBy(desc(chatMessageTable.createdAt))
    .limit(limit)
  return messages.reverse()
}
