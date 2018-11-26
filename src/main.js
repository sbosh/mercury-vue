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
import VTooltip from 'v-tooltip'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
var SocialSharing = require('vue-social-sharing')

Vue.use(SocialSharing)
Vue.use(VTooltip)
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 99999
  }
})

window.fakeRouter = false

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDQU830d2yJlr3kJ3VvQpKTRWTRtF4gT7g'
  }
})

Vue.config.productionTip = false

Vue.use(VueAwesomeSwiper)
Vue.use(headroom)
Vue.use(VueMq, {
  breakpoints: {
    sm: 768,
    md: 1024,
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
    this.$store.cache.dispatch('fetchHomePage')
    this.$store.cache.dispatch('fetchNewsPage')
    this.$store.cache.dispatch('fetchContactsPage')
    this.$store.cache.dispatch('fetchAboutPage')
  }
}).$mount('#app')
