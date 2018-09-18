const state = {
  all: []
}

const actions = {
  fetchBuildings ({ commit }) {
    commit('setBuildings', [
      {
        id: '1',
        title: 'Комплекс Бижу',
        link: '/:lang/building-inner',
        description: 'Сградата има страхотен изглед към Витоша',
        bg: require('@/assets/images/building01.jpg'),
        location: 'бул. „Александър Малинов“ 35'
      },
      {
        id: '2',
        title: 'Флора Бийч Резорт',
        link: '/:lang/building-inner',
        description: 'Сградата е разположена в ж.к Младост 3',
        bg: require('@/assets/images/building02.jpg'),
        location: 'бул. Джеймс Баучер 5'
      }
    ])
  }
}

const getters = {
  getBuildings (state) {
    return (id, slug) => {
      return state.all.find(building => building.id === id && building.slug_en === slug) ||
        state.all.find(building => building.id === id && building.slug_bg === slug)
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
