import axios from 'axios'
const token = localStorage.getItem('token');

const setCategorias = async ({ commit }) => {
  let url = "http://localhost:8080/Gestoque/categoria/categorias";
  const categorias = (await axios.get(url)).data;
  commit('SET_CATEGORIAS', { categorias });
}

const deleteCategoria = ({ commit, state }, [item, id]) => {
  const index = state.categorias.indexOf(item);
  let categorias = state.categorias;
  let url = `http://localhost:8080/Gestoque/categoria/delete/${id}`;
  return axios.delete(url).then(resp => {
    if (resp.status === 200) {
      categorias.splice(index, 1);
      commit("SET_CATEGORIAS", { categorias })
    }

  })
}

export default {
  setCategorias,
  deleteCategoria
}