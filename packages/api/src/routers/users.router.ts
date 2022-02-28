import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify'
import { PORT, ROOT } from '../config'

const users = (request: FastifyRequest, reply: FastifyReply) => {
  request.log.info(`[GET] - http://${ROOT}:${PORT}/users`)

  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ status: 'Server Running' })
}

const newUser = (request: FastifyRequest, reply: FastifyReply) => {
  request.log.info(`[POST] - http://${ROOT}:${PORT}/users`)

  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ status: 'Server Running' })
}

const updateUsers = (request: FastifyRequest, reply: FastifyReply) => {
  request.log.info(`[POST] - http://${ROOT}:${PORT}/users`)

  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ status: 'Server Running' })
}

const removeUsers = (request: FastifyRequest, reply: FastifyReply) => {
  request.log.info(`[POST] - http://${ROOT}:${PORT}/users`)

  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ status: 'Server Running' })
}

export const usersRouter: FastifyPluginAsync = async (server) => {
  server.get('/', users)
  server.post('/', newUser)
  server.patch('/:id', updateUsers)
  server.delete('/:id', removeUsers)
}
