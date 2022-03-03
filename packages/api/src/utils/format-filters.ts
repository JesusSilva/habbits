import { plainToInstance } from 'class-transformer'
import { isNull, isUndefined, omitBy } from 'lodash'

export function FormatFilters(model: any, query: any) {
  let filters = omitBy(plainToInstance(model, query, { excludeExtraneousValues: true }), isNull)
  filters = omitBy(filters, isUndefined)
  return filters
}
