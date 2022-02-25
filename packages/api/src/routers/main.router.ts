import { FastifyPluginAsync } from 'fastify'
import { PORT, ROOT } from '../config'

const home = (request: any, reply: any) => {
  request.log.info(`Get http://${ROOT}:${PORT}/`)

  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ status: 'Server Running' })
}

export const router: FastifyPluginAsync = async (server) => {
  server.get('/', home)
}
