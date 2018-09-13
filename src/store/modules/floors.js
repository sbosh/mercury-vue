const state = {
  all: []
}

const actions = {
  fetchFloors ({ commit }) {
    commit('setFloors', [
      {
        block: 'A',
        level: '1',
        available: 5,
        atfloor: 6,
        florplan: require('@/assets/images/floor-plan.png')
      },
      {
        block: 'A',
        level: '2',
        available: 3,
        atfloor: 4,
        florplan: require('@/assets/images/floor-plan.png')
      },
      {
        block: 'Б',
        level: '3',
        available: 3,
        atfloor: 8,
        florplan: require('@/assets/images/floor-plan.png')
      },
      {
        block: 'В',
        level: '4',
        available: 3,
        atfloor: 4,
        florplan: require('@/assets/images/floor-plan.png')
      },
      {
        block: 'А',
        level: '5',
        available: 3,
        atfloor: 3,
        florplan: require('@/assets/images/floor-plan.png')
      }
    ])
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
