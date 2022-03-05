import { plainToInstance } from 'class-transformer'

export function FormatResponse(model: any, response: any) {
  if (Array.isArray(response)) {
    return response.map((item: any) => plainToInstance(model, JSON.parse(JSON.stringify(item))))
  } else {
    return plainToInstance(model, JSON.parse(JSON.stringify(response)))
  }
}
