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
//       return reply.code(500).send({ status: 'Error', message: 'Error sending email' })
//     } else if (info) {
//       // app.log.info(info)
//       return reply.code(200).send({ status: 'Ok', message: 'Email sent' })
//     }
//   }
// )
// return reply.code(200).send({ status: 'Ok', message: 'Email ' + request.query.email })
