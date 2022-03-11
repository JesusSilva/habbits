import { FastifyReply, FastifyRequest } from 'fastify'
import { PORT, ROOT } from '../../config'
import { FormatFilters } from '../../utils/format-filters'
import { FormatResponse } from '../../utils/format-response'
import { plainToInstance } from 'class-transformer'

import { Booking, BookingClass, BookingInterface } from './Booking'
import { emailTemplate } from '../../emails/email.template'
import { format } from 'date-fns'

export const bookingsRouter: any = async (server: any) => {
  server.get('/', async (request: FastifyRequest<{ Querystring: BookingClass }>, response: FastifyReply) => {
    server.log.info(`[ GET ] - http://${ROOT}:${PORT}/bookings`)

    try {
      let bookings
      if (Object.keys(request.query).length) {
        bookings = await Booking.find(FormatFilters(BookingClass, request.query)).lean().populate('user')
      } else {
        bookings = await Booking.find().lean().populate('user')
      }
      return response.code(200).send(FormatResponse(BookingClass, bookings, 'booking'))
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.get('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, response: FastifyReply) => {
    server.log.info(`[ GET ] - http://${ROOT}:${PORT}/bookings/${request.params.id}`)

    try {
      const booking = await Booking.findById(request.params.id).lean().populate('user')
      return response.code(200).send(FormatResponse(BookingClass, booking, 'booking'))
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.post('/', async (request: FastifyRequest<{ Body: BookingInterface }>, response: FastifyReply) => {
    server.log.info(`[ POST ] - http://${ROOT}:${PORT}/bookings`)

    try {
      const booking = await (await Booking.create(plainToInstance(BookingClass, request.body))).populate('user')

      if (booking.user?.id && booking.date) {
        const { mailer } = server
        mailer.sendMail({
          to: booking.user.email,
          subject: 'Nueva cita asignada',
          html: emailTemplate
            .replace('{{subject}}', 'Nueva cita asignada')
            .replace(
              '{{title}}',
              `Se ha agendado un nueva cita para el día ${format(new Date(booking.date as number), 'dd-MM-yyyy')} a las
              ${format(new Date(booking.date as number), 'HH:mm')}`
            )
            .replace('{{username}}', booking.user?.name.toString())
            .replace(
              '{{message}}',
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam vestibulum morbi blandit cursus risus at ultrices mi. Duis tristique sollicitudin nibh sit amet commodo. Purus ut faucibus pulvinar elementum integer enim neque. Nullam vehicula ipsum a arcu cursus vitae congue. Nisl rhoncus mattis rhoncus urna neque. Enim blandit volutpat maecenas volutpat blandit aliquam etiam erat. Lacus sed turpis tincidunt id aliquet risus feugiat. In nulla posuere sollicitudin aliquam ultrices sagittis orci. Vestibulum mattis ullamcorper velit sed ullamcorper.'
            )
            .replace('{{to}}', booking.user?.email.toString())
            .replace('{{unsubscriberLink}}', 'https://habbits.es')
        })
      }

      return response.code(200).send(FormatResponse(BookingClass, booking, 'booking'))
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.patch('/:id', async (request: FastifyRequest<{ Body: BookingInterface; Params: { id: string } }>, response: FastifyReply) => {
    server.log.info(`[ PATCH ] - http://${ROOT}:${PORT}/bookings/${request.params.id}`)

    try {
      const booking = await Booking.findByIdAndUpdate(request.params.id, request.body, { new: true }).lean().populate('user')
      return response.code(200).send(FormatResponse(BookingClass, booking, 'booking'))
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.delete('/:id', async (request: FastifyRequest<{ Body: BookingInterface; Params: { id: string } }>, response: FastifyReply) => {
    server.log.info(`[ DELETE ] - http://${ROOT}:${PORT}/bookings/${request.params.id}`)

    try {
      const booking = await Booking.findByIdAndDelete(request.params.id).lean().populate('user')

      if (booking?.user?._id && booking.date) {
        console.log(booking)
        const { mailer } = server
        mailer.sendMail({
          to: booking.user.email,
          subject: 'Su cita ha sido cancelada',
          html: emailTemplate
            .replace('{{subject}}', 'Cita cancelada')
            .replace(
              '{{title}}',
              `Se ha cancelado su cita para el día ${format(new Date(booking.date as number), 'dd-MM-yyyy')} a las
              ${format(new Date(booking.date as number), 'HH:mm')}`
            )
            .replace('{{username}}', booking.user?.name.toString())
            .replace(
              '{{message}}',
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam vestibulum morbi blandit cursus risus at ultrices mi. Duis tristique sollicitudin nibh sit amet commodo. Purus ut faucibus pulvinar elementum integer enim neque. Nullam vehicula ipsum a arcu cursus vitae congue. Nisl rhoncus mattis rhoncus urna neque. Enim blandit volutpat maecenas volutpat blandit aliquam etiam erat. Lacus sed turpis tincidunt id aliquet risus feugiat. In nulla posuere sollicitudin aliquam ultrices sagittis orci. Vestibulum mattis ullamcorper velit sed ullamcorper.'
            )
            .replace('{{to}}', booking.user?.email.toString())
            .replace('{{unsubscriberLink}}', 'https://habbits.es')
        })
      }

      return response.code(200).send()
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })
}
