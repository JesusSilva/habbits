import { FastifyPluginAsync } from 'fastify'
import fastifyAuth0Verify from 'fastify-auth0-verify'
import blipp from 'fastify-blipp'
import fastifyCors from 'fastify-cors'
import mongoose from 'mongoose'
import { DDBB, AUTH0, MAIL, ROOT, PORT } from './config'

// import { emailTemplate } from './emails/email.template'
// const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget nunc scelerisque viverra mauris in. Lectus sit amet est placerat in egestas erat imperdiet. Quis ipsum suspendisse ultrices gravida dictum fusce. Imperdiet proin fermentum leo vel orci. Nec nam aliquam sem et tortor consequat. Gravida in fermentum et sollicitudin ac. Dolor purus non enim praesent elementum facilisis leo. Quisque sagittis purus sit amet volutpat consequat mauris. Praesent semper feugiat nibh sed pulvinar proin gravida hendrerit lectus. Neque gravida in fermentum et sollicitudin ac. Blandit cursus risus at ultrices mi tempus. Feugiat nisl pretium fusce id. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing. In nisl nisi scelerisque eu ultrices vitae auctor. Ipsum nunc aliquet bibendum enim facilisis. Vestibulum lectus mauris ultrices eros. Elit pellentesque habitant morbi tristique senectus.'

export const app: FastifyPluginAsync = async (app) => {
  mongoose.connect(DDBB).then(() => app.log.info('Connected to MongoDB at ' + DDBB))

  // app.register(fastifyStatic, {
  //   root: path.join(__dirname, '../public'),
  //   prefix: '/public/',
  // });

  await app.register(blipp)
  await app.register(fastifyCors)

  await app.register(fastifyAuth0Verify, {
    domain: AUTH0.DOMAIN,
    audience: AUTH0.AUDIENCE
  })

  await app.register(require('fastify-mailer'), {
    defaults: { from: `Habbits ${MAIL.USER}` },
    transport: {
      host: MAIL.HOST,
      port: MAIL.PORT,
      secure: true,
      auth: {
        user: MAIL.USER,
        pass: MAIL.PASS
      }
    }
  })

  await app.get('/', (request: any, reply: any) => {
    request.log.info(`Get http://${ROOT}:${PORT}/`)

    if (request.query.email) {
      // const { mailer } = app
      // mailer.sendMail(
      //   {
      //     to: request.query.email,
      //     subject: 'Prueba',
      //     html: emailTemplate
      //       .replace('{{subject}}', 'Asunto de prueba')
      //       .replace('{{title}}', 'Titulo de prueba')
      //       .replace('{{username}}', 'Jesus Silva')
      //       .replace('{{message}}', lorem)
      //       .replace('{{button}}', 'Ir a Habbits.es')
      //       .replace('{{buttonLink}}', 'https://habbits.es')
      //       .replace('{{to}}', request.query.email)
      //       .replace('{{unsubscriberLink}}', 'https://habbits.es')
      //   },
      //   (errors: any, info: any) => {
      //     if (errors) {
      //       // app.log.error(errors)
      //       return reply
      //         .code(500)
      //         .send({ status: 'Error', message: 'Error sending email' })
      //     } else if (info) {
      //       // app.log.info(info)
      //       return reply.code(200).send({ status: 'Ok', message: 'Email sent' })
      //     }
      //   }
      // )
      return reply
        .code(200)
        .send({ status: 'Ok', message: 'Email ' + request.query.email })
    } else {
      return reply.code(200).send({ status: 'Ok', message: 'Server Running' })
    }
  })

  app.get('/verify', {
    handler(req, res) {
      res.send(req.user)
    },
    preValidation: app.authenticate
  })

  // await app.register(usersRouter, { prefix: '/users' })
  // await app.register(usersRouter, { prefix: '/measures' })
  // await app.register(usersRouter, { prefix: '/exercises' })
  // await app.register(habbitsRouter, { prefix: '/habbits' })

  app.blipp()
}
