export function authMiddleware (router, store) {
  router.beforeEach((to, from, next) => {
    const openRoutes = ['Login', 'Signup']
    if (openRoutes.includes(to.name)) {
      next()
    } else if (store.getters['Login/isAuthenticated']) {
      next()
    } else {
      next('/login')
    }
  })
}
