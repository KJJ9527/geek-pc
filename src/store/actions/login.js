import { http, setToken } from '@/utils'
export const login = (loginData) => {
  return async (dispatch) => {
    const res = await http.post('/authorizations', loginData)
    const {
      data: { token },
      message,
    } = res.data
    if (message === 'OK') {
      dispatch({ type: 'login/setLogin', payload: token })
      setToken(token)
    }
  }
}
