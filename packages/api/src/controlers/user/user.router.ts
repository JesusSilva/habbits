import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify'
import { PORT, ROOT } from '../../config'
import { FormatFilters } from '../../utils/format-filters'
import { FormatResponse } from '../../utils/format-response'
import { plainToInstance } from 'class-transformer'

import { User, UserClass, UserInterface } from './User'

export const usersRouter: FastifyPluginAsync = async (server) => {
  server.get('/', async (request: FastifyRequest<{ Querystring: UserClass }>, response: FastifyReply) => {
    server.log.info(`Get http://${ROOT}:${PORT}/users`)

    try {
      let users
      if (Object.keys(request.query).length) {
        console.table(FormatFilters(UserClass, request.query))
        users = await User.find(FormatFilters(UserClass, request.query)).lean()
      } else {
        users = await User.find().lean()
      }
      return response.code(200).send(FormatResponse(UserClass, users))
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.get('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, response: FastifyReply) => {
    server.log.info(`Get http://${ROOT}:${PORT}/users/${request.params.id}`)

    try {
      const user = await User.findById(request.params.id).lean()
      return response.code(200).send(FormatResponse(UserClass, user))
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.post('/', async (request: FastifyRequest<{ Body: UserInterface }>, response: FastifyReply) => {
    server.log.info(`Post http://${ROOT}:${PORT}/users`)
    console.table(plainToInstance(UserClass, request.body))

    try {
      const user = await User.create(plainToInstance(UserClass, request.body))
      return response.code(200).send(FormatResponse(UserClass, user))
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.patch('/:id', async (request: FastifyRequest<{ Body: UserInterface; Params: { id: string } }>, response: FastifyReply) => {
    server.log.info(`Patch http://${ROOT}:${PORT}/users/${request.params.id}`)
    console.table(request.body)

    try {
      const user = await User.findByIdAndUpdate(request.params.id, request.body, { new: true })
      return response.code(200).send(FormatResponse(UserClass, user))
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.delete('/:id', async (request: FastifyRequest<{ Body: UserInterface; Params: { id: string } }>, response: FastifyReply) => {
    server.log.info(`Delete http://${ROOT}:${PORT}/users/${request.params.id}`)

    try {
      await User.findByIdAndDelete(request.params.id)
      return response.code(200).send()
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })
}
