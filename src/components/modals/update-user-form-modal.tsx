import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import useWindowWidth from '../../hooks/use-window-width'
import { UserI } from '../../interfaces/users-interface'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { updateUser } from '../../redux/users-slice'
import { userValidations } from '../../utils/validations'
import FormInput from '../shared-components/form-input'

interface UpdateUserFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  user: UserI
  setShowFullDetails?: React.Dispatch<React.SetStateAction<boolean>>
}

const UpdateUserForm: React.FC<UpdateUserFormProps> = ({
  setOpen,
  user,
  setShowFullDetails,
}) => {
  const { users } = useAppSelector((users) => users.users)
  const dispatch = useAppDispatch()
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [location, setLocation] = useState(user.location)
  const { isMobile } = useWindowWidth()

  const clearState = () => {
    setName('')
    setEmail('')
    setLocation('')
  }

  const onUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const result = userValidations({
      name,
      email,
      location,
      users,
      validationType: 'update',
      id: user.id,
    })

    if (result !== 'validation passed') {
      return
    }

    const updatedUser = {
      id: user.id,
      name,
      email,
      location,
      image: user.image,
    }

    let restOfUsers = users.filter((user) => user.id !== updatedUser.id)
    restOfUsers.unshift(updatedUser)

    dispatch(updateUser(restOfUsers))
    clearState()
    setOpen(false)

    if (setShowFullDetails) {
      setShowFullDetails(false)
    }
  }

  return (
    <Form isMobile={isMobile} onSubmit={(event) => onUpdate(event)}>
      <FormInput
        label='Name'
        type='text'
        onChange={(event) => setName(event.target.value)}
        value={name}
      />

      <FormInput
        label='Email'
        type='text'
        onChange={(event) => setEmail(event.target.value)}
        value={email}
      />

      <FormInput
        label='Location'
        type='text'
        onChange={(event) => setLocation(event.target.value)}
        value={location}
      />

      <Button buttonType='save'>Save</Button>
      <Button
        onClick={() => setOpen((prev) => !prev)}
        type='button'
        buttonType='cancel'
      >
        Cancel
      </Button>
    </Form>
  )
}

const Form = styled.form<{ isMobile: boolean }>`
  position: absolute;
  z-index: 100;
  width: 280px;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 2px 4px;
  padding: 20px 10px;
  top: 30px;
  right: ${(props) => (props.isMobile ? 'null' : '0')};
  left: ${(props) => (props.isMobile ? '0' : 'null')};
  background-color: white;
`

const Button = styled.button<{ buttonType: 'save' | 'cancel' }>`
  width: 80px;
  color: ${(props) => (props.buttonType === 'save' ? 'white' : 'darkOrange')};
  background-color: ${(props) =>
    props.buttonType === 'save' ? 'darkOrange' : 'white'};
  border-radius: 4px;
  border: 1px solid;
  cursor: pointer;
  height: 40px;
  font-size: 16px;
  transition: all 0.2s linear;
  border-color: darkOrange;
  margin-right: 10px;

  &:hover {
    opacity: 0.8;
  }
`

export default UpdateUserForm
