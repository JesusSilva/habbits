import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify'
import { PORT, ROOT } from '../../config'
import { FormatFilters } from '../../utils/format-filters'
import { FormatResponse } from '../../utils/format-response'
import { plainToInstance } from 'class-transformer'

import { Measure, MeasureClass, MeasureInterface } from './Measure'

export const measuresRouter: FastifyPluginAsync = async (server) => {
  server.get('/', async (request: FastifyRequest<{ Querystring: MeasureClass }>, response: FastifyReply) => {
    server.log.info(`Get http://${ROOT}:${PORT}/measures`)

    try {
      let measures
      if (Object.keys(request.query).length) {
        console.table(FormatFilters(MeasureClass, request.query))
        measures = await Measure.find(FormatFilters(MeasureClass, request.query)).lean()
      } else {
        measures = await Measure.find().lean()
      }
      return response.code(200).send(FormatResponse(MeasureClass, measures))
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.get('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, response: FastifyReply) => {
    server.log.info(`Get http://${ROOT}:${PORT}/measures/${request.params.id}`)

    try {
      const measure = await Measure.findById(request.params.id).lean()
      return response.code(200).send(FormatResponse(MeasureClass, measure))
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.post('/', async (request: FastifyRequest<{ Body: MeasureInterface }>, response: FastifyReply) => {
    server.log.info(`Post http://${ROOT}:${PORT}/measures`)
    console.table(plainToInstance(MeasureClass, request.body))

    try {
      const measure = await Measure.create(plainToInstance(MeasureClass, request.body))
      return response.code(200).send(FormatResponse(MeasureClass, measure))
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.patch('/:id', async (request: FastifyRequest<{ Body: MeasureInterface; Params: { id: string } }>, response: FastifyReply) => {
    server.log.info(`Patch http://${ROOT}:${PORT}/measures/${request.params.id}`)
    console.table(request.body)

    try {
      const measure = await Measure.findByIdAndUpdate(request.params.id, request.body)
      return response.code(200).send(FormatResponse(MeasureClass, measure))
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.delete('/:id', async (request: FastifyRequest<{ Body: MeasureInterface; Params: { id: string } }>, response: FastifyReply) => {
    server.log.info(`Delete http://${ROOT}:${PORT}/measures/${request.params.id}`)

    try {
      await Measure.findByIdAndDelete(request.params.id)
      return response.code(200).send()
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })
}
