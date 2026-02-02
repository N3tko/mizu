import type { AppRouter } from '@mizu/studio-trpc'
import { createTRPCContext } from '@trpc/tanstack-react-query'

export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>()
