import axios from 'axios'

const setFornecedores = async ({ commit }, pagination) => {
  try {
    commit('LOADING_FORNECEDORES', true)
    let url = 'http://localhost:3000/fornecedor'
    const fornecedores = (await axios.get(url, {
      params: {
        page: pagination.page,
        rowsPerPage: pagination.rowsPerPage,
        nome: pagination.nome
      }
    })).data.fornecedores
    commit('SET_FORNECEDORES', { fornecedores })
    commit('LOADING_FORNECEDORES', false)
  } catch (error) {
    console.log(error)
    commit('LOADING_FORNECEDORES', false)
  }
}

const deleteFornecedor = async ({ state, dispatch }, [item, id, pag]) => {
  try {
    const index = state.fornecedores.fornecedores.indexOf(item)
    let fornecedores = state.fornecedores
    let url = `http://localhost:3000/fornecedor/${id}`
    const resp = await axios.delete(url)
    if (resp.status === 200) {
      if (fornecedores.fornecedores.length - 1 == 0) {
        pag.page -= 1
      }
      fornecedores.splice(index, 1)
      await dispatch('setFornecedores', pag)
    }
  } catch (error) {
    console.log(error)
  }
}

export default {
  setFornecedores,
  deleteFornecedor
}
