import fastify from 'fastify'
import pino from 'pino'
import { app } from './app'
import { PORT, ROOT } from './config'

const server = fastify({
  logger: pino({
    name: 'Habbits',
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: true,
        ignore: 'time,pid,hostname,reqId',
        colorize: true
      }
    },
    redact: ['req.headers.authorization']
  }),
  disableRequestLogging: true
})

server.register(app)

server.listen(PORT, ROOT)
