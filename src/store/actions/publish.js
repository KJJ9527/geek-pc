import { http } from '@/utils'
// 发布文章
export const updateArticles = (data, isDraft) => {
  return async () => {
    await http.post(`/mp/articles?draft=${isDraft}`, data)
  }
}
// 获取文章详情
export const getArticleById = (id) => {
  return async (dispatch) => {
    const res = await http.get(`mp/articles/${id}`)
    return res.data.data
  }
}
