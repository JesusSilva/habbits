import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify'
import { PORT, ROOT } from '../../config'
import { FormatFilters } from '../../utils/format-filters'
import { FormatResponse } from '../../utils/format-response'
import { plainToInstance } from 'class-transformer'

import { Day, DayClass, DayInterface } from './Day'

export const daysRouter: FastifyPluginAsync = async (server) => {
  server.get('/', async (request: FastifyRequest<{ Querystring: DayClass }>, response: FastifyReply) => {
    server.log.info(`[ GET ] - http://${ROOT}:${PORT}/days`)

    try {
      let days
      if (Object.keys(request.query).length) {
        days = await Day.find(FormatFilters(DayClass, request.query)).lean()
      } else {
        days = await Day.find().lean()
      }
      return response.code(200).send(FormatResponse(DayClass, days))
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.get('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, response: FastifyReply) => {
    server.log.info(`[ GET ] - http://${ROOT}:${PORT}/days/${request.params.id}`)

    try {
      const day = await Day.findById(request.params.id).lean()
      return response.code(200).send(FormatResponse(DayClass, day))
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.post('/', async (request: FastifyRequest<{ Body: DayInterface }>, response: FastifyReply) => {
    server.log.info(`[ POST ] - http://${ROOT}:${PORT}/days`)

    try {
      const day = await Day.create(plainToInstance(DayClass, request.body))
      return response.code(200).send(FormatResponse(DayClass, day))
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.patch('/:id', async (request: FastifyRequest<{ Body: DayInterface; Params: { id: string } }>, response: FastifyReply) => {
    server.log.info(`[ PATCH ] - http://${ROOT}:${PORT}/days/${request.params.id}`)

    try {
      const day = await Day.findByIdAndUpdate(request.params.id, request.body, { new: true }).lean()
      return response.code(200).send(FormatResponse(DayClass, day))
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.delete('/:id', async (request: FastifyRequest<{ Body: DayInterface; Params: { id: string } }>, response: FastifyReply) => {
    server.log.info(`[ DELETE ] - http://${ROOT}:${PORT}/days/${request.params.id}`)

    try {
      await Day.findByIdAndDelete(request.params.id).lean()
      return response.code(200).send()
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })
}
