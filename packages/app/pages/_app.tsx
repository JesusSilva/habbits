import PropTypes from 'prop-types'
import Navbar from '../components/layout/Navbar'
import { UserProvider } from '@auth0/nextjs-auth0'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Navbar />
      <Component {...pageProps} />
    </UserProvider>
  )
}

MyApp.propTypes = {
  pageProps: PropTypes.shape({}),
  Component: PropTypes.elementType
}

export default MyApp
