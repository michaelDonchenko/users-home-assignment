import React from 'react'
import styled from 'styled-components'
import { UserI } from '../../interfaces/users-interface'
import MobileTableRow from './mobile-table-row'

interface MobileViewProps {
  users: UserI[]
}

const MobileView: React.FC<MobileViewProps> = ({ users }) => {
  return (
    <Container>
      {users.map((user) => (
        <MobileTableRow user={user} key={user.id} />
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  min-height: 100%;
  margin: 20px auto;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 2px 4px;
`

export default MobileView
