import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/pages/Dashboard'
import Fornecedores from '@/pages/Fornecedores'
import Fornecedor from '@/pages/Fornecedor'
import Produtos from '@/pages/Produtos'
import Produto from '@/pages/Produto'
import Categoria from '@/pages/Categoria'
import Movimentacoes from '@/pages/Movimentacoes'
import Relatorios from '@/pages/Relatorios'
import Categorias from '@/pages/Categorias'


Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
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
})
