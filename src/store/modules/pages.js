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
  about: null,
  terms: null
}

const actions = {
  fetchHomePage ({ commit }) {
    pagesService.getHomePage().then(({ data }) => commit('setHome', data.data))
  },
  fetchNewsPage ({ commit }) {
    pagesService.getNewsPage().then(({ data }) => commit('setNews', data.data))
  },
  fetchCurrentBuildingsPage ({ commit }) {
    return new Promise((resolve, reject) => {
      pagesService.getCurrentBuildingsPage().then(({ data }) => {
        commit('setCurrentBuildingsPage', data.data)
        resolve()
      })
    })
  },
  fetchFutureBuildingsPage ({ commit }) {
    return new Promise((resolve, reject) => {
      pagesService.getFutureBuildingsPage().then(({ data }) => {
        commit('setFutureBuildingsPage', data.data)
        resolve()
      })
    })
  },
  fetchFinishedBuildingsPage ({ commit }) {
    return new Promise((resolve, reject) => {
      pagesService.getFinishedBuildingsPage().then(({ data }) => {
        commit('setFinishedBuildingsPage', data.data)
        resolve()
      })
    })
  },
  fetchContactsPage ({ commit }) {
    pagesService.getContactsPage().then(({ data }) => commit('setContacts', data.data))
  },
  fetchAboutPage ({ commit }) {
    pagesService.getAboutPage().then(({ data }) => commit('setAbout', data.data))
  },
  fetchTermsPage ({ commit }) {
    pagesService.getTermsPage().then(({ data }) => commit('setTerms', data.data))
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
  },
  setTerms (state, terms) {
    state.terms = terms
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
