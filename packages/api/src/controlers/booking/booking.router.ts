import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify'
import { PORT, ROOT } from '../../config'
import { FormatFilters } from '../../utils/format-filters'
import { FormatResponse } from '../../utils/format-response'
import { plainToInstance } from 'class-transformer'

import { Booking, BookingClass, BookingInterface } from './Booking'

export const bookingsRouter: FastifyPluginAsync = async (server) => {
  server.get('/', async (request: FastifyRequest<{ Querystring: BookingClass }>, response: FastifyReply) => {
    server.log.info(`Get http://${ROOT}:${PORT}/bookings`)

    try {
      let bookings
      if (Object.keys(request.query).length) {
        console.table(FormatFilters(BookingClass, request.query))
        bookings = await Booking.find(FormatFilters(BookingClass, request.query)).lean()
      } else {
        bookings = await Booking.find().lean()
      }
      return response.code(200).send(FormatResponse(BookingClass, bookings))
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.get('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, response: FastifyReply) => {
    server.log.info(`Get http://${ROOT}:${PORT}/bookings/${request.params.id}`)

    try {
      const booking = await Booking.findById(request.params.id).lean()
      return response.code(200).send(FormatResponse(BookingClass, booking))
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.post('/', async (request: FastifyRequest<{ Body: BookingInterface }>, response: FastifyReply) => {
    server.log.info(`Post http://${ROOT}:${PORT}/bookings`)
    console.table(plainToInstance(BookingClass, request.body))

    try {
      const booking = await Booking.create(plainToInstance(BookingClass, request.body))
      return response.code(200).send(FormatResponse(BookingClass, booking))
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.patch('/:id', async (request: FastifyRequest<{ Body: BookingInterface; Params: { id: string } }>, response: FastifyReply) => {
    server.log.info(`Patch http://${ROOT}:${PORT}/bookings/${request.params.id}`)
    console.table(request.body)

    try {
      const booking = await Booking.findByIdAndUpdate(request.params.id, request.body, { new: true })
      return response.code(200).send(FormatResponse(BookingClass, booking))
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.delete('/:id', async (request: FastifyRequest<{ Body: BookingInterface; Params: { id: string } }>, response: FastifyReply) => {
    server.log.info(`Delete http://${ROOT}:${PORT}/bookings/${request.params.id}`)

    try {
      await Booking.findByIdAndDelete(request.params.id)
      return response.code(200).send()
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })
}
