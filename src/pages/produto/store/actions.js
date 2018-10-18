import jsonp from 'jsonp'

const setList = (cnpj, { commit }, obj) => {
  let url = "";
  axios
    .get(url)
    .then(function (resp) {
      vm.produtos = resp.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export default {}