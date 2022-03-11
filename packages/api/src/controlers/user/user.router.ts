import { FastifyReply, FastifyRequest } from 'fastify'
import { PORT, ROOT } from '../../config'
import { FormatFilters } from '../../utils/format-filters'
import { FormatResponse } from '../../utils/format-response'
import { plainToInstance } from 'class-transformer'

import { User, UserClass, UserInterface } from './User'
import { Booking, BookingClass } from '../booking/Booking'
import { Diet, DietClass } from '../diet/Diet'
import { Training, TrainingClass } from '../training/Training'
import { Measure, MeasureClass } from '../measurements/Measure'
import { emailTemplate } from '../../emails/email.template'

export const usersRouter: any = async (server: any) => {
  server.get('/', async (request: FastifyRequest<{ Querystring: UserClass }>, response: FastifyReply) => {
    server.log.info(`[ GET ] - http://${ROOT}:${PORT}/users`)

    try {
      let users
      if (Object.keys(request.query).length) {
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
    server.log.info(`[ GET ] - http://${ROOT}:${PORT}/users/${request.params.id}`)

    try {
      const id = request.params.id

      let bookings = await Booking.findOne({ user: id }, {}, { sort: { createdAt: 1 } }).lean()
      bookings = FormatResponse(BookingClass, bookings, 'booking')

      let diets = await Diet.findOne({ user: id }, {}, { sort: { createdAt: -1 } }).populate('days')
      diets = FormatResponse(DietClass, diets, 'diet')

      let trainings = await Training.find({ user: id }, {}, {}).lean().populate('exercises')
      trainings = FormatResponse(TrainingClass, trainings, 'training')

      let measures = await Measure.findOne({ user: id }, {}, { sort: { createdAt: -1 } })
      measures = FormatResponse(MeasureClass, measures)

      let user = await User.findById(id).lean()
      user = FormatResponse(UserClass, user)

      return response.code(200).send({ ...user, bookings, diets, trainings, measures })
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.post('/', async (request: FastifyRequest<{ Body: UserInterface }>, response: FastifyReply) => {
    server.log.info(`[ POST ] - http://${ROOT}:${PORT}/users`)

    try {
      const user = await User.create(plainToInstance(UserClass, request.body))
      const { mailer } = server
      mailer.sendMail({
        to: user.email,
        subject: 'Bienvenido',
        html: emailTemplate
          .replace('{{subject}}', 'Bienvenido a Habbits')
          .replace('{{title}}', 'Bienvenido')
          .replace('{{username}}', user.name.toString())
          .replace(
            '{{message}}',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam vestibulum morbi blandit cursus risus at ultrices mi. Duis tristique sollicitudin nibh sit amet commodo. Purus ut faucibus pulvinar elementum integer enim neque. Nullam vehicula ipsum a arcu cursus vitae congue. Nisl rhoncus mattis rhoncus urna neque. Enim blandit volutpat maecenas volutpat blandit aliquam etiam erat. Lacus sed turpis tincidunt id aliquet risus feugiat. In nulla posuere sollicitudin aliquam ultrices sagittis orci. Vestibulum mattis ullamcorper velit sed ullamcorper.'
          )
          .replace('{{to}}', user.email.toString())
          .replace('{{unsubscriberLink}}', 'https://habbits.es')
      })
      return response.code(200).send(FormatResponse(UserClass, user))
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.patch('/:id', async (request: FastifyRequest<{ Body: UserInterface; Params: { id: string } }>, response: FastifyReply) => {
    server.log.info(`[ PATCH ] - http://${ROOT}:${PORT}/users/${request.params.id}`)

    try {
      const user = await User.findByIdAndUpdate(request.params.id, request.body, { new: true }).lean()
      return response.code(200).send(FormatResponse(UserClass, user))
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.delete('/:id', async (request: FastifyRequest<{ Body: UserInterface; Params: { id: string } }>, response: FastifyReply) => {
    server.log.info(`[ DELETE ] - http://${ROOT}:${PORT}/users/${request.params.id}`)

    try {
      await User.findByIdAndDelete(request.params.id).lean()
      return response.code(200).send()
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })
}
