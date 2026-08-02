import { RequestHandler } from 'express'
import AppDataSource from '../database'
import { User } from '../entities/user.entity'
import { comparePassword, hashPassword } from '../services/bcrypt.service'
import { createToken, decodedToken } from '../services/jwt.service'

export const signUp: RequestHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body as User

    if (name.length < 0 || typeof name !== 'string') {
      res
        .status(400)
        .json({ status: 400, message: 'Name is not valid or is void' })
    }

    if (email.length < 0 || typeof email !== 'string') {
      res
        .status(400)
        .json({ status: 400, message: 'Email is not valid or is void' })
    }

    if (password.length < 0 || typeof password !== 'string') {
      res
        .status(400)
        .json({ status: 400, message: 'Password is not valid or is void' })
    }

    const passwordHashed = await hashPassword(password)

    const { identifiers } = await AppDataSource.createQueryBuilder()
      .insert()
      .into(User)
      .values({
        email,
        name,
        password: passwordHashed
      })
      .execute()

    const token = await createToken({ id: identifiers[0].id })

    res
      .status(201)
      .json({ status: 201, message: 'User created succesfully!', token })
  } catch (err) {
    console.log(err)
    res.status(500).json()
  }
}

export const signIn: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body as User

    if (email.length < 0 || typeof email !== 'string') {
      return res
        .status(400)
        .json({ status: 400, message: 'Email is not valid or is void' })
    }

    if (password.length < 0 || typeof password !== 'string') {
      return res
        .status(400)
        .json({ status: 400, message: 'Password is not valid or is void' })
    }

    const user = await AppDataSource.getRepository(User)
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne()

    if (user === null)
      return res.status(404).json({
        status: 404,
        message: 'User is not exist or is incorrect password'
      })

    const isCorrectPassword = await comparePassword(user.password, password)

    if (!isCorrectPassword)
      return res.status(404).json({
        status: 404,
        message: 'User is not exist or is incorrect password'
      })

    const token = await createToken({ id: user.id })

    res
      .status(201)
      .json({ status: 201, message: 'User created succesfully!', token })
  } catch (err) {
    console.log(err)
    res.status(500).json()
  }
}

export const signOut: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body as User

    if (email.length < 0 || typeof email !== 'string') {
      return res
        .status(400)
        .json({ status: 400, message: 'Email is not valid or is void' })
    }

    if (password.length < 0 || typeof password !== 'string') {
      return res
        .status(400)
        .json({ status: 400, message: 'Password is not valid or is void' })
    }

    const user = await AppDataSource.getRepository(User)
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne()

    if (user === null)
      return res.status(404).json({
        status: 404,
        message: 'User is not exist or is incorrect password'
      })

    const isCorrectPassword = await comparePassword(user.password, password)

    if (!isCorrectPassword)
      return res.status(404).json({
        status: 404,
        message: 'User is not exist or is incorrect password'
      })

    await AppDataSource.createQueryBuilder()
      .delete()
      .from(User)
      .where('user.email = :email', { email })
      .execute()

    res.status(200).json({ status: 200, message: 'User deleted succesfully!' })
  } catch (err) {
    console.log(err)
    res.status(500).json()
  }
}

export const refreshToken: RequestHandler = async (req, res) => {
  try {
    const { authorization } = req.headers

    if (typeof authorization !== 'string')
      return res.status(400).json({
        status: 401,
        message: 'Token was not receivd!'
      })

    if (authorization.length < 0)
      return res.status(400).json({
        status: 401,
        message: 'Token was not receivd!'
      })
    const token = authorization.split(' ')[1]

    const data = await decodedToken(token)

    if (typeof data.payload === 'string')
      return res.status(400).json({
        status: 401,
        message: 'Token was not receivd!'
      })

    const newToken = await createToken(data.payload)

    res
      .status(200)
      .json({ status: 200, message: 'Token refreshing succesfully!', newToken })
  } catch (err) {
    console.log(err)
    res.status(500).json()
  }
}
