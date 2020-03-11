import Vue from 'vue'
import App from './App.vue'
import Ve from './plugins/ve'
import router from './router'
import vuetify from './plugins/vuetify';
import Vuebar from 'vuebar';
import './sass/main.scss'
import store from './store'
import VueCountdown from '@chenfengyuan/vue-countdown'; 

Vue.component(VueCountdown.name, VueCountdown);

Vue.config.productionTip = false

Vue.use(Vuebar)
Vue.use(Ve)

new Vue({
  router,
  vuetify,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
