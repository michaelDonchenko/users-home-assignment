import { UserValidationsI } from '../interfaces/users-interface'
import { toast } from 'react-toastify'

export function userValidations(args: UserValidationsI) {
  const { email, location, name, users, validationType, id } = args

  const emailRegexCheck = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
  let foundUser

  if (validationType === 'update') {
    const restOfUser = users.filter((user) => user.id !== id)
    foundUser = restOfUser.find((user) => user.email === email)
  }

  if (validationType === 'create') {
    foundUser = users.find((user) => user.email === email)
  }

  if (!email || !location || !name) {
    toast.error('All fields required')
    return
  }

  if (!emailRegexCheck) {
    toast.error('Invalid email format')
    return
  }

  if (name.length < 3 || location.length < 3) {
    toast.error('Name and location has to be at least 3 characters')
    return
  }

  if (foundUser) {
    toast.error('Email already exists')
    return
  }

  return 'validation passed'
}
