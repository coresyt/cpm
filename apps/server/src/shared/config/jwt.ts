import fs from 'node:fs/promises'
import path from 'node:path'

export const privateKey = fs.readFile(
  path.join(__dirname, '../../../private.pem'),
  'utf-8'
)

export const publicKey = fs.readFile(
  path.join(__dirname, '../../../public.pem'),
  'utf-8'
)
