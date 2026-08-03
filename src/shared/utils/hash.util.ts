import { genSalt, hash, compare } from 'bcrypt'

export async function hashPassword(password: string) {
  const salt = await genSalt(12)
  return await hash(password, salt)
}

export async function comparePassword(
  hashedPassword: string,
  password: string
) {
  return await compare(password, hashedPassword)
}
