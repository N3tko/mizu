import { createLogger } from '@mizu/logger'
import type { ChatMessage } from '@mizu/minato-domain'
import { chatEvents, getChatMessages } from '@mizu/minato-service'
import { publicProcedure, router } from '../../init'

const logger = createLogger('chat:subscriptions')

export const chatSubscriptions = router({
  onMessage: publicProcedure.subscription(async function* ({ signal }) {
    let eventId = 0
    logger.debug('Client subscribed to chat')

    try {
      // Send initial messages
      const initialMessages = await getChatMessages()
      yield { id: String(eventId++), type: 'init' as const, messages: initialMessages }

      // Listen for new messages
      const messageQueue: ChatMessage[] = []
      const unsubscribe = chatEvents.subscribeToMessages((msg) => messageQueue.push(msg))

      try {
        while (!signal?.aborted) {
          await new Promise((resolve) => setTimeout(resolve, 100))
          if (signal?.aborted) break
          while (messageQueue.length > 0) {
            const message = messageQueue.shift()
            if (message) {
              yield { id: String(eventId++), type: 'message' as const, message }
            }
          }
        }
      } finally {
        unsubscribe()
      }
    } finally {
      logger.debug('Client unsubscribed from chat')
    }
  }),
})
