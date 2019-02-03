import axios from 'axios'

const setProdutos = async ({ commit }) => {
  const url = 'http://localhost:3000/produto'
  const produtos = (await axios.get(url)).data.produtos
  commit('SET_PRODUTOS', { produtos })
}

const deleteProduto = async ({ commit, state }, [item, id]) => {
  let produtos = state.produtos
  const index = produtos.indexOf(item)
  let url = `http://localhost:3000/produto/${id}`
  const resp = await axios.delete(url)
  if (resp.status === 200) {
    produtos.splice(index, 1)
    commit('SET_PRODUTOS', { produtos })
  }
}

export default {
  setProdutos,
  deleteProduto
}
