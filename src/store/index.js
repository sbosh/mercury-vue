import Vue from 'vue'
import Vuex from 'vuex'
import vuexCache from 'vuex-cache'

import articles from './modules/articles'
import buildings from './modules/buildings'
import apartments from './modules/apartments'
import floors from './modules/floors'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  modules: {
    articles,
    apartments,
    buildings,
    floors
  },
  plugins: [vuexCache],
  strict: debug
})
