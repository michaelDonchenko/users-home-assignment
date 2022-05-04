import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import GlobalStyle from './global-styles'
import styled from 'styled-components'
import { fetchUsers } from './api/users-api'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { setUsersToStore } from './redux/users-slice'
import UsersTable from './components/users-table/users-table'
import { useState } from 'react'
import ActionsBar from './components/shared-components/actions-bar'

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const { users: usersFromRedux, searchQuery } = useAppSelector(
    (state) => state.users
  )
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState(usersFromRedux)

  async function fetchUsersFromDB() {
    setLoading(true)

    const usersFromDB = await fetchUsers()

    if (usersFromDB.length) {
      dispatch(setUsersToStore(usersFromDB))
    }

    setLoading(false)
  }

  const filterUsers = () => {
    if (!searchQuery) {
      return setUsers(usersFromRedux)
    }

    const filtered = usersFromRedux.filter(
      (user) =>
        user.id.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
        user.email
          .toLocaleLowerCase()
          .includes(searchQuery.toLocaleLowerCase()) ||
        user.location
          .toLocaleLowerCase()
          .includes(searchQuery.toLocaleLowerCase()) ||
        user.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
    )

    setUsers(filtered)
  }

  useEffect(() => {
    !users.length && fetchUsersFromDB()

    setUsers(usersFromRedux)
  }, [usersFromRedux])

  useEffect(() => {
    filterUsers()
  }, [searchQuery])

  return (
    <AppWrapper>
      <GlobalStyle />
      <ToastContainer position='top-right' />

      <Header>Apps force home assignment</Header>
      <ActionsBar />

      {loading && <Loader>Loading...</Loader>}

      {!loading && !users.length && <Text>No users found...</Text>}

      {!loading && users.length > 0 && <UsersTable users={users} />}
    </AppWrapper>
  )
}

const AppWrapper = styled.main`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: whitesmoke;
`
const Loader = styled.h1`
  text-align: center;
`

const Header = styled.h2`
  text-align: center;
  margin: 20px auto;
`

const Text = styled.p`
  text-align: center;
  margin: 20px 0;
`

export default App
