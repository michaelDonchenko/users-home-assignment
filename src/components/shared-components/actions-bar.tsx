import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { useAppDispatch } from '../../redux/hooks'
import { setSearchQuery } from '../../redux/users-slice'
import CreateUserForm from '../modals/create-user-form-modal'

const ActionsBar: React.FC = () => {
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const dispatch = useAppDispatch()

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
    dispatch(setSearchQuery(event.target.value))
  }

  return (
    <Container>
      {isCreateUserModalOpen && (
        <CreateUserForm setOpen={setIsCreateUserModalOpen} />
      )}
      <Button onClick={() => setIsCreateUserModalOpen(!isCreateUserModalOpen)}>
        Create new user
      </Button>

      <SearchInput
        onChange={(event) => onChange(event)}
        value={searchValue}
        type='text'
        placeholder='Search...'
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: 95%;
  max-width: 1280px;
  margin: 10px auto;
  position: relative;
`

const Button = styled.button`
  width: 140px;
  color: white;
  background-color: #20486a;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  height: 40px;
  font-size: 16px;
  transition: all 0.2s linear;
  margin-right: 20px;

  &:hover {
    transform: translateY(-2px);
  }
`
const SearchInput = styled.input`
  width: 180px;
  padding: 2px 10px;
  font-size: 16px;
  font-weight: 300;
  border-radius: 4px;
  border: 1px solid lightgray;
  outline: none;
`

export default ActionsBar
