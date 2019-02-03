/* eslint-disable camelcase */
// @ts-nocheck
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import Vuetify from 'vuetify'
import VeeValidate, { Validator } from 'vee-validate'
import VueI18n from 'vue-i18n'
import Animate from 'animate.css'
import VueCurrencyFilter from 'vue-currency-filter'
import VuetifyConfirm from 'vuetify-confirm'
import VueAnimateNumber from 'vue-animate-number'
import pt_BR from 'vee-validate/dist/locale/pt_BR'
import filters from './filters/filter'
import money from 'v-money'
import store from './store'
import { authMiddleware } from './config/middlewareAuth'
import { translate } from './config/translate'
import { interceptors } from './config/interceptors'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

Vue.use(VueCurrencyFilter, {
  symbol: 'R$',
  thousandsSeparator: '.',
  fractionCount: 2,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: true
})
Vue.use(VueAnimateNumber)
Vue.use(Animate)
Vue.use(VuetifyConfirm)
Vue.use(VeeValidate)
Vue.use(money, { precision: 4 })
filters.create(Vue)
Validator.localize('pt_BR', pt_BR)
interceptors(axios)
translate(Vue, VueI18n, Vuetify)
authMiddleware(router, store)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
