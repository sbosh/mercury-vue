import FloorsService from '@/services/FloorsService'
import HTTP from '@/api/http'

const floorsService = new FloorsService(HTTP)

const state = {
  all: []
}

const actions = {
  fetchFloors ({ commit }) {
    floorsService.getFloors('/floors/mitko').then(({ data }) => commit('setFloors', data.data))
  }
}

const getters = {
  getFloors (state) {
    return state.all
  }
}

const mutations = {
  setFloors (state, floors) {
    state.all = floors
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
