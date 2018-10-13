import PagesService from '@/services/PagesService'
import HTTP from '@/api/http'

const pagesService = new PagesService(HTTP)

const state = {
  home: null,
  news: null,
  currentBuildingsPage: null,
  futureBuildingsPage: null,
  finishedBuildingsPage: null,
  contacts: null,
  about: null
}

const actions = {
  fetchHomePage ({ commit }) {
    pagesService.getHomePage().then(({ data }) => commit('setHome', data.data))
  },
  fetchNewsPage ({ commit }) {
    pagesService.getNewsPage().then(({ data }) => commit('setNews', data.data))
  },
  fetchCurrentBuildingsPage ({ commit }) {
    pagesService.getCurrentBuildingsPage().then(({ data }) => commit('setCurrentBuildingsPage', data.data))
  },
  fetchFutureBuildingsPage ({ commit }) {
    pagesService.getFutureBuildingsPage().then(({ data }) => commit('setFutureBuildingsPage', data.data))
  },
  fetchFinishedBuildingsPage ({ commit }) {
    pagesService.getFinishedBuildingsPage().then(({ data }) => commit('setFinishedBuildingsPage', data.data))
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
  setCurrentBuildingsPage (state, currentBuildingsPage) {
    state.currentBuildingsPage = currentBuildingsPage
  },
  setFutureBuildingsPage (state, futureBuildingsPage) {
    state.futureBuildingsPage = futureBuildingsPage
  },
  setFinishedBuildingsPage (state, finishedBuildingsPage) {
    state.finishedBuildingsPage = finishedBuildingsPage
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
