import { combineReducers } from 'redux'
import { login } from './login'
import { user } from './user'
const rootReducer = combineReducers({
  login,
  user,
})
export default rootReducer
