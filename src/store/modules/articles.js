import ArticleService from '@/services/ArticleService'
import HTTP from '@/api/http'

const articleService = new ArticleService(HTTP)

const state = {
  all: []
}

const actions = {
  fetchArticles ({ commit }) {
    articleService.getArticles('/posts/token/mitko').then(({ data }) => commit('setArticles', data.data))
  }
}

const getters = {
  getArticles (state) {
    return (id, slug) => {
      return state.all.find(article => article.id === id && article.slug_en === slug) ||
        state.all.find(article => article.id === id && article.slug_bg === slug)
    }
  },
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
  getters,
  mutations
}
