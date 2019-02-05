const SET_CATEGORIAS = (state, obj) => {
  state.categorias = obj.categorias
}

const LOADING_CATEGORIAS = (state, param) => {
  state.loading = param
}

export default {
  SET_CATEGORIAS,
  LOADING_CATEGORIAS
}
