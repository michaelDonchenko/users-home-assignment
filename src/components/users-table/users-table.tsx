import React from 'react'
import styled from 'styled-components'
import useWindowWidth from '../../hooks/use-window-width'
import { UserI } from '../../interfaces/users-interface'
import MobileView from './mobile-view'
import { tableColumns } from './table-config'
import TableRow from './table-row'

const UsersTable: React.FC<{ users: UserI[] }> = ({ users }) => {
  const { isMobile } = useWindowWidth()

  const renderTable = () => (
    <Table>
      <thead>
        <TR>
          {tableColumns.map((th) => (
            <TH key={th.key}>{th.title}</TH>
          ))}
        </TR>
      </thead>

      <tbody>
        {users.map((user) => (
          <TableRow user={user} key={user.id} />
        ))}
      </tbody>
    </Table>
  )

  return (
    <Container>
      {isMobile ? <MobileView users={users} /> : renderTable()}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100%;
`

const Table = styled.table`
  width: 95%;
  max-width: 1280px;
  margin: 10px auto;
  border-collapse: collapse;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 2px 4px;
  word-break: break-all;
`
const TH = styled.th`
  padding: 8px 10px;
  text-align: start;
  cursor: default;
  font-size: 18px;
`

const TR = styled.tr`
  background-color: #20486a;
  color: white;
`

export default UsersTable
