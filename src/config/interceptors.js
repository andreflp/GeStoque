export function interceptors (axios) {
  axios.defaults.headers.common['Authorization'] = `${localStorage.getItem(
    'token'
  )}`

  axios.interceptors.response.use(undefined, err => {
    return new Promise((resolve, reject) => {
      let res = err.response
      // eslint-disable-next-line eqeqeq
      if (res.data.error.message == 'jwt expired') {
        localStorage.removeItem('token')
        this.$router.push('/login')
      }
      resolve()
    })
  })
}
