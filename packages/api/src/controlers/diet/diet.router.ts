import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify'
import { PORT, ROOT } from '../../config'
import { FormatFilters } from '../../utils/format-filters'
import { FormatResponse } from '../../utils/format-response'
import { plainToInstance } from 'class-transformer'

import { Diet, DietClass, DietInterface } from './Diet'

export const dietsRouter: FastifyPluginAsync = async (server) => {
  server.get('/', async (request: FastifyRequest<{ Querystring: DietClass }>, response: FastifyReply) => {
    server.log.info(`Get http://${ROOT}:${PORT}/diets`)

    try {
      let diets
      if (Object.keys(request.query).length) {
        console.table(FormatFilters(DietClass, request.query))
        diets = await Diet.find(FormatFilters(DietClass, request.query)).lean()
      } else {
        diets = await Diet.find().lean()
      }
      return response.code(200).send(FormatResponse(DietClass, diets))
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.get('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, response: FastifyReply) => {
    server.log.info(`Get http://${ROOT}:${PORT}/diets/${request.params.id}`)

    try {
      const diet = await Diet.findById(request.params.id).lean()
      return response.code(200).send(FormatResponse(DietClass, diet))
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.post('/', async (request: FastifyRequest<{ Body: DietInterface }>, response: FastifyReply) => {
    server.log.info(`Post http://${ROOT}:${PORT}/diets`)
    console.table(plainToInstance(DietClass, request.body))

    try {
      const diet = await Diet.create(plainToInstance(DietClass, request.body))
      return response.code(200).send(FormatResponse(DietClass, diet))
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.patch('/:id', async (request: FastifyRequest<{ Body: DietInterface; Params: { id: string } }>, response: FastifyReply) => {
    server.log.info(`Patch http://${ROOT}:${PORT}/diets/${request.params.id}`)
    console.table(request.body)

    try {
      const diet = await Diet.findByIdAndUpdate(request.params.id, request.body)
      return response.code(200).send(FormatResponse(DietClass, diet))
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })

  server.delete('/:id', async (request: FastifyRequest<{ Body: DietInterface; Params: { id: string } }>, response: FastifyReply) => {
    server.log.info(`Delete http://${ROOT}:${PORT}/diets/${request.params.id}`)

    try {
      await Diet.findByIdAndDelete(request.params.id)
      return response.code(200).send()
    } catch (error) {
      return response.code(400).send({ status: 'Error', message: error })
    }
  })
}
