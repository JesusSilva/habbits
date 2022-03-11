import { FastifyReply, FastifyRequest } from 'fastify'
import { PORT, ROOT } from '../../config'
import { FormatFilters } from '../../utils/format-filters'
import { FormatResponse } from '../../utils/format-response'
import { Diet, DietClass, DietInterface } from './Diet'
import { Day, DayInterface } from '../day/Day'
import { emailTemplate } from '../../emails/email.template'

export const dietsRouter: any = async (server: any) => {
  server.get('/', async (request: FastifyRequest<{ Querystring: DietClass }>, response: FastifyReply) => {
    server.log.info(`[ GET ] - http://${ROOT}:${PORT}/diets`)

    try {
      let diets
      if (Object.keys(request.query).length) {
        diets = await Diet.find(FormatFilters(DietClass, request.query)).populate('days').populate('user')
      } else {
        diets = await Diet.find().populate('days').populate('user')
      }
      return response.code(200).send(FormatResponse(DietClass, diets, 'diet'))
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.get('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, response: FastifyReply) => {
    server.log.info(`[ GET ] - http://${ROOT}:${PORT}/diets/${request.params.id}`)

    try {
      const diet = await Diet.findById(request.params.id).lean().populate('days').populate('user')
      return response.code(200).send(FormatResponse(DietClass, diet, 'diet'))
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.post('/', async (request: FastifyRequest<{ Body: DietInterface }>, response: FastifyReply) => {
    server.log.info(`[ POST ] - http://${ROOT}:${PORT}/diets`)

    try {
      const diet = request.body
      const newDays = await Day.insertMany(diet.days)
      diet.days = newDays.map((day: DayInterface) => day._id)
      const newDiet = await (await (await Diet.create(FormatResponse(DietClass, diet, 'diet'))).populate('days')).populate('user')

      if (newDiet.user?.id) {
        const { mailer } = server
        mailer.sendMail({
          to: newDiet.user.email,
          subject: 'Nueva dieta asignada',
          html: emailTemplate
            .replace('{{subject}}', 'Nueva dieta disponible')
            .replace('{{title}}', 'Tu entrenador personal te ha asignado un nueva dieta')
            .replace('{{username}}', newDiet.user?.name.toString())
            .replace(
              '{{message}}',
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam vestibulum morbi blandit cursus risus at ultrices mi. Duis tristique sollicitudin nibh sit amet commodo. Purus ut faucibus pulvinar elementum integer enim neque. Nullam vehicula ipsum a arcu cursus vitae congue. Nisl rhoncus mattis rhoncus urna neque. Enim blandit volutpat maecenas volutpat blandit aliquam etiam erat. Lacus sed turpis tincidunt id aliquet risus feugiat. In nulla posuere sollicitudin aliquam ultrices sagittis orci. Vestibulum mattis ullamcorper velit sed ullamcorper.'
            )
            .replace('{{to}}', newDiet.user?.email.toString())
            .replace('{{unsubscriberLink}}', 'https://habbits.es')
        })
      }

      return response.code(200).send(FormatResponse(DietClass, newDiet, 'diet'))
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.patch('/:id', async (request: FastifyRequest<{ Body: DietInterface; Params: { id: string } }>, response: FastifyReply) => {
    server.log.info(`[ PATCH ] - http://${ROOT}:${PORT}/diets/${request.params.id}`)

    try {
      const diet = request.body
      const dietId = request.params.id
      const days = diet.days
      diet.days = days.map((day: DayInterface) => day._id)

      await Diet.findByIdAndUpdate(dietId, diet, { new: true })
        .populate('days')
        .populate('user')
        .then((diet) => {
          const arrPromise = days.map((day: DayInterface) => Day.findByIdAndUpdate(day._id, day, { new: true }))
          Promise.all(arrPromise)
          return response.code(200).send(FormatResponse(DietClass, diet, 'diet'))
        })
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.delete('/:id', async (request: FastifyRequest<{ Body: DietInterface; Params: { id: string } }>, response: FastifyReply) => {
    server.log.info(`[ DELETE ] - http://${ROOT}:${PORT}/diets/${request.params.id}`)

    try {
      await Diet.findByIdAndDelete(request.params.id).then((diet) => {
        diet?.days.forEach(async (day: DayInterface) => {
          await Day.findByIdAndDelete(day.toString())
        })
      })
      return response.code(200).send()
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })
}
