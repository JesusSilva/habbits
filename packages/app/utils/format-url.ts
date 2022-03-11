export function FormatUrl(url: string, filter: any, id?: any) {
  const params = new URLSearchParams()
  for (const key in filter) {
    // eslint-disable-next-line no-prototype-builtins
    if (filter.hasOwnProperty(key) && filter[key] !== undefined && filter[key] !== null) {
      if (Array.isArray(filter[key]) && !filter[key].length) {
        continue
      }

      if (typeof filter[key] === 'string' && !filter[key].length) {
        continue
      }

      params.set(key, filter[key])
    }
  }
  if (params.toString().length) {
    url += '?' + decodeURIComponent(params.toString())
  }
  if (url.includes('{id}') && id) {
    url = url.replace('{id}', id)
  }
  return url
}
