import { minatoEnvConfig } from '@mizu/minato-config'
import { createRemoteJWKSet, jwtVerify } from 'jose'

export async function validateToken(token: string) {
  const jwks = createRemoteJWKSet(new URL(`${minatoEnvConfig.app.baseUrl}/api/auth/jwks`))
  const { payload } = await jwtVerify(token, jwks, {
    issuer: minatoEnvConfig.app.baseUrl,
    audience: minatoEnvConfig.app.baseUrl,
  })
  return payload
}
