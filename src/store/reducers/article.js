const initState = {
  // 频道数据
  channels: [],
  page:1,
  pageSize:10,
  list:[],
  total:1,
}
export const article = (state = initState, action) => {
  switch (action.type) {
    case 'article/setChannels':
      return {
        ...state,
        channels: action.payload,
      }
    case 'article/setArticle':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}
