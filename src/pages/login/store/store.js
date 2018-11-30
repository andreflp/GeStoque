import axios from "axios";

export default {

  state: {
    token: localStorage.getItem('token') || '',
    status: '',
  },

  actions: {
    login(context, payload) {
      const url = "http://localhost:8080/Gestoque/login";

      return new Promise((resolve, reject) => {

        axios.post(url, payload).then((response) => {
          let accessToken = response.headers.authorization;
          context.commit('authSuccess', accessToken)
          localStorage.setItem('token', accessToken);
          axios.defaults.headers.common['Authorization'] = accessToken;

          resolve(response);
        })
          .catch((error) => {
            localStorage.removeItem('token');
            context.commit('authError')
            console.log(error);
            reject(error)
          })
      })
    },

    logout(context) {
      return new Promise((resolve, reject) => {
        context.commit('authLogout');
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];

        resolve();

      })
    }
  },

  mutations: {
    authSuccess(state, token) {
      state.token = token;
      state.status = 'success';
    },

    authError(state) {
      state.token = '';
      state.status = 'error';
    },

    authLogout(state) {
      state.token = '';
    }

  },

  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,


  },


}