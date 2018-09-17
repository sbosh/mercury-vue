import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import { i18n } from './setup/i18n'
import './styles/app.scss'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import * as VueGoogleMaps from 'vue2-google-maps'
import headroom from 'vue-headroom'
import VueMq from 'vue-mq'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC8SMJaPNrgBhgYH-g4XbZGIuLqdoaeNK8'
  }
})

Vue.config.productionTip = false

Vue.use(VueAwesomeSwiper)
Vue.use(headroom)
Vue.use(VueMq, {
  breakpoints: {
    sm: 768,
    md: 1280,
    lg: Infinity
  }
})

new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
  beforeCreate () {
    this.$store.cache.dispatch('fetchArticles')
    this.$store.cache.dispatch('fetchApartments')
    this.$store.cache.dispatch('fetchBuildings')
    this.$store.cache.dispatch('fetchFloors')
  }
}).$mount('#app')
