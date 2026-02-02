import { type MinatoConfig, MinatoConfigSchema } from '@mizu/minato-domain'

const minatoConfig: MinatoConfig = {
  app: {
    dev: process.env.NODE_ENV !== 'production',
    baseUrl: process.env.BASE_URL ?? 'http://localhost:3000',
    port: Number(process.env.PORT ?? 3000),
    cors: process.env.CORS?.split(',') ?? [],
    encryptionKey: process.env.ENCRYPTION_KEY ?? '',
  },
  cache: {
    url: process.env.CACHE_URL ?? '',
  },
  db: {
    url: process.env.DATABASE_URL ?? '',
  },
  auth: {
    secret: process.env.AUTH_SECRET,
    emailAndPassword: {
      enabled: true,
      minPasswordLength: 8,
      maxPasswordLength: 128,
    },
    trustedOrigins: process.env.TRUSTED_ORIGINS?.split(',') ?? [],
  },
}

export const minatoEnvConfig = MinatoConfigSchema.parse(minatoConfig)
