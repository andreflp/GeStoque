// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import VeeValidate, { Validator } from "vee-validate";
import pt_BR from "vee-validate/dist/locale/pt_BR";
import filters from "./filters/filter";
import money from 'v-money'
import Animate from 'animate.css'
import 'animate.css'
import VueI18n from 'vue-i18n'
import store from './store'

Vue.config.productionTip = false

Vue.use(Animate);
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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
