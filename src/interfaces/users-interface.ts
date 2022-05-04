export interface UserI {
  id: string
  name: string
  email: string
  image: string
  location: string
}

export interface UserValidationsI {
  name: string
  email: string
  location: string
  users: UserI[]
  validationType: 'create' | 'update'
  id: string
}
