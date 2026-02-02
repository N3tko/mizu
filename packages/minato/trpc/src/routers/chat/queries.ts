import { getChatMessages } from '@mizu/minato-service'
import { publicProcedure, router } from '../../init'

export const chatQueries = router({
  messages: publicProcedure.query(async () => getChatMessages()),
})
