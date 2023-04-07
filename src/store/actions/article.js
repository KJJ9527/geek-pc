import { http } from '@/utils'
export const getChannels = () => {
  return async (dispatch) => {
    const res = await http.get('/channels')
    const { channels } = res.data.data
    dispatch({ type: 'article/setChannels', payload: channels })
  }
}
export const getArticles = (params) => {
  return async (dispatch) => {
    const res = await http.get('mp/articles', {
      params,
    })
    const {
      page,
      per_page: pageSize,
      results: list,
      total_count: total,
    } = res.data.data
    dispatch({
      type: 'article/setArticle',
      payload: {
        page,
        pageSize,
        list: list.map((item) => {
          return {
            ...item,
            cover: item.cover.images[0],
          }
        }),
        total,
      },
    })
  }
}
export const delArticles = (id) => {
  return async () => {
    await http.delete(`/mp/articles/${id}`)
  }
}
