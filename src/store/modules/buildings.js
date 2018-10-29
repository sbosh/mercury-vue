import BuildingsService from '@/services/BuildingsService'
import HTTP from '@/api/http'

const buildingsService = new BuildingsService(HTTP)

const state = {
  all: [],
  building: null,
  buildingApartments: [],
  buildingFloors: [],
  buildingEntrances: [],
  buildingParkings: [],
  current: [],
  finished: [],
  futured: []
}

const actions = {
  fetchBuilding ({ commit }, id) {
    return new Promise((resolve, reject) => {
      buildingsService.getBuildingById(id).then(({ data }) => {
        commit('setBuilding', data.data)
        resolve()
      })
    })
  },
  fetchBuildingApartments ({ commit }, id) {
    return new Promise((resolve, reject) => {
      buildingsService.getBuildingApartments(id).then(({ data }) => {
        commit('setApartments', data.data)
        resolve()
      })
    })
  },
  fetchBuildingFloors ({ commit }, id) {
    return new Promise((resolve, reject) => {
      buildingsService.getBuildingFloors(id).then(({ data }) => {
        commit('setFloors', data.data)
        resolve()
      })
    })
  },
  fetchBuildingEntrances ({ commit }, id) {
    return new Promise((resolve, reject) => {
      buildingsService.getBuildingEntrances(id).then(({ data }) => {
        commit('setEntrances', data.data)
        resolve()
      })
    })
  },
  fetchBuildingParkings ({ commit }, id) {
    return new Promise((resolve, reject) => {
      buildingsService.getBuildingParkings(id).then(({ data }) => {
        commit('setPartkings', data.data)
        resolve()
      })
    })
  },
  fetchCurrentBuildings ({ commit }) {
    return new Promise((resolve, reject) => {
      buildingsService.getCurrentBuildings().then(({ data }) => {
        commit('setCurrentBuildings', data.data)
        resolve()
      })
    })
  },
  fetchFuturedBuildings ({ commit }) {
    return new Promise((resolve, reject) => {
      buildingsService.getFutureBuildings().then(({ data }) => {
        commit('setFuturedBuildings', data.data)
        resolve()
      })
    })
  },
  fetchFinishedBuildings ({ commit }) {
    return new Promise((resolve, reject) => {
      buildingsService.getFinishedBuildings().then(({ data }) => {
        commit('setFinishedBuildings', data.data)
        resolve()
      })
    })
  }
}

const getters = {
  getFloorsByEntrance (state) {
    return (entranceSlug) => {
      return state.buildingFloors.filter(floor => floor.entrance.slug_en === entranceSlug || floor.entrance.slug_bg === entranceSlug)
    }
  },
  getApartmentsByFloor (state) {
    return (floorId) => {
      return state.buildingApartments.filter(apartment => apartment.floor.id === floorId)
    }
  },
  getApartment (state) {
    return (slug) => {
      return state.buildingApartments.find(apartment => apartment.slug_en === slug || apartment.slug_bg === slug)
    }
  }
}

const mutations = {
  setBuilding (state, building) {
    state.building = building
  },
  setApartments (state, apartments) {
    state.buildingApartments = apartments
  },
  setFloors (state, floors) {
    state.buildingFloors = floors
  },
  setEntrances (state, entrances) {
    state.buildingEntrances = entrances
  },
  setPartkings (state, parkings) {
    state.buildingParkings = parkings
  },
  setCurrentBuildings (state, currentBuildings) {
    state.current = currentBuildings
  },
  setFuturedBuildings (state, futuredBuildings) {
    state.futured = futuredBuildings
  },
  setFinishedBuildings (state, finishedBuildings) {
    state.finished = finishedBuildings
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
