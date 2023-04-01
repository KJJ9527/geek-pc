const initialState = ''
export const login = (state = initialState, action) => {
  switch (action.type) {
    case 'login/setToken':
      return action.payload
    case 'login/clearToken':
      return initialState
    default:
      return state
  }
}
