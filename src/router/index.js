import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/pages/Dashboard'
import Fornecedores from '@/pages/fornecedores/Index'
import Fornecedor from '@/pages/fornecedor/Index'
import Produtos from '@/pages/produtos/Index'
import Produto from '@/pages/produto/Index'
import Categoria from '@/pages/categoria/Index'
import Movimentacoes from '@/pages/Movimentacoes'
import Relatorios from '@/pages/Relatorios'
import Categorias from '@/pages/categorias/Index'
import Login from '@/pages/login/Login'
import MyBody from '../components/Body.vue'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },

    {
      path: '/',
      component: MyBody,
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: Dashboard,
        },
        {
          path: '/fornecedores',
          name: 'Fornecedores',
          component: Fornecedores
        },

        {
          path: '/produtos',
          name: 'Produtos',
          component: Produtos
        },

        {
          path: '/produto',
          name: 'Produto',
          component: Produto
        },

        {
          path: '/produto/:id',
          name: 'Info Produto',
          component: Produto,
          props: true
        },

        {
          path: '/fornecedor/:id',
          name: 'Info Fornecedor',
          component: Fornecedor,
          props: true
        },

        {
          path: '/fornecedor',
          name: 'Fornecedor',
          component: Fornecedor
        },

        {
          path: '/categoria',
          name: 'Categoria',
          component: Categoria
        },

        {
          path: '/movimentacoes',
          name: 'Movimentações',
          component: Movimentacoes
        },

        {
          path: '/movimentacoes/:id',
          name: 'Movimentação',
          component: Movimentacoes,
          props: true
        },

        {
          path: '/relatorios',
          name: 'Relatórios',
          component: Relatorios,
        },

        {
          path: '/categorias',
          name: 'Categorias',
          component: Categorias,
        },

        {
          path: '/categoria/:id',
          name: 'Info Categoria',
          component: Categoria,
          props: true
        },
      ]
    },






  ]
});

