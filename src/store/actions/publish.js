import { http } from '@/utils'
// 更新文章
export const updateArticles = (data, isDraft, isEdit) => {
  return async () => {
    if (isEdit) {
      // 编辑文章
      await http.put(`/mp/articles/${data.id}/?draft=${isDraft}`, data)
    } else {
      // 发布文章
      await http.post(`/mp/articles?draft=${isDraft}`, data)
    }
  }
}
// 获取文章详情
export const getArticleById = (id) => {
  return async () => {
    const res = await http.get(`mp/articles/${id}`)
    return res.data.data
  }
}
