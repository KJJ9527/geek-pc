import axios from 'axios'

export const login = (loginData) => {
  return async (dispatch) => {
    const res = await axios.post(
      'http://geek.itheima.net/v1_0/authorizations',
      loginData
    )
    const {
      data: { token },
      message,
    } = res.data
    if (message === 'OK') {
      dispatch({ type: 'login/setLogin', payload: token })
      localStorage.setItem('geek-pc-token', token)
    }
  }
}
