import { http, setToken } from '@/utils'
import { removeToken } from '@/utils'
export const login = (loginData) => {
  return async (dispatch) => {
    const res = await http.post('/v1_0/authorizations', loginData)
    const {
      data: { token },
      message,
    } = res.data
    if (message === 'OK') {
      dispatch({ type: 'login/setToken', payload: token })
      setToken(token)
    }
  }
}

// 清除redux中用户信息
export const logout = () => {
  return (dispatch) => {
    // 1.清除redux token
    dispatch({ type: 'login/clearToken' })
    // 2.清除localStoreage token
    removeToken()
    // 3. 清除登录信息
    dispatch({ type: 'user/clearUserInfo' })
  }
}
