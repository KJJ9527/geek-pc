export const GEEK_TOKEN = 'geek-pc-token'
// 获取token
export const getToken = () => localStorage.getItem(GEEK_TOKEN)
// 设置token
export const setToken = (token) => localStorage.setItem(GEEK_TOKEN, token)
// 清除token
export const removeToken = () => localStorage.removeItem(GEEK_TOKEN)
// 判断是否有token
export const isTOken = () => Boolean(getToken())
