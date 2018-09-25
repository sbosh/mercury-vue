import BuildingsService from '@/services/BuildingsService'
import HTTP from '@/api/http'

const buildingsService = new BuildingsService(HTTP)

const state = {
  all: []
}

const actions = {
  fetchBuildings ({ commit }) {
    buildingsService.getBuildings('/buildings').then(({ data }) => commit('setBuildings', data.data))
  }
}

const getters = {
  getBuilding (state) {
    return (slug) => {
      return state.all.find(building => building.slug_en === slug) ||
        state.all.find(building => building.slug_bg === slug)
    }
  },
  getSortedBuildings (state) {
    return state.all
  }
}

const mutations = {
  setBuildings (state, buildings) {
    state.all = buildings
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
