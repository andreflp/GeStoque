import axios from 'axios'
const token = localStorage.getItem('token');

const setProdutos = async ({ commit }) => {
  let url = "http://localhost:8080/Gestoque/produto/produtos";
  const produtos = (await axios.get(url, { headers: { "Authorization": `${token}` } })).data;
  commit('SET_PRODUTOS', { produtos });
}

const deleteProduto = ({ commit, state }, [item, id]) => {
  let produtos = state.produtos;
  const index = produtos.indexOf(item);
  let url = `http://localhost:8080/Gestoque/produto/delete/${id}`;
  axios.delete(url, { headers: { "Authorization": `${token}` } }).then(resp => {
    if (resp.status === 200) {
      produtos.splice(index, 1);
      commit("SET_PRODUTOS", { produtos })
    }
  })
}

export default {
  setProdutos,
  deleteProduto
}