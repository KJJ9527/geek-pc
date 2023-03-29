import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducers'
// 导入redux中间件
// import thunk from 'redux-thunk'
const store = configureStore({
  reducer,
})
export default store
