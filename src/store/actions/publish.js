import { http } from '@/utils'
// 发布文章
export const updateArticles = (data) => {
  return async () => {
    await http.post('/mp/articles', data)
  }
}
