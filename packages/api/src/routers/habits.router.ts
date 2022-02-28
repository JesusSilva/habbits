import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify'
import { PORT, ROOT } from '../config'

const habbits = (request: FastifyRequest, reply: FastifyReply) => {
  request.log.info(`[GET] - http://${ROOT}:${PORT}/habbits`)

  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ status: 'Server Running' })
}

const newHabbits = (request: FastifyRequest, reply: FastifyReply) => {
  request.log.info(`[POST] - http://${ROOT}:${PORT}/habbits`)

  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ status: 'Server Running' })
}

const updateHabbits = (request: FastifyRequest, reply: FastifyReply) => {
  request.log.info(`[POST] - http://${ROOT}:${PORT}/habbits`)

  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ status: 'Server Running' })
}

const removeHabbits = (request: FastifyRequest, reply: FastifyReply) => {
  request.log.info(`[POST] - http://${ROOT}:${PORT}/habbits`)

  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ status: 'Server Running' })
}

export const habbitsRouter: FastifyPluginAsync = async (server) => {
  server.get('/', habbits)
  server.post('/', newHabbits)
  server.patch('/:id', updateHabbits)
  server.delete('/:id', removeHabbits)
}
