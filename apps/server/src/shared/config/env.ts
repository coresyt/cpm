import 'dotenv/config'

export const PORT = process.env.PORT ?? 3000
export const HOST = process.env.HOST ?? 'localhost'
export const HTTPS = process.env.HTTPS
export const DB_FILE = process.env.DB_FILE
