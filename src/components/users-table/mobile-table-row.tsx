import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { UserI } from '../../interfaces/users-interface'
import DeleteUserModal from '../modals/delete-user-modal'
import UpdateUserForm from '../modals/update-user-form-modal'

const MobileTableRow: React.FC<{ user: UserI }> = ({ user }) => {
  const { email, image, location, name, id } = user
  const [showFullDetails, setShowFullDetails] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const renderFullDetails = () => {
    return (
      <>
        <DataRow>
          <ProfileImage src={image} alt={name} />
        </DataRow>
        <DataRow>Name: {name}</DataRow>
        <DataRow>location: {location}</DataRow>
        <DataRow>
          <RelativeModalContainer>
            {isUpdateModalOpen && (
              <UpdateUserForm
                setOpen={setIsUpdateModalOpen}
                user={user}
                setShowFullDetails={setShowFullDetails}
              />
            )}
            <Button
              onClick={() => setIsUpdateModalOpen(!isUpdateModalOpen)}
              buttonType='update'
            >
              Update
            </Button>
          </RelativeModalContainer>

          <RelativeModalContainer>
            {isDeleteModalOpen && (
              <DeleteUserModal
                setOpen={setIsDeleteModalOpen}
                userId={id}
                setShowFullDetails={setShowFullDetails}
              />
            )}
            <Button
              onClick={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
              buttonType='delete'
            >
              Delete
            </Button>
          </RelativeModalContainer>
        </DataRow>
      </>
    )
  }

  return (
    <Container>
      <>
        <DataRow>
          <Email>{email}</Email>
          <TextButton onClick={() => setShowFullDetails(!showFullDetails)}>
            {!showFullDetails ? 'View details' : 'Hide details'}
          </TextButton>
        </DataRow>

        {showFullDetails && renderFullDetails()}
      </>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 100%;
  border-bottom: 1px solid gray;
`
const Email = styled.div`
  overflow-x: hidden;
`
const DataRow = styled.div`
  display: flex;
  padding: 5px 0;
`

const TextButton = styled.span`
  color: #20486a;
  margin-left: auto;
  margin-right: 5px;
  padding: 5px;
  min-width: 100px;
  cursor: pointer;
  text-align: center;
`

const ProfileImage = styled.img`
  height: 70px;
  width: 70px;
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

const RelativeModalContainer = styled.div`
  position: relative;
  margin-right: 10px;
`

export default MobileTableRow
