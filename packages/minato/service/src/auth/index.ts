import { minatoEnvConfig } from '@mizu/minato-config'
import { account, jwks, session, user, verification } from '@mizu/minato-domain'
import { db } from '@mizu/minato-repository'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { jwt, lastLoginMethod, magicLink } from 'better-auth/plugins'

export const auth = betterAuth({
  appName: 'Minato',
  baseURL: minatoEnvConfig.app.baseUrl,
  basePath: '/api/auth',
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user,
      session,
      account,
      verification,
      jwks,
    },
  }),
  advanced: {
    cookiePrefix: 'minato',
  },
  account: {
    encryptOAuthTokens: true,
    accountLinking: {
      enabled: true,
      trustedProviders: ['google', 'github', 'discord'],
    },
  },
  plugins: [
    jwt({
      jwt: {
        expirationTime: '1d',
      },
    }),
    magicLink({
      expiresIn: 60 * 10, // 10 minutes
      sendMagicLink: async ({ email, url }) => {
        console.log(`\n✨ Magic Link for ${email}:\n${url}\n`)
      },
    }),
    lastLoginMethod(),
  ],
  ...minatoEnvConfig.auth,
})
