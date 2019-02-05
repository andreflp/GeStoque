import axios from 'axios'

const setProdutos = async ({ commit }, pagination) => {
  try {
    commit('LOADING_PRODUTOS', true)
    const url = 'http://localhost:3000/produto'
    const produtos = (await axios.get(url, {
      params: {
        page: pagination.page,
        rowsPerPage: pagination.rowsPerPage,
        nome: pagination.nome
      }
    })).data.produtos
    commit('SET_PRODUTOS', { produtos })
    commit('LOADING_PRODUTOS', false)
  } catch (error) {
    console.log(error)
    commit('LOADING_PRODUTOS', false)
  }
}

const deleteProduto = async ({ state, dispatch }, [item, id, pag]) => {
  try {
    let produtos = state.produtos
    const index = produtos.produtos.indexOf(item)
    let url = `http://localhost:3000/produto/${id}`
    const resp = await axios.delete(url)
    if (resp.status === 200) {
      if (produtos.produtos.length - 1 == 0) {
        pag.page -= 1
      }
      produtos.produtos.splice(index, 1)
      await dispatch('setProdutos', pag)
    }
  } catch (error) {
    console.log(error)
  }
}

export default {
  setProdutos,
  deleteProduto
}
