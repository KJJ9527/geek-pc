import { http } from '@/utils'
// 发布文章
export const updateArticles = (data, isDraft) => {
  return async () => {
    await http.post(`/mp/articles?draft=${isDraft}`, data)
  }
}
