const state = {
  all: []
}

const actions = {
  fetchApartments ({ commit }) {
    commit('setApartments', [
      {
        block: 'A',
        level: '-1',
        number: '3',
        sqm: '16.4 m2',
        price: 168000,
        status: 'свободен',
        img: require('@/assets/images/florplan-apartment.png'),
        rooms: 4
      },
      {
        block: 'A',
        level: '10',
        number: '63',
        sqm: '19.4 m2',
        price: 160000,
        status: 'Закупен',
        img: require('@/assets/images/florplan-apartment.png'),
        rooms: 3
      },
      {
        block: 'A',
        level: '-1',
        number: '3',
        sqm: '16.4 m2',
        price: 16000,
        status: 'свободен',
        img: require('@/assets/images/florplan-apartment.png'),
        rooms: 2
      },
      {
        block: 'A',
        level: '-1',
        number: '3',
        sqm: '16.4 m2',
        price: 16000,
        status: 'свободен',
        img: require('@/assets/images/florplan-apartment.png'),
        rooms: 1
      },
      {
        block: 'A',
        level: '10',
        number: '63',
        sqm: '19.4 m2',
        price: 52000,
        status: 'Закупен',
        img: require('@/assets/images/florplan-apartment.png'),
        rooms: 4
      },
      {
        block: 'A',
        level: '-1',
        number: '3',
        sqm: '16.4 m2',
        price: 16000,
        status: 'свободен',
        img: require('@/assets/images/florplan-apartment.png'),
        rooms: 3
      },
      {
        block: 'A',
        level: '-1',
        number: '3',
        sqm: '16.4 m2',
        price: 16000,
        status: 'свободен',
        img: require('@/assets/images/florplan-apartment.png'),
        rooms: 4
      },
      {
        block: 'A',
        level: '10',
        number: '63',
        sqm: '19.4 m2',
        price: 26500,
        status: 'Закупен',
        img: require('@/assets/images/florplan-apartment.png'),
        rooms: 4
      },
      {
        block: 'A',
        level: '-1',
        number: '3',
        sqm: '16.4 m2',
        price: 16000,
        status: 'свободен',
        img: require('@/assets/images/florplan-apartment.png'),
        rooms: 4
      },
      {
        block: 'A',
        level: '-1',
        number: '3',
        sqm: '16.4 m2',
        price: 16000,
        status: 'свободен',
        img: require('@/assets/images/florplan-apartment.png'),
        rooms: 4
      },
      {
        block: 'A',
        level: '10',
        number: '63',
        sqm: '19.4 m2',
        price: 26500,
        status: 'Закупен',
        img: require('@/assets/images/florplan-apartment.png'),
        rooms: 4
      },
      {
        block: 'A',
        level: '-1',
        number: '3',
        sqm: '16.4 m2',
        price: 16000,
        status: 'свободен',
        img: require('@/assets/images/florplan-apartment.png'),
        rooms: 4
      },
      {
        block: 'A',
        level: '-1',
        number: '3',
        sqm: '16.4 m2',
        price: 16000,
        status: 'свободен',
        img: require('@/assets/images/florplan-apartment.png'),
        rooms: 4
      },
      {
        block: 'A',
        level: '10',
        number: '63',
        sqm: '19.4 m2',
        price: 26500,
        status: 'Закупен',
        img: require('@/assets/images/florplan-apartment.png'),
        rooms: 4
      },
      {
        block: 'A',
        level: '-1',
        number: '3',
        sqm: '16.4 m2',
        price: 16000,
        status: 'свободен',
        img: require('@/assets/images/florplan-apartment.png'),
        rooms: 4
      },
      {
        block: 'A',
        level: '-1',
        number: '3',
        sqm: '16.4 m2',
        price: 16000,
        status: 'свободен',
        img: require('@/assets/images/florplan-apartment.png'),
        rooms: 4
      },
      {
        block: 'A',
        level: '10',
        number: '63',
        sqm: '19.4 m2',
        price: 26500,
        status: 'Закупен',
        img: require('@/assets/images/florplan-apartment.png'),
        rooms: 2
      },
      {
        block: 'A',
        level: '-1',
        number: '3',
        sqm: '16.4 m2',
        price: 16000,
        status: 'свободен',
        img: require('@/assets/images/florplan-apartment.png'),
        rooms: 1
      }
    ])
  }
}

const getters = {
  getApartments (state) {
    return state.all
  },
  getFiltredApartments (state) {
    return (priceFrom, priceTo, rooms) => {
      console.log(rooms)
      let filtredApartments = state.all.filter(a => a.price >= priceFrom && a.price <= priceTo)
      if (rooms && rooms.length) return filtredApartments.filter(a => rooms.includes(a.rooms.toString()))
      return filtredApartments
    }
  },
  getCountApartments (state) {
    return state.all.length
  }
}

const mutations = {
  setApartments (state, apartments) {
    state.all = apartments
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
