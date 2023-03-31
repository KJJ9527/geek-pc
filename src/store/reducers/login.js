const initialState = ''
const login = (state = initialState, action) => {
  switch (action.type) {
    case 'login/setLogin':
      return (state = action.payload)
    default:
      return state
  }
}
export default login
