import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify'
import { PORT, ROOT } from '../../config'
import { FormatFilters } from '../../utils/format-filters'
import { FormatResponse } from '../../utils/format-response'
import { plainToInstance } from 'class-transformer'

import { Exercise, ExerciseClass, ExerciseInterface } from './Exercise'

export const exercisesRouter: FastifyPluginAsync = async (server) => {
  server.get('/', async (request: FastifyRequest<{ Querystring: ExerciseClass }>, response: FastifyReply) => {
    server.log.info(`[ GET ] - http://${ROOT}:${PORT}/exercises`)

    try {
      let exercises
      if (Object.keys(request.query).length) {
        exercises = await Exercise.find(FormatFilters(ExerciseClass, request.query)).lean()
      } else {
        exercises = await Exercise.find().lean()
      }
      return response.code(200).send(FormatResponse(ExerciseClass, exercises))
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.get('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, response: FastifyReply) => {
    server.log.info(`[ GET ] - http://${ROOT}:${PORT}/exercises/${request.params.id}`)

    try {
      const exercise = await Exercise.findById(request.params.id).lean()
      return response.code(200).send(FormatResponse(ExerciseClass, exercise))
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.post('/', async (request: FastifyRequest<{ Body: ExerciseInterface }>, response: FastifyReply) => {
    server.log.info(`[ POST ] - http://${ROOT}:${PORT}/exercises`)

    try {
      const exercise = await Exercise.create(plainToInstance(ExerciseClass, request.body))
      return response.code(200).send(FormatResponse(ExerciseClass, exercise))
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.patch('/:id', async (request: FastifyRequest<{ Body: ExerciseInterface; Params: { id: string } }>, response: FastifyReply) => {
    server.log.info(`[ PATCH ] - http://${ROOT}:${PORT}/exercises/${request.params.id}`)

    try {
      const exercise = await Exercise.findByIdAndUpdate(request.params.id, request.body, { new: true }).lean()
      return response.code(200).send(FormatResponse(ExerciseClass, exercise))
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.delete('/:id', async (request: FastifyRequest<{ Body: ExerciseInterface; Params: { id: string } }>, response: FastifyReply) => {
    server.log.info(`[ DELETE ] - http://${ROOT}:${PORT}/exercises/${request.params.id}`)

    try {
      await Exercise.findByIdAndDelete(request.params.id).lean()
      return response.code(200).send()
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })
}
