import axios from 'axios'

const login = ({ commit }, payload) => {
  const url = "http://localhost:8080/Gestoque/login";

  return new Promise((resolve, reject) => {

    axios.post(url, payload).then((response) => {
      let accessToken = response.headers.authorization;
      commit('authSuccess', accessToken)
      localStorage.setItem('token', accessToken);
      axios.defaults.headers.common['Authorization'] = accessToken;

      resolve(response);
    })
      .catch((error) => {
        localStorage.removeItem('token');
        commit('authError')
        console.log(error);
        reject(error)
      })
  })
}

const logout = (commit) => {
  return new Promise((resolve, reject) => {
    commit('authLogout');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];

    resolve();

  })
}

export default {
  login,
  logout
}