import PagesService from '@/services/PagesService'
import HTTP from '@/api/http'

const pagesService = new PagesService(HTTP)

const state = {
  home: [],
  news: [],
  currentBuildings: [],
  futureBuildings: [],
  contacts: []
}

const actions = {
  fetchHomePage ({ commit }) {
    pagesService.getHomePage().then(({ data }) => commit('setHome', data.data))
  },
  fetchNewsPage ({ commit }) {
    pagesService.getNewsPage().then(({ data }) => commit('setNews', data.data))
  },
  fetchCurrentBuildingsPage ({ commit }) {
    pagesService.getCurrentBuildingsPage().then(({ data }) => commit('setCurrentBuildings', data.data))
  },
  fetchFutureBuildingsPage ({ commit }) {
    pagesService.getFutureBuildingsPage().then(({ data }) => commit('setFutureBuildings', data.data))
  },
  fetchContactsPage ({ commit }) {
    pagesService.getContactsPage().then(({ data }) => commit('setContacts', data.data))
  }
}

const getters = {
}

const mutations = {
  setHome (state, home) {
    state.home = home
  },
  setNews (state, news) {
    state.news = news
  },
  setCurrentBuildings (state, currentBuildings) {
    state.currentBuildings = currentBuildings
  },
  setFutureBuildings (state, futureBuildings) {
    state.futureBuildings = futureBuildings
  },
  setContacts (state, contacts) {
    state.contacts = contacts
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
