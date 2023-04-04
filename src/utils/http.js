import axios from 'axios'
import store from '@/store'
import { message } from 'antd'
import { customHistroy } from './history'
import { logout } from '@/store/actions'
const http = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
})

// 请求拦截器
http.interceptors.request.use((config) => {
  const { login: token } = store.getState()
  if (!config.url.startsWith('/authorizations')) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 响应拦截器
http.interceptors.response.use(undefined, (error) => {
  // 响应失败，会执行此处的回调函数
  if (error.response.status === 401) {
    message.warning('登录超时，请重新登录！', 1.5)
    customHistroy.push('/login', {
      from: customHistroy.location.pathname,
    })
    // 清除token和个人信息
    store.dispatch(logout())
  }
  return Promise.reject(error)
})

export { http }
