import axios from 'axios'

const setFornecedores = async ({ commit }) => {
  let url = 'http://localhost:3000/fornecedor'
  const list = (await axios.get(url)).data.fornecedores
  commit('SET_FORNECEDORES', { list })
}

const deleteFornecedor = async ({ commit, state }, [item, id]) => {
  const index = state.list.indexOf(item)
  let list = state.list
  let url = `http://localhost:3000/fornecedor/${id}`
  const resp = await axios.delete(url)
  if (resp.status === 200) {
    list.splice(index, 1)
    commit('SET_FORNECEDORES', { list })
  }
}

export default {
  setFornecedores,
  deleteFornecedor
}
