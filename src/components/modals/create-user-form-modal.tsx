import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { userValidations } from '../../utils/validations'
import FormInput from '../shared-components/form-input'
import { generateRandomImage } from '../../utils/functions'
import { v4 as uuidv4 } from 'uuid'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { addNewUser } from '../../redux/users-slice'

interface CreateUserFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({ setOpen }) => {
  const { users } = useAppSelector((users) => users.users)
  const dispatch = useAppDispatch()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [location, setLocation] = useState('')

  const clearState = () => {
    setName('')
    setEmail('')
    setLocation('')
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const randomImage = generateRandomImage()
    const randomId = uuidv4()

    const result = userValidations({
      name,
      email,
      location,
      users,
      validationType: 'create',
      id: randomId,
    })

    if (result !== 'validation passed') {
      return
    }

    const newUser = {
      id: randomId,
      name,
      email,
      location,
      image: randomImage,
    }

    dispatch(addNewUser(newUser))
    clearState()
    setOpen(false)
  }

  return (
    <Form onSubmit={(event) => onSubmit(event)}>
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

      <Button buttonType='submit'>Submit</Button>
      <Button onClick={() => setOpen(false)} type='button' buttonType='cancel'>
        Cancel
      </Button>
    </Form>
  )
}

const Form = styled.form`
  position: absolute;
  z-index: 100;
  width: 320px;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 2px 4px;
  padding: 20px 10px;
  top: 45px;
  left: 0;
  background-color: white;
`

const Button = styled.button<{ buttonType: 'submit' | 'cancel' }>`
  width: 80px;
  color: ${(props) => (props.buttonType === 'submit' ? 'white' : '#20486a')};
  background-color: ${(props) =>
    props.buttonType === 'submit' ? '#20486a' : 'white'};
  border-radius: 4px;
  border: 1px solid;
  cursor: pointer;
  height: 40px;
  font-size: 16px;
  transition: all 0.2s linear;
  border-color: #20486a;
  margin-right: 10px;

  &:hover {
    opacity: 0.8;
  }
`

export default CreateUserForm
