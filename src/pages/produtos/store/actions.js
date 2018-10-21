import axios from 'axios'

const setProdutos = async ({ commit }) => {
  let url = "http://localhost:8080/Gestoque/produto/produtos";
  const produtos = (await axios.get(url)).data;
  commit('SET_PRODUTOS', { produtos });
}

const deleteProdutos = ({ commit, state }, [item, id]) => {
  const index = state.produtos.indexOf(item);
  let produtos = state.produtos;
  let url = `http://localhost:8080/Gestoque/produto/delete/${id}`;
  return axios.delete(url).then(resp => {
    if (resp.status === 200) {
      produtos.splice(index, 1);
      commit("SET_CATEGORIAS", { produtos })
    }

  })
}

export default {
  setProdutos,
  deleteProdutos
}