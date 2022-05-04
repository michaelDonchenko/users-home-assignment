import React from 'react'
import styled from 'styled-components'
import useWindowWidth from '../../hooks/use-window-width'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { deleteUser } from '../../redux/users-slice'

interface DeleteUserModalProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  userId: string
  setShowFullDetails?: React.Dispatch<React.SetStateAction<boolean>>
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  setOpen,
  userId,
  setShowFullDetails,
}) => {
  const { users } = useAppSelector((state) => state.users)
  const dispatch = useAppDispatch()
  const { isMobile } = useWindowWidth()

  const onConfirm = () => {
    const filteredUsers = users.filter((user) => user.id !== userId)

    dispatch(deleteUser(filteredUsers))
    setOpen(false)

    if (setShowFullDetails) {
      setShowFullDetails(false)
    }
  }

  return (
    <Container isMobile={isMobile}>
      <Text>Are you sure you want to delete this user?</Text>

      <Button onClick={() => onConfirm()} buttonType='confirm'>
        Confirm
      </Button>
      <Button onClick={() => setOpen((prev) => !prev)} buttonType='cancel'>
        Cancel
      </Button>
    </Container>
  )
}

const Container = styled.div<{ isMobile: boolean }>`
  position: absolute;
  z-index: 100;
  width: 250px;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 2px 4px;
  padding: 20px 10px;
  top: 30px;
  right: ${(props) => (props.isMobile ? 'null' : '0')};
  left: ${(props) => (props.isMobile ? '0' : 'null')};
  background-color: white;
`

const Button = styled.button<{ buttonType: 'confirm' | 'cancel' }>`
  width: 70px;
  color: ${(props) => (props.buttonType === 'confirm' ? 'white' : 'crimson')};
  background-color: ${(props) =>
    props.buttonType === 'confirm' ? 'crimson' : 'white'};
  border-radius: 4px;
  border: 1px solid;
  cursor: pointer;
  height: 40px;
  font-size: 14px;
  transition: all 0.2s linear;
  border-color: crimson;
  margin-right: 10px;

  &:hover {
    opacity: 0.9;
  }
`

const Text = styled.p`
  margin-bottom: 20px;
`

export default DeleteUserModal
