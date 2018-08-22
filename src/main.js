import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { i18n } from './setup/i18n'
import './styles/app.scss'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false

Vue.use(VueAwesomeSwiper)

Vue.use(VueGoogleMaps, {
  load: {
    apiKey: 'your-google-api-key',
    libraries: ['places'],
    useBetaRenderer: false
  }
})

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
