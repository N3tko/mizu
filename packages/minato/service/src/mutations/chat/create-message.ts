import { type ChatMessage, type ChatMessageInsert, chatMessageTable } from '@mizu/minato-domain'
import { db } from '@mizu/minato-repository'

export const createChatMessage = async (
  data: ChatMessageInsert,
): Promise<ChatMessage | undefined> => {
  return await db
    .insert(chatMessageTable)
    .values(data)
    .returning()
    .then(([result]) => result)
}
