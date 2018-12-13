import axios from "axios";

export default {

  state: {
    token: localStorage.getItem('token') || '',
    status: '',
    snack: false
  },

  actions: {
    login(context, payload) {
      const url = "http://localhost:8080/Gestoque/login";

      return new Promise((resolve, reject) => {

        axios.post(url, payload).then((response) => {
          let accessToken = response.headers.authorization;
          localStorage.setItem('token', accessToken);
          context.commit('authSuccess', accessToken);
          axios.defaults.headers.common['Authorization'] = accessToken;
          context.dispatch('getUsername');
          resolve(response);
        })
          .catch((error) => {
            if (error.response.status === 401) {
              context.commit('snack', true);
            }
            localStorage.removeItem('token');
            context.commit('authError')
            console.log(error);
            reject(error)
          })
      })
    },

    getUsername() {
      const url = "http://localhost:8080/Gestoque/usuario/getUser";
      const token = localStorage.getItem("token");

      axios
        .get(url, { headers: { Authorization: `${token}` } })
        .then(response => {
          localStorage.setItem('user', response.data);
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },

    logout(context) {
      return new Promise((resolve, reject) => {
        context.commit('authLogout');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
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

    snack(state, snack) {
      state.snack = snack
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