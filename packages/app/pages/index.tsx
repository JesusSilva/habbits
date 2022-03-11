import { Helmet, HelmetProvider } from 'react-helmet-async'
import styled from 'styled-components'
import styles from '../styles/globals.module.css'

export default function Index() {
  return (
    <>
      <HelmetProvider>
        <Helmet htmlAttributes={{ lang: 'es' }}>
          <meta charSet="utf-8" />
          <title>Habbits</title>
          <link rel="canonical" href="http://localhost:3000/" />
          <link id="favicon" rel="icon" href="/images/logos/favicon.ico" type="image/x-icon" />
          <meta name="description" content="the page description" />
        </Helmet>
      </HelmetProvider>

      <Header className={styles.container}>
        <Texts>
          <Title>¿Cansado de sentirte mal contigo mismo?</Title>
          <SubTitle>¿Te has planteado cambiar tus hábitos?</SubTitle>

          <Button>Comencemos</Button>
        </Texts>

        <Ilustration>
          <ImageRunner src="/images/illustrations/running-animate.svg" alt="Running" />
        </Ilustration>
      </Header>
    </>
  )
}

const Header = styled.header`
  height: calc(100vh - 64px);
  width: 100%;
  padding: 24px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  @media (max-width: 1024px) {
    flex-direction: column-reverse;
  }
  @media (min-width: 1366px) {
    padding: 80px;
  }
  @media (min-width: 1920px) {
    padding: 120px;
  }
`

const Ilustration = styled.div`
  padding: 24px;
  max-height: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  @media (max-width: 1366px) {
    max-width: 600px;
  }
`

const Texts = styled.div`
  padding: 24px;
  height: 500px;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  @media (min-width: 1366px) {
    max-width: 700px;
  }
`

const Title = styled.h1`
  color: #202b45;
  font-weight: 800;
  font-size: 32px;
  margin: 0px;
  @media (min-width: 1366px) {
    font-size: 40px;
  }
  @media (min-width: 1920px) {
    font-size: 56px;
  }
`
const SubTitle = styled.h2`
  color: #202b45;
  font-weight: 600;
  font-size: 24px;
`

const ImageRunner = styled.img`
  object-fit: contain;
  height: 100%;
  width: 100%;
  max-height: 800px;
`

const Button = styled.button`
  height: auto;
  width: 100%;
  padding: 8px 16px;
  font-size: 24px;
  background-color: #00bd56;
  border: 1px solid #00bd56;
  border-radius: 4px;
  color: #ffffff;
  margin-top: 24px;
  cursor: pointer;
`
