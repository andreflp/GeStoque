import axios from 'axios'

const setCategorias = async ({ commit }, pagination) => {
  commit('LOADING', true)
  let url = 'http://localhost:3000/categoria'
  const categorias = (await axios.get(url, {
    params: {
      page: pagination.page,
      rowsPerPage: pagination.rowsPerPage,
      nome: pagination.nome
    }
  })).data.categorias

  console.log({ categorias })
  commit('SET_CATEGORIAS', { categorias })
  commit('LOADING', false)
}

const deleteCategoria = async (
  { commit, state, dispatch },
  [item, id, pag]
) => {
  try {
    const index = state.categorias.categorias.indexOf(item)
    let categorias = state.categorias
    let url = `http://localhost:3000/categoria/${id}`
    const resp = await axios.delete(url)
    if (resp.status === 200) {
      if (categorias.categorias.length - 1 === 0) {
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
