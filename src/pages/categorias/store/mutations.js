const SET_CATEGORIAS = (state, obj) => {
  state.categorias = obj.categorias
}

const LOADING = (state, param) => {
  state.loading = param
}

export default {
  SET_CATEGORIAS,
  LOADING
}
