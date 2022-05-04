import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserI } from '../interfaces/users-interface'

export interface usersState {
  users: UserI[]
  searchQuery: string
}

const initialState: usersState = {
  users: [],
  searchQuery: '',
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsersToStore: (state, action: PayloadAction<UserI[]>) => {
      state.users = action.payload
    },
    addNewUser: (state, action: PayloadAction<UserI>) => {
      state.users.unshift(action.payload)
    },
    deleteUser: (state, action: PayloadAction<UserI[]>) => {
      state.users = action.payload
    },
    clearAllUsers: (state) => {
      state.users = []
    },
    updateUser: (state, action: PayloadAction<UserI[]>) => {
      state.users = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
  },
})

export const {
  setUsersToStore,
  addNewUser,
  deleteUser,
  clearAllUsers,
  updateUser,
  setSearchQuery,
} = usersSlice.actions

export default usersSlice.reducer
