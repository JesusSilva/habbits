import { FastifyPluginAsync } from 'fastify'
import mongoose from 'mongoose'
import { DDBB } from './config'
import { router } from './routers/main.router'
// import path from 'path'

export const app: FastifyPluginAsync = async (app) => {
  mongoose.connect(DDBB).then(() => app.log.info('Connected to MongoDB at ' + DDBB))

  // app.register(fastifyStatic, {
  //   root: path.join(__dirname, '../public'),
  //   prefix: '/public/',
  // });

  app.register(router)
}
