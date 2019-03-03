export function interceptors (axios, router) {
  axios.defaults.headers.common['Authorization'] = `${localStorage.getItem(
    'token'
  )}`

  /* axios.interceptors.response.use(undefined, error => {
    let res = error.response
    console.log({ error })

    console.log(error.response.data)

    console.log('message jwt', res.data.error.message)
    if (res.data.error.message == 'jwt expired') {
      localStorage.removeItem('token')
      router.push('/login')
    }
  }) */
}
