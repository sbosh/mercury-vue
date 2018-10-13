import ApartmentsService from '@/services/ApartmentsService'
import HTTP from '@/api/http'

const apartmentsService = new ApartmentsService(HTTP)

const state = {
  all: null
}

const actions = {
  fetchApartments ({ commit }) {
    apartmentsService.getApartments('/apartments').then(({ data }) => commit('setApartments', data.data))
  }
}

const getters = {
  getApartments (state) {
    return state.all ? state.all : []
  },
  getFiltredApartments (state) {
    return (priceFrom, priceTo, rooms) => {
      if (!state.all) return []
      let filtredApartments = state.all.filter(a => a.price >= priceFrom && a.price <= priceTo)
      if (rooms && rooms.length) return filtredApartments.filter(a => rooms.includes(a.rooms.toString()))
      return filtredApartments
    }
  },
  getCountApartments (state) {
    return state.all ? state.all.length : 0
  },
  getApartment (state) {
    return (slug) => {
      if (!state.all) return
      return state.all.find(apartment => apartment.slug_en === slug) ||
        state.all.find(apartment => apartment.slug_bg === slug)
    }
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
