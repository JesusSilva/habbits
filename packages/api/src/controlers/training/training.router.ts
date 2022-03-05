import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify'
import { PORT, ROOT } from '../../config'
import { FormatFilters } from '../../utils/format-filters'
import { FormatResponse } from '../../utils/format-response'
import { plainToInstance } from 'class-transformer'

import { Training, TrainingClass, TrainingInterface } from './Training'

export const trainingsRouter: FastifyPluginAsync = async (server) => {
  server.get('/', async (request: FastifyRequest<{ Querystring: TrainingClass }>, response: FastifyReply) => {
    server.log.info(`Get http://${ROOT}:${PORT}/trainings`)
    try {
      let trainings
      if (Object.keys(request.query).length) {
        console.table(FormatFilters(TrainingClass, request.query))
        trainings = await Training.find(FormatFilters(TrainingClass, request.query)).lean()
      } else {
        trainings = await Training.find().lean()
      }
      return response.code(200).send(FormatResponse(TrainingClass, trainings))
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.get('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, response: FastifyReply) => {
    server.log.info(`Get http://${ROOT}:${PORT}/trainings/${request.params.id}`)
    try {
      const training = await Training.findById(request.params.id).lean()
      return response.code(200).send(FormatResponse(TrainingClass, training))
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.post('/', async (request: FastifyRequest<{ Body: TrainingInterface }>, response: FastifyReply) => {
    server.log.info(`Post http://${ROOT}:${PORT}/trainings`)
    console.table(plainToInstance(TrainingClass, request.body))
    try {
      const training = await Training.create(plainToInstance(TrainingClass, request.body))
      return response.code(200).send(FormatResponse(TrainingClass, training))
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.patch('/:id', async (request: FastifyRequest<{ Body: TrainingInterface; Params: { id: string } }>, response: FastifyReply) => {
    server.log.info(`Patch http://${ROOT}:${PORT}/trainings/${request.params.id}`)
    console.table(request.body)
    try {
      const training = await Training.findByIdAndUpdate(request.params.id, request.body, { new: true })
      return response.code(200).send(FormatResponse(TrainingClass, training))
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.delete('/:id', async (request: FastifyRequest<{ Body: TrainingInterface; Params: { id: string } }>, response: FastifyReply) => {
    server.log.info(`Delete http://${ROOT}:${PORT}/trainings/${request.params.id}`)
    try {
      await Training.findByIdAndDelete(request.params.id)
      return response.code(200).send()
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })
}
