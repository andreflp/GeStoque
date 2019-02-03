import Vue from 'vue'
import Vuex from 'vuex'
import Fornecedores from '../pages/fornecedores/store'
import Fornecedor from '../pages/fornecedor/store'
import Categorias from '../pages/categorias/store'
import Categoria from '../pages/categoria/store'
import Produtos from '../pages/produtos/store'
import Produto from '../pages/produto/store'
import Login from '../pages/login/store/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Fornecedores,
    Fornecedor,
    Categorias,
    Categoria,
    Produtos,
    Produto,
    Login
  }
})
