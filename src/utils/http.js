import axios from 'axios'

const http = axios.create({
  baseURL: 'http://geek.itheima.net',
})
export { http }
