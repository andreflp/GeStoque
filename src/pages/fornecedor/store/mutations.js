const SET_LIST = (state, obj) => {
  state.dadosFornecedor = obj.dadosFornecedor
  console.log('SET_LIST', obj.dadosFornecedor)
}

export default {
  SET_LIST
}
