import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'
import LogoutIcon from '@mui/icons-material/Logout'
import LockOpenIcon from '@mui/icons-material/LockOpen'

export default function Navbar() {
  const { user } = useUser()
  const router = useRouter()

  return (
    <Nav>
      <section style={{ width: '100%', maxWidth: '1920px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <LogoContainer>
            <Logo src="/images/logos/habbits_logo.svg" alt="Logo de Habbits" />
            <Title>Habbits</Title>
          </LogoContainer>
          {user && (
            <Menu>
              <Link href="/users">
                <CustomA className={router.pathname.includes('/users') ? 'active-link' : ''}>Usuarios</CustomA>
              </Link>
              <Link href="/bookings">
                <CustomA className={router.pathname.includes('/bookings') ? 'active-link' : ''}>Citas</CustomA>
              </Link>
              <Link href="/diets">
                <CustomA className={router.pathname.includes('/diets') ? 'active-link' : ''}>Dietas</CustomA>
              </Link>
              <Link href="/trainings">
                <CustomA className={router.pathname.includes('/trainings') ? 'active-link' : ''}>Entrenamientos</CustomA>
              </Link>
              <Link href="/exercises">
                <CustomA className={router.pathname.includes('/exercises') ? 'active-link' : ''}>Ejercicios</CustomA>
              </Link>
              <Link href="/measures">
                <CustomA className={router.pathname.includes('/measures') ? 'active-link' : ''}>Medidas</CustomA>
              </Link>
            </Menu>
          )}
        </div>
        <div>
          {user ? (
            <Link href="/api/auth/logout">
              <ButtonLink>
                {/* <img src={user.picture} alt="Avatar" width="32" height="32" style={{ borderRadius: '50%', border: '2px solid #00bd56' }} /> */}
                <LogoutIcon />
                <Name>{user?.name}</Name>
              </ButtonLink>
            </Link>
          ) : (
            <Link href="/api/auth/login">
              <ButtonLink>
                <LockOpenIcon />
                <Name>Iniciar sesión</Name>
              </ButtonLink>
            </Link>
          )}
        </div>
      </section>
    </Nav>
  )
}

const Nav = styled.section`
  height: 64px;
  width: 100%;
  padding: 8px 24px;
  background: #eafaf3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  section {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  @media (max-width: 768px) {
    padding: 8px;
  }
`

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`

const Logo = styled.img`
  object-fit: contain;
  width: 100%;
  height: 32px;
`

const Title = styled.span`
  color: #202b45;
  font-weight: 700;
  font-size: 32px;
  margin-left: 8px;
`

const Name = styled.span`
  font-weight: 300;
  font-size: 16px;
  margin: 0 16px;
  @media (max-width: 768px) {
    font-size: 12px !important;
  }
`

const ButtonLink = styled.button`
  color: #00bd56;
  cursor: pointer;
  background-color: #eafaf3;
  border: 1px solid #00bd56;
  border-radius: 4px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #00bd56;
    color: #ffffff;
  }
  @media (max-width: 768px) {
    padding: 4px;
  }
`

const Menu = styled.section`
  margin-left: 24px;
  color: #202b45;
`

const CustomA = styled.a`
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
`
