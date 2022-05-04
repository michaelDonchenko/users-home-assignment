import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { UserI } from '../../interfaces/users-interface'
import DeleteUserModal from '../modals/delete-user-modal'
import UpdateUserForm from '../modals/update-user-form-modal'

const TableRow: React.FC<{ user: UserI }> = ({ user }) => {
  const { email, image, location, name, id } = user
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  return (
    <TR>
      <TD>{name}</TD>
      <TD>{email}</TD>
      <TD>{location}</TD>
      <TD>
        <ProfileImage src={image} alt={name} />
      </TD>
      <TD>
        <RelativeModalContainer>
          {isUpdateModalOpen && (
            <UpdateUserForm user={user} setOpen={setIsUpdateModalOpen} />
          )}
          <Button
            onClick={() => setIsUpdateModalOpen(!isUpdateModalOpen)}
            buttonType='update'
          >
            Edit
          </Button>
        </RelativeModalContainer>
      </TD>
      <TD>
        <RelativeModalContainer>
          {isDeleteModalOpen && (
            <DeleteUserModal userId={id} setOpen={setIsDeleteModalOpen} />
          )}
          <Button
            onClick={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
            buttonType='delete'
          >
            Delete
          </Button>
        </RelativeModalContainer>
      </TD>
    </TR>
  )
}

const TR = styled.tr`
  background-color: white;
  color: black;

  &:hover {
    background-color: lightgray;
  }
`

const TD = styled.td`
  padding: 8px 10px;
  cursor: default;
`

const RelativeModalContainer = styled.div`
  position: relative;
`

const Button = styled.button<{ buttonType: 'update' | 'delete' }>`
  width: 60px;
  color: white;
  background-color: ${(props) =>
    props.buttonType === 'update' ? 'darkOrange' : 'crimson'};
  border-radius: 4px;
  border: none;
  cursor: pointer;
  height: 30px;
  font-size: 16px;
  transition: all 0.2s linear;

  &:hover {
    opacity: 0.8;
  }
`

const ProfileImage = styled.img`
  height: 70px;
  width: 70px;
`

export default TableRow
