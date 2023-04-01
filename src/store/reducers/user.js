const initialState = {}
export const user = (state = initialState, action) => {
  switch (action.type) {
    case 'user/setUserInfo':
      return action.payload
    case 'user/clearUserInfo':
      return initialState
    default:
      return state
  }
}
