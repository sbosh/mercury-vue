const state = {
  all: []
}

const actions = {
  fetchArticles ({ commit }) {
    commit('setArticles', [
      {
        id: 1,
        image: require('@/assets/images/building01.jpg'),
        title: 'Title',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis numquam maiores animi cum. Dolorem magni adipisci a est! Fugiat illum tempore iure nesciunt debitis ad nemo distinctio minima, quis amet!',
        date: '01.02.2018',
        link: 'https://www.google.com',
        category: 'Комплекс Бижу',
        icon: require('@/assets/images/category01.svg')
      },
      {
        id: 2,
        image: require('@/assets/images/building01.jpg'),
        title: 'Lorem ipsum',
        description: 'Reiciendis numquam maiores animi cum. Dolorem magni adipisci a est! Fugiat illum tempore iure nesciunt debitis ad nemo distinctio minima, quis amet!',
        date: '01.02.2018',
        link: 'https://www.google.com',
        category: 'Комплекс Бижу',
        icon: require('@/assets/images/category02.svg')
      },
      {
        id: 3,
        image: require('@/assets/images/building01.jpg'),
        title: 'Title',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis numquam maiores animi cum. Dolorem magni adipisci a est! Fugiat illum tempore iure nesciunt debitis ad nemo distinctio minima, quis amet!',
        date: '01.02.2018',
        link: 'https://www.google.com',
        category: 'Комплекс Бижу',
        icon: require('@/assets/images/category01.svg')
      },
      {
        id: 4,
        image: require('@/assets/images/building01.jpg'),
        title: 'Lorem ipsum',
        description: 'Reiciendis numquam maiores animi cum. Dolorem magni adipisci a est! Fugiat illum tempore iure nesciunt debitis ad nemo distinctio minima, quis amet!',
        date: '01.02.2018',
        link: 'https://www.google.com',
        category: 'Комплекс Бижу',
        icon: require('@/assets/images/category02.svg')
      }
    ])
  }
}

const getters = {
  getArticle (state) {
    return (id, slug) => {
      return state.all.find(article => article.id === id && article.slug_en === slug) ||
        state.all.find(article => article.id === id && article.slug_bg === slug)
    }
  }
}

const mutations = {
  setArticles (state, articles) {
    state.all = articles
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
