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

Vue.config.productionTip = false

Vue.use(Animate);
Vue.use(VeeValidate);
Vue.use(Vuetify);
Vue.use(money, { precision: 4 });
filters.create(Vue);
Validator.localize("pt_BR", pt_BR);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
