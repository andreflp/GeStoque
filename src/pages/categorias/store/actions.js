import axios from 'axios'

const setCategorias = async ({ commit }, pagination) => {
  try {
    commit('LOADING_CATEGORIAS', true)
    let url = 'http://localhost:3000/categoria'
    const categorias = (await axios.get(url, {
      params: {
        page: pagination.page,
        rowsPerPage: pagination.rowsPerPage,
        nome: pagination.nome,
        descending: pagination.descending
      }
    })).data.categorias
    commit('SET_CATEGORIAS', { categorias })
    commit('LOADING_CATEGORIAS', false)
  } catch (error) {
    console.log(error)
    commit('LOADING_CATEGORIAS', false)
  }
}

const deleteCategoria = async ({ state, dispatch }, [item, id, pag]) => {
  try {
    let categorias = state.categorias
    const index = categorias.categorias.indexOf(item)
    let url = `http://localhost:3000/categoria/${id}`
    const resp = await axios.delete(url)
    if (resp.status === 200) {
      if (categorias.categorias.length - 1 == 0) {
        pag.page -= 1
      }
      categorias.categorias.splice(index, 1)
      await dispatch('setCategorias', pag)
    }
  } catch (error) {
    console.log(error)
  }
}

export default {
  setCategorias,
  deleteCategoria
}
