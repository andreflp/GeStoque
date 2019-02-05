const SET_FORNECEDORES = (state, obj) => {
  state.fornecedores = obj.fornecedores
}

const LOADING_FORNECEDORES = (state, param) => {
  state.loading = param
}

export default {
  SET_FORNECEDORES,
  LOADING_FORNECEDORES
}
