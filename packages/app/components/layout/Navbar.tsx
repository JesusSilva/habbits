import { useUser } from '@auth0/nextjs-auth0'
import Link from 'next/link'
import styled from 'styled-components'

const Nav = styled.section`
  height: 64px;
  width: 100%;
  padding: 8px 24px;
  background: #eafaf3;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
`

const BtnLink = styled.button`
  color: #00bd56;
  cursor: pointer;
  background: transparent;
  border: 1px solid #00bd56;
  border-radius: 8px;
  padding: 8px 16px;
  &:hover {
    background-color: #eafaf3;
  }
`

const Name = styled.span`
  color: #00bd56;
  font-weight: 700;
  font-size: 16px;
`

function Navbar() {
  const { user, error, isLoading } = useUser()

  console.log(user)
  console.log(error)
  console.log(isLoading)

  return (
    <Nav>
      <div>
        <Name>{user?.name}</Name>
      </div>
      <div>
        {user ? (
          <Link href="/api/auth/logout">
            <BtnLink>Cerrar sesión</BtnLink>
          </Link>
        ) : (
          <Link href="/api/auth/login">
            <BtnLink>Iniciar sesión</BtnLink>
          </Link>
        )}
      </div>
    </Nav>
  )
}

export default Navbar
