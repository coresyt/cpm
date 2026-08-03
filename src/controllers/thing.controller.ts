import { RequestHandler } from 'express'
import AppDataSource from '../database'
import { Thing } from '../entities/thing.entity'

export const listThings: RequestHandler = async (req, res) => {
  try {
    if (typeof req.user !== 'object' || req.verifyIdentity !== true) {
      res.status(404).json({
        status: 404,
        message: 'Not found!'
      })
      return
    }

    if (req.user.role !== 'admin') {
      res.status(404).json({
        status: 404,
        message: 'Not found!'
      })
      return
    }

    const things = await AppDataSource.getRepository(Thing)
      .createQueryBuilder('thing')
      .getMany()

    res.status(200).json({
      status: 200,
      message: 'Things listed successfully',
      data: things
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ status: 500, message: 'Internal server error' })
  }
}

export const myListThings: RequestHandler = async (req, res) => {
  try {
    if (typeof req.user !== 'object') {
      console.log(typeof req.user)
      console.log(req.verifyIdentity)
      return res.status(404).json({
        status: 404,
        message: 'Not found!'
      })
    }

    const thingsByUser = await AppDataSource.getRepository(Thing)
      .createQueryBuilder('thing')
      .where('thing.userId = :userId', { userId: req.user.id })
      .getMany()

    res.status(200).json({
      status: 200,
      message: 'The list of things was successfully retrieved.',
      data: thingsByUser
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ status: 500, message: 'Internal server error' })
  }
}

export const createThing: RequestHandler = async (req, res) => {
  try {
    if (typeof req.user !== 'object' || req.verifyIdentity !== true) {
      res.status(404).json({
        status: 404,
        message: 'Not found!'
      })
      return
    }

    if (
      req.body.name === undefined ||
      req.body.type === undefined ||
      req.body.value === undefined
    ) {
      return res.status(400).json({
        status: 400,
        message: 'Bad request!'
      })
    }

    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Thing)
      .values({
        userId: req.user?.id,
        name: req.body.name,
        type: req.body.type,
        value: req.body.value
      })
      .execute()

    res.status(200).json({ status: 200, message: 'Thing created successfully' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ status: 500, message: 'Internal server error' })
  }
}

export const updateThing: RequestHandler = async (req, res) => {
  try {
    if (typeof req.user !== 'object' || req.verifyIdentity !== true) {
      res.status(404).json({
        status: 404,
        message: 'Not found!'
      })
      return
    }

    const thing = {} as Thing

    if (req.body.name === undefined && req.body.type === undefined) {
      return res.status(400).json({
        status: 400,
        message: 'Bad request!'
      })
    }

    req.body.name !== undefined ? (thing.name = req.body.name) : null
    req.body.type !== undefined ? (thing.type = req.body.type) : null

    if (req.params.id === undefined) {
      return res.status(400).json({
        status: 400,
        message: 'Bad request!'
      })
    }

    await AppDataSource.createQueryBuilder()
      .update(Thing)
      .set(thing)
      .where('thing.id = :id and thing.userId = :userId', {
        id: req.params.id,
        userId: req.user.id
      })
      .execute()

    res.status(200).json({ status: 200, message: 'Thing updated successfully' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ status: 500, message: 'Internal server error' })
  }
}

export const deleteThing: RequestHandler = async (req, res) => {
  try {
    if (typeof req.user !== 'object' || req.verifyIdentity !== true) {
      res.status(404).json({
        status: 404,
        message: 'Not found!'
      })
      return
    }

    if (req.params.id === undefined) {
      return res.status(400).json({
        status: 400,
        message: 'Bad request!'
      })
    }

    await AppDataSource.createQueryBuilder()
      .delete()
      .from(Thing)
      .where('thing.id = :id', {
        id: req.params.id
      })
      .andWhere('thing.userId = :userId', { userId: req.user.id })
      .execute()

    res.status(200).json({ status: 200, message: 'Thing deleted successfully' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ status: 500, message: 'Internal server error' })
  }
}
