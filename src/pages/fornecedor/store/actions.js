import axios from 'axios'

const setList = async ({ commit }, cnpj) => {
  const url = `https://www.receitaws.com.br/v1/cnpj/${cnpj}`
  const dadosFornecedor = (await axios.get(
    'https://cors-anywhere.herokuapp.com/' + url
  )).data
  commit('SET_LIST', { dadosFornecedor })
}

const addFornecedor = ({ commit }, fornecedor) => {
  let url = 'http://localhost:3000/fornecedor'
  axios
    .post(url, fornecedor)
    .then(resp => {
      console.log(resp.status)
    })
    .catch(error => {
      console.log(error)
    })
}

const updateFornecedor = ({ commit }, [id, fornecedor]) => {
  let url = `http://localhost:3000/fornecedor/${id}`
  return axios
    .put(url, fornecedor)
    .then(resp => {
      console.log(resp.status)
    })
    .catch(error => {
      console.log(error)
    })
}

export default {
  setList,
  addFornecedor,
  updateFornecedor
}
