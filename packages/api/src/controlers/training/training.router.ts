import { FastifyReply, FastifyRequest } from 'fastify'
import { PORT, ROOT } from '../../config'
import { FormatFilters } from '../../utils/format-filters'
import { FormatResponse } from '../../utils/format-response'

import { Training, TrainingClass, TrainingInterface } from './Training'
import { Exercise, ExerciseInterface } from '../exercise/Exercise'
import { User } from '../user/User'
import { emailTemplate } from '../../emails/email.template'

export const trainingsRouter: any = async (server: any) => {
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
      const user = await User.findById(newTraining.user).lean()
      if (user?._id) {
        const { mailer } = server
        mailer.sendMail({
          to: user?.email,
          subject: 'Nuevo entrenamiento asignado',
          html: emailTemplate
            .replace('{{subject}}', 'Nuevo entrenamiento disponible')
            .replace('{{title}}', 'Tu entrenador personal te ha asignado un nuevo entrenamiento')
            .replace('{{username}}', user.name.toString())
            .replace(
              '{{message}}',
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam vestibulum morbi blandit cursus risus at ultrices mi. Duis tristique sollicitudin nibh sit amet commodo. Purus ut faucibus pulvinar elementum integer enim neque. Nullam vehicula ipsum a arcu cursus vitae congue. Nisl rhoncus mattis rhoncus urna neque. Enim blandit volutpat maecenas volutpat blandit aliquam etiam erat. Lacus sed turpis tincidunt id aliquet risus feugiat. In nulla posuere sollicitudin aliquam ultrices sagittis orci. Vestibulum mattis ullamcorper velit sed ullamcorper.'
            )
            .replace('{{to}}', user.email.toString())
            .replace('{{unsubscriberLink}}', 'https://habbits.es')
        })
      }
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
