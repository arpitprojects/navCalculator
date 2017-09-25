import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import {routes} from  './routes';
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuetify);
// Vue.transition('fade', { enterClass: 'fadeIn', leaveClass: 'fadeOut'})

const router = new VueRouter({
	routes: routes,
	mode : 'history'
});

new Vue({
  el: '#app',
  router : router,
  render: h => h(App)
})
