import dotenv from 'dotenv'

dotenv.config()

const checkEnvironment = (environment: string) => {
  if (!process.env[environment]) {
    throw new Error(`Please define the Enviroment variable ${environment}`)
  } else {
    return process.env[environment] as string
  }
}

export const ROOT: string = checkEnvironment('ROOT')
export const PORT: number = parseInt(checkEnvironment('PORT'))
export const DDBB: string = checkEnvironment('DDBB') + '' + checkEnvironment('NAME')
export const NAME: string = checkEnvironment('NAME')

export const AUTH0: { DOMAIN: string; AUDIENCE: string } = {
  DOMAIN: checkEnvironment('AUTH0_DOMAIN'),
  AUDIENCE: checkEnvironment('AUTH0_AUDIENCE')
}

export const MAIL: { USER: string; PASS: string; HOST: string; PORT: number } = {
  USER: checkEnvironment('USER_MAIL'),
  PASS: checkEnvironment('PASS_MAIL'),
  HOST: checkEnvironment('HOST_MAIL'),
  PORT: parseInt(checkEnvironment('PORT_MAIL'))
}
