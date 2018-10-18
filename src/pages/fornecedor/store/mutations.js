const SET_LIST = (state, obj) => {
  state.dadosFornecedor = obj.dadosFornecedor
  console.log("SET_LIST", obj.dadosFornecedor)
}

const ADD_FORNECEDOR = (state, obj) => {
  obj.response
  console.log("ADD", obj.response)
}

export default {
  SET_LIST,
  ADD_FORNECEDOR
}