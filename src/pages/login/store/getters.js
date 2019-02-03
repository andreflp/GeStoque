const isAuthenticated = state => {
  return !!state.token
}
const authStatus = state => {
  return state.status
}

export default {
  isAuthenticated,
  authStatus
}
