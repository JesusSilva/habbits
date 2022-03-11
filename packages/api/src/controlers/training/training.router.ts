import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify'
import { PORT, ROOT } from '../../config'
import { FormatFilters } from '../../utils/format-filters'
import { FormatResponse } from '../../utils/format-response'

import { Training, TrainingClass, TrainingInterface } from './Training'
import { Exercise, ExerciseInterface } from '../exercise/Exercise'

export const trainingsRouter: FastifyPluginAsync = async (server) => {
  server.get('/', async (request: FastifyRequest<{ Querystring: TrainingClass }>, response: FastifyReply) => {
    server.log.info(`[ GET ] - http://${ROOT}:${PORT}/trainings`)
    try {
      let trainings
      if (Object.keys(request.query).length) {
        trainings = await Training.find(FormatFilters(TrainingClass, request.query)).lean().populate('exercises')
      } else {
        trainings = await Training.find().lean().populate('exercises')
      }
      return response.code(200).send(FormatResponse(TrainingClass, trainings, 'training'))
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.get('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, response: FastifyReply) => {
    server.log.info(`[ GET ] - http://${ROOT}:${PORT}/trainings/${request.params.id}`)
    try {
      const training = await Training.findById(request.params.id).lean().populate('exercises')
      return response.code(200).send(FormatResponse(TrainingClass, training, 'training'))
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.post('/', async (request: FastifyRequest<{ Body: TrainingInterface }>, response: FastifyReply) => {
    server.log.info(`[ POST ] - http://${ROOT}:${PORT}/trainings`)

    try {
      const training = request.body
      const newTraining = await (await Training.create(FormatResponse(TrainingClass, training, 'training'))).populate('exercises')
      return response.code(200).send(FormatResponse(TrainingClass, newTraining, 'training'))
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.patch('/:id', async (request: FastifyRequest<{ Body: TrainingInterface; Params: { id: string } }>, response: FastifyReply) => {
    server.log.info(`[ PATCH ] - http://${ROOT}:${PORT}/trainings/${request.params.id}`)

    try {
      const training = request.body
      const trainingId = request.params.id
      const exercises = training.exercises
      training.exercises = exercises.map((exercise: ExerciseInterface) => exercise._id)

      await Training.findByIdAndUpdate(trainingId, training, { new: true })
        .populate('exercises')
        .then((training) => {
          const arrPromise = exercises.map((exercise: ExerciseInterface) =>
            Exercise.findByIdAndUpdate(exercise._id, exercise, { new: true })
          )
          Promise.all(arrPromise)
          return response.code(200).send(FormatResponse(TrainingClass, training))
        })
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.delete('/:id', async (request: FastifyRequest<{ Body: TrainingInterface; Params: { id: string } }>, response: FastifyReply) => {
    server.log.info(`[ DELETE ] - http://${ROOT}:${PORT}/trainings/${request.params.id}`)

    try {
      await Training.findByIdAndDelete(request.params.id)
      return response.code(200).send()
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })
}
