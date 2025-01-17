import FloorsService from '@/services/FloorsService'
import HTTP from '@/api/http'

const floorsService = new FloorsService(HTTP)

const state = {
  all: null
}

const actions = {
  fetchFloors ({ commit }) {
    floorsService.getFloors('/floors').then(({ data }) => commit('setFloors', data.data))
  }
}

const getters = {
  getFloors (state) {
    return state.all ? state.all : []
  }
}

const mutations = {
  // setFloors (state, floors) {
  //   state.all = floors
  // }
}

export default {
  state,
  actions,
  mutations,
  getters
}
