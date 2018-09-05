const state = {
  all: []
}

const actions = {
  fetchBuildings ({ commit }) {
    commit('setBuildings', [
      {
        title: 'Комплекс Бижу',
        link: 'https://google.com',
        description: 'Сградата има страхотен изглед към Витоша',
        bg: require('@/assets/images/building01.jpg')
      },
      {
        title: 'Флора Бийч Резорт',
        link: 'https://google.com',
        description: 'Сградата е разположена в ж.к Младост 3',
        bg: require('@/assets/images/gallery01.jpg')
      },
      {
        title: 'Комплекс Меркурий Плаза',
        link: 'https://google.com',
        description: 'В непосредствена близост до НДК',
        bg: require('@/assets/images/next-building.jpg')
      },
      {
        title: 'Комплекс Елеганс',
        link: 'https://google.com',
        description: 'Частен басейн, 50 паркоместа и частна детска площадка',
        bg: require('@/assets/images/gallery01.jpg')
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
