import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'
import { getToken } from '@/utils/token'
const initialState = {login:getToken()}
const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
})
export default store
