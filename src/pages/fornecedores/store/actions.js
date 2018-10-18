import axios from 'axios'

const setFornecedores = async ({ commit }) => {
  let url = "http://localhost:8080/Gestoque/fornecedor/fornecedores";
  const list = (await axios.get(url)).data;
  commit('SET_FORNECEDORES', { list });
}

const deleteFornecedor = ({ commit, state }, [item, id]) => {
  const index = state.list.indexOf(item);
  let list = state.list;
  let url = `http://localhost:8080/Gestoque/fornecedor/delete/${id}`;
  return axios.delete(url).then(resp => {
    if (resp.status === 200) {
      list.splice(index, 1);
      commit("SET_FORNECEDORES", { list })
    }

  })
}

export default {
  setFornecedores,
  deleteFornecedor
}