import BuildingsService from '@/services/BuildingsService'
import HTTP from '@/api/http'

const buildingsService = new BuildingsService(HTTP)

const state = {
  all: [],
  current: [],
  future: [],
  finished: []
}

const actions = {
  fetchBuildings ({ commit }) {
    buildingsService.getBuildings('/buildings').then(({ data }) => commit('setBuildings', data.data))
  },
  fetchCurrentBuildings ({ commit }) {
    buildingsService.getCurrentBuildings().then(({ data }) => commit('setCurrentBuildings', data.data))
  },
  fetchFutureBuildings ({ commit }) {
    buildingsService.getFutureBuildings().then(({ data }) => commit('setFutureBuildings', data.data))
  },
  fetchFinishedBuildings ({ commit }) {
    buildingsService.getFinishedBuildings().then(({ data }) => commit('setFinishedBuildings', data.data))
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
  },
  setCurrentBuildings (state, current) {
    state.current = current
  },
  setFutureBuildings (state, future) {
    state.future = future
  },
  setFinishedBuildings (state, finished) {
    state.finished = finished
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
