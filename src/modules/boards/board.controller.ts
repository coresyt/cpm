import { RequestHandler } from 'express'
import AppDataSource from '../../shared/database/database'
import { Board } from './board.entity'
import { isIP } from 'class-validator'

export const listBoards: RequestHandler = async (req, res) => {
  try {
    if (typeof req.user !== 'object' || req.verifyIdentity !== true) {
      return res.status(404).json({
        status: 404,
        message: 'Not found!'
      })
    }

    if (req.user.role !== 'admin') {
      return res.status(404).json({
        status: 404,
        message: 'Not found!'
      })
    }

    const boards = await AppDataSource.getRepository(Board)
      .createQueryBuilder('board')
      .getMany()

    return res.status(200).json({
      status: 200,
      message: 'Boards listed successfully',
      data: boards
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ status: 500, message: 'Internal server error' })
  }
}

export const myListBoards: RequestHandler = async (req, res) => {
  try {
    if (typeof req.user !== 'object') {
      console.log(typeof req.user)
      console.log(req.verifyIdentity)
      return res.status(404).json({
        status: 404,
        message: 'Not found!'
      })
    }

    const boardsByUser = await AppDataSource.getRepository(Board)
      .createQueryBuilder()
      .where('board.userId = :userId', { userId: req.user.id })
      .getMany()

    res.status(200).json({
      status: 200,
      message: 'The list of boards was successfully retrieved.',
      data: boardsByUser
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ status: 500, message: 'Internal server error' })
  }
}

export const createBoard: RequestHandler = async (req, res) => {
  try {
    if (typeof req.user !== 'object' || req.verifyIdentity !== true) {
      res.status(404).json({
        status: 404,
        message: 'Not found!'
      })
      return
    }

    if (req.body.name === undefined) {
      return res.status(400).json({
        status: 400,
        message: 'Bad request!'
      })
    }

    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Board)
      .values({
        userId: req.user?.id,
        name: req.body.name,
        thingsIds: []
      })
      .execute()

    res.status(200).json({ status: 200, message: 'Board created successfully' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ status: 500, message: 'Internal server error' })
  }
}

export const updateBoard: RequestHandler = async (req, res) => {
  try {
    if (typeof req.user !== 'object' || req.verifyIdentity !== true) {
      res.status(404).json({
        status: 404,
        message: 'Not found!'
      })
      return
    }

    if (req.body.name === undefined) {
      return res.status(400).json({
        status: 400,
        message: 'Bad request!'
      })
    }

    if (req.params.id === undefined) {
      return res.status(400).json({
        status: 400,
        message: 'Bad request!'
      })
    }

    await AppDataSource.createQueryBuilder()
      .update(Board)
      .set({ name: req.body.name })
      .where('board.id = :id and board.userId = :userId', {
        id: req.params.id,
        userId: req.user.id
      })
      .execute()

    res.status(200).json({ status: 200, message: 'Board updated successfully' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ status: 500, message: 'Internal server error' })
  }
}

export const addThingsToBoard: RequestHandler = async (req, res) => {
  try {
    if (typeof req.user !== 'object' || req.verifyIdentity !== true) {
      res.status(404).json({
        status: 404,
        message: 'Not found!'
      })
      return
    }

    if (
      req.body.thingsIds === undefined ||
      !Array.isArray(req.body.thingsIds) ||
      req.body.thingsIds.length === 0
    ) {
      return res.status(400).json({
        status: 400,
        message: "The thingsIds weren't added!!"
      })
    }

    const boardById = await AppDataSource.getRepository(Board)
      .createQueryBuilder()
      .where('board.userId = :userId and board.id = :id', {
        userId: req.user.id,
        id: req.params.id
      })
      .getOne()

    if (boardById === null) {
      return res.status(404).json({
        status: 404,
        message: 'Board not found!'
      })
    }

    console.log(boardById.thingsIds)
    console.log(req.body.thingsIds)

    await AppDataSource.createQueryBuilder()
      .update(Board)
      .set({ thingsIds: [...boardById.thingsIds, ...req.body.thingsIds] })
      .where('board.id = :id and board.userId = :userId', {
        id: req.params.id,
        userId: req.user.id
      })
      .execute()

    res
      .status(200)
      .json({ status: 200, message: 'Things added to board successfully' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ status: 500, message: 'Internal server error' })
  }
}

export const setIp: RequestHandler = async (req, res) => {
  try {
    if (typeof req.user !== 'object' || req.verifyIdentity !== true) {
      res.status(404).json({
        status: 404,
        message: 'Not found!'
      })
      return
    }

    if (req.body.ip === undefined || isIP(req.body.ip, '4') !== false) {
      return res.status(400).json({
        status: 400,
        message: 'Ip is invalid!'
      })
    }

    console.log(req.body.ip)

    await AppDataSource.createQueryBuilder()
      .update(Board)
      .set({ origin: req.body.ip })
      .where('board.id = :id and board.userId = :userId', {
        id: req.params.id,
        userId: req.user.id
      })
      .execute()

    res
      .status(200)
      .json({ status: 200, message: 'Set ip in board updated successfully' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ status: 500, message: 'Internal server error' })
  }
}

export const deleteBoard: RequestHandler = async (req, res) => {
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
      .from(Board)
      .where('board.id = :id', {
        id: req.params.id
      })
      .andWhere('board.userId = :userId', { userId: req.user.id })
      .execute()

    res.status(200).json({ status: 200, message: 'Board deleted successfully' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ status: 500, message: 'Internal server error' })
  }
}
