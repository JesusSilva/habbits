import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0'
import { BaseRoute } from '../../api/routes'

export default withApiAuthRequired(async (req, res) => {
  const { accessToken } = await getAccessToken(req, res)
  console.log(accessToken)

  const responseApi = await BaseRoute.get('/verify', {
    headers: { Authorization: 'Bearer ' + accessToken }
  })

  console.log('Respuesta de verify: ', responseApi)
  res.status(200).json(responseApi.data)
})
