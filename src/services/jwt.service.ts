import jwt from 'jsonwebtoken'
import { privateKey, publicKey } from '../config/jwt'

export async function createToken(data: object) {
  const token = jwt.sign(data, await privateKey, {
    algorithm: 'RS256',
    expiresIn: '64Days'
  })

  return token
}

export async function decodedToken(token: string) {
  const decodeToken = jwt.verify(token, await publicKey, {
    algorithms: ['RS256'],
    complete: true
  })

  return decodeToken
}
