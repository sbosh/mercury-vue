import BuildingsService from '@/services/BuildingsService'
import HTTP from '@/api/http'

const buildingsService = new BuildingsService(HTTP)

const state = {
  all: [],
  building: null,
  buildingApartments: [],
  buildingFloors: [],
  buildingEntrances: [],
  buildingParkings: []
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
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
