import Vue from 'vue'
import Vuex from 'vuex'
import vuexCache from 'vuex-cache'

import articles from './modules/articles'
import buildings from './modules/buildings'
import apartments from './modules/apartments'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  modules: {
    articles,
    apartments,
    buildings
  },
  plugins: [vuexCache],
  strict: debug
})
