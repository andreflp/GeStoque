const SET_PRODUTOS = (state, obj) => {
  state.produtos = obj.produtos
}

const LOADING_PRODUTOS = (state, param) => {
  state.loading = param
}

export default {
  SET_PRODUTOS,
  LOADING_PRODUTOS
}
