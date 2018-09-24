import PagesService from '@/services/PagesService'
import HTTP from '@/api/http'

const pagesService = new PagesService(HTTP)

const state = {
  home: [],
  news: [],
  currentBuildings: [],
  futureBuildings: [],
  finishedBuildings: [],
  contacts: [],
  about: []
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
  fetchFinishedBuildingsPage ({ commit }) {
    pagesService.getFinishedBuildingsPage().then(({ data }) => commit('setFinishedBuildings', data.data))
  },
  fetchContactsPage ({ commit }) {
    pagesService.getContactsPage().then(({ data }) => commit('setContacts', data.data))
  },
  fetchAboutPage ({ commit }) {
    pagesService.getAboutPage().then(({ data }) => commit('setAbout', data.data))
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
  setFinishedBuildings (state, finishedBuildings) {
    state.finishedBuildings = finishedBuildings
  },
  setContacts (state, contacts) {
    state.contacts = contacts
  },
  setAbout (state, about) {
    state.about = about
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
