import { UserI } from '../interfaces/users-interface'
import { toast } from 'react-toastify'

export async function fetchUsers(): Promise<UserI[]> {
  let users: UserI[] = []

  try {
    const response = await fetch('https://randomuser.me/api/?results=10')
    const data = await response.json()

    for (let user of data.results) {
      const {
        email,
        login: { uuid },
        name: { title, first, last },
        picture: { medium },
        location: {
          country,
          city,
          street: { name, number },
        },
      } = user

      const userObj = {
        id: uuid,
        name: `${title} ${first} ${last}`,
        email,
        image: medium,
        location: `${country} ${city} ${name} ${number}`,
      }

      users.push(userObj)
    }

    return users
  } catch (error) {
    console.log(error)
    toast.error('Could not fetch the users!')

    return []
  }
}
