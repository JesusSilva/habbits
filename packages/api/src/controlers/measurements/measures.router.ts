import { FastifyReply, FastifyRequest } from 'fastify'
import { PORT, ROOT } from '../../config'
import { FormatFilters } from '../../utils/format-filters'
import { FormatResponse } from '../../utils/format-response'
import { plainToInstance } from 'class-transformer'

import { Measure, MeasureClass, MeasureInterface } from './Measure'
import { emailTemplate } from '../../emails/email.template'

export const measuresRouter = async (server: any) => {
  server.get('/', async (request: FastifyRequest<{ Querystring: MeasureClass }>, response: FastifyReply) => {
    server.log.info(`[ GET ] - http://${ROOT}:${PORT}/measures`)

    try {
      let measures
      if (Object.keys(request.query).length) {
        measures = await Measure.find(FormatFilters(MeasureClass, request.query), {}, { sort: { createdAt: -1 } })
          .lean()
          .populate('user')
      } else {
        measures = await Measure.find({}, {}, { sort: { createdAt: -1 } })
          .lean()
          .populate('user')
      }
      return response.code(200).send(FormatResponse(MeasureClass, measures, 'measure'))
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.get('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, response: FastifyReply) => {
    server.log.info(`[ GET ] - http://${ROOT}:${PORT}/measures/${request.params.id}`)

    try {
      const measure = await Measure.findById(request.params.id).lean().populate('user')
      return response.code(200).send(FormatResponse(MeasureClass, measure, 'measure'))
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.post('/', async (request: FastifyRequest<{ Body: MeasureInterface }>, response: FastifyReply) => {
    server.log.info(`[ POST ] - http://${ROOT}:${PORT}/measures`)

    try {
      const measure = await (await Measure.create(plainToInstance(MeasureClass, request.body))).populate('user')

      if (measure.user?.id && measure.date) {
        const { mailer } = server
        mailer.sendMail({
          to: measure.user.email,
          subject: 'Nueva medidas registradas',
          html: emailTemplate
            .replace('{{subject}}', 'Nueva medidas registradas')
            .replace('{{title}}', 'Se ha registrado nuevas medidas')
            .replace('{{username}}', measure.user?.name.toString())
            .replace(
              '{{message}}',
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam vestibulum morbi blandit cursus risus at ultrices mi. Duis tristique sollicitudin nibh sit amet commodo. Purus ut faucibus pulvinar elementum integer enim neque. Nullam vehicula ipsum a arcu cursus vitae congue. Nisl rhoncus mattis rhoncus urna neque. Enim blandit volutpat maecenas volutpat blandit aliquam etiam erat. Lacus sed turpis tincidunt id aliquet risus feugiat. In nulla posuere sollicitudin aliquam ultrices sagittis orci. Vestibulum mattis ullamcorper velit sed ullamcorper.'
            )
            .replace('{{to}}', measure.user?.email.toString())
            .replace('{{unsubscriberLink}}', 'https://habbits.es')
        })
      }

      return response.code(200).send(FormatResponse(MeasureClass, measure, 'measure'))
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.patch('/:id', async (request: FastifyRequest<{ Body: MeasureInterface; Params: { id: string } }>, response: FastifyReply) => {
    server.log.info(`[ PATCH ] - http://${ROOT}:${PORT}/measures/${request.params.id}`)

    try {
      const measure = await Measure.findByIdAndUpdate(request.params.id, request.body, { new: true }).lean().populate('user')
      return response.code(200).send(FormatResponse(MeasureClass, measure, 'measure'))
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.delete('/:id', async (request: FastifyRequest<{ Body: MeasureInterface; Params: { id: string } }>, response: FastifyReply) => {
    server.log.info(`[ DELETE ] - http://${ROOT}:${PORT}/measures/${request.params.id}`)

    try {
      await Measure.findByIdAndDelete(request.params.id).lean()
      return response.code(200).send()
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })
}
