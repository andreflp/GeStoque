import Vue from 'vue'
import Vuex from 'vuex'
import Fornecedores from '../pages/fornecedores/store'
import Fornecedor from '../pages/fornecedor/store'

Vue.use(Vuex);


const modules = {
  Fornecedores,
  Fornecedor
}

export default new Vuex.Store({
  modules: {
    Fornecedores,
    Fornecedor
  }
})