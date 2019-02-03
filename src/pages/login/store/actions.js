import axios from 'axios'

const login = async ({ commit }, user) => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = 'http://localhost:3000/login'
      const usuario = await axios.post(url, user)
      let accessToken = `Bearer ${usuario.data.token}`
      localStorage.setItem('token', accessToken)
      commit('authSuccess', { accessToken })
      axios.defaults.headers.common['Authorization'] = accessToken
      resolve(usuario)
    } catch (error) {
      console.log(error.response.status)
      if (error.response.status === 403) {
        commit('snack', true)
      }
      localStorage.removeItem('token')
      commit('authError')
      reject(error)
    }
  })
}

const logout = ({ commit }) => {
  try {
    commit('authLogout')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    delete axios.defaults.headers.common['Authorization']
  } catch (error) {
    console.log(error)
  }
}

/*
getUsername () {
  const url = 'http://localhost:8080/Gestoque/usuario/getUser'
  const token = localStorage.getItem('token')

  axios
    .get(url, { headers: { Authorization: `${token}` } })
    .then(response => {
      localStorage.setItem('user', response.data)
    })
    .catch(error => {
      console.log(error)
    })
}, */

export default {
  login,
  logout
}
