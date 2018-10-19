import BuildingsService from '@/services/BuildingsService'
import HTTP from '@/api/http'

const buildingsService = new BuildingsService(HTTP)

const state = {
  all: null,
  current: null,
  building: null,
  future: null,
  finished: null
}

const actions = {
  fetchBuildings ({ commit }) {
    buildingsService.getBuildings('/buildings').then(({ data }) => commit('setBuildings', data.data))
  },
  fetchCurrentBuildings ({ commit }) {
    buildingsService.getCurrentBuildings().then(({ data }) => commit('setCurrentBuildings', data.data))
  },
  fetchBuildingById ({ commit }, id) {
    buildingsService.getBuildingById(id).then(({ data }) => commit('setBuildingById', data.data))
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
      if (!state.all) return
      return state.all.find(building => building.slug_en === slug) ||
        state.all.find(building => building.slug_bg === slug)
    }
  },
  getSortedBuildings (state) {
    return state.all
  },
  getFloorsByEntrance (state) {
    return (slug) => {
      return state.building.entrances.data.filter(entrance => entrance.slug_en === slug || entrance.slug_bg === slug)
    }
  }
}

const mutations = {
  setBuildings (state, buildings) {
    state.all = buildings
  },
  setCurrentBuildings (state, current) {
    state.current = current
  },
  setBuildingById (state, building) {
    state.building = building
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
