import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { AuthState, User, LoginResponse } from '../../../types'
import { STORAGE_KEYS } from '../../../constants'
import { setStorage, removeStorage } from '../../../utils'

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    loginSuccess: (state, action: PayloadAction<LoginResponse>) => {
      state.isLoading = false
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      state.error = null
      // 使用封装的存储工具函数
      setStorage(STORAGE_KEYS.TOKEN, action.payload.token)
      setStorage(STORAGE_KEYS.USER_INFO, action.payload.user)
    },
    loginFailure: (state, action: PayloadAction<string | null>) => {
      state.isLoading = false
      state.isAuthenticated = false
      state.error = action.payload
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null
      // 使用封装的存储工具函数
      removeStorage(STORAGE_KEYS.TOKEN)
      removeStorage(STORAGE_KEYS.USER_INFO)
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isAuthenticated = true
      state.error = null
    },
  },
})

export const { loginStart, loginSuccess, loginFailure, logout, setUser } =
  authSlice.actions
export default authSlice.reducer
