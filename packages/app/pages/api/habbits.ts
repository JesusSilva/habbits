import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0'
import { BaseRoute } from '../../api/routes'

export default withApiAuthRequired(async (req, res) => {
  const { accessToken } = await getAccessToken(req, res)

  const responseApi = await BaseRoute.get('/verify', {
    headers: { Authorization: 'Bearer ' + accessToken }
  })

  res.status(200).json(responseApi.data)
})
