import { http } from '@/utils'
export const getUserInfo = () => {
  return async (dispatch) => {
    const res = await http.get('/user/profile')
    dispatch({ type: 'user/setUserInfo', payload: res.data.data })
  }
}
