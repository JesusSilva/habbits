import { plainToInstance } from 'class-transformer'

export function FormatResponse(model: any, response: any) {
  if (Array.isArray(response)) {
    return response.map((item: any) => plainToInstance(model, item))
  } else {
    return plainToInstance(model, response)
  }
}
