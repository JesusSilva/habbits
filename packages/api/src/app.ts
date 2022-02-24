import { FastifyPluginAsync } from "fastify";
import mongoose from "mongoose";
import path from "path";
import { DDBB } from "./config";
import { main_router } from "./routers/main.router";

export const main_app: FastifyPluginAsync = async (app) => {
  mongoose
    .connect(DDBB)
    .then(() => app.log.info("Connected to MongoDB at " + DDBB));

  // app.register(fastifyStatic, {
  //   root: path.join(__dirname, '../public'),
  //   prefix: '/public/',
  // });

  app.register(main_router);
};
