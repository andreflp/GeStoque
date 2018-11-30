import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import VeeValidate, { Validator } from "vee-validate";
import VueI18n from 'vue-i18n'
import VueChart from 'vue-chart-js'
import Animate from 'animate.css'
import VuetifyConfirm from 'vuetify-confirm'
import VueAnimateNumber from 'vue-animate-number'
import pt_BR from "vee-validate/dist/locale/pt_BR";
import filters from "./filters/filter";
import money from 'v-money'
import store from './store'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'animate.css'

Vue.config.productionTip = false

Vue.use(VueChart);
Vue.use(VueAnimateNumber);
Vue.use(Animate);
Vue.use(VuetifyConfirm);
Vue.use(VeeValidate);
Vue.use(money, { precision: 4 });
filters.create(Vue);
Validator.localize("pt_BR", pt_BR);

Vue.use(VueI18n)
const messages = {
  pt: {
    $vuetify: {
      dataIterator: {
        rowsPerPageText: 'Itens por página:',
        rowsPerPageAll: 'Todos',
        pageText: '{0}-{1} de {2}',
        noResultsText: 'Nenhum dado encontrado',
        nextPage: 'Próxima página',
        prevPage: 'Página anterior'
      },
      dataTable: {
        rowsPerPageText: 'Linhas por página:'
      },
      noDataText: 'Não há dados disponíveis'
    }
  }
}
const i18n = new VueI18n({
  locale: 'pt',
  messages
})
Vue.use(Vuetify, {
  lang: {
    t: (key, ...params) => i18n.t(key, params)
  }
});


const openRoutes = ['Login', 'Signup']

router.beforeEach((to, from, next) => {

  if (openRoutes.includes(to.name)) {
    next()
  } else if (store.getters.isAuthenticated) {
    next()
  } else {
    next('/login')
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
