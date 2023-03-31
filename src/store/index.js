import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'
const initialState = { login: localStorage.getItem('geek-pc-token') }
const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
})
export default store
