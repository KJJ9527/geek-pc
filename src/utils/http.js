import axios from 'axios'

const http = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
})
export { http }
