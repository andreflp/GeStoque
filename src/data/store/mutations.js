const authSuccess = (state, token) => {
  state.token = token
  state.status = 'success'
}

const authError = (state) => {
  state.token = ''
  state.status = 'error'
}

const authLogout = (state) => {
  state.token = ''
}

export default {
  authSuccess,
  authError,
  authLogout
}

