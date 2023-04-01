import { http } from '@/utils'
export const getUserInfo = () => {
  return async (dispatch, getState) => {
    const { login: token } = getState()
    const res = await http.get('/v1_0/user/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    dispatch({ type: 'user/setUserInfo', payload: res.data.data })
  }
}

