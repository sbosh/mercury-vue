import ArticleService from '@/services/ArticleService'
import HTTP from '@/api/http'

const articleService = new ArticleService(HTTP)

const state = {
  all: [],
  article: null
}

const actions = {
  fetchArticles ({ commit }) {
    articleService.getArticles('/posts').then(({ data }) => commit('setArticles', data.data))
  },
  fetchArticle ({ commit }, id) {
    return new Promise((resolve, reject) => {
      articleService.getArticle(id).then(({data}) => {
        commit('setArticle', data.data)
        resolve()
      })
    })
  }
}

const getters = {
  getArticle (state) {
    return (id, slug) => {
      return state.all.find(article => article.id === id && article.slug_en === slug) ||
        state.all.find(article => article.id === id && article.slug_bg === slug)
    }
  },
  getSwiperArticles (state) {
    let articles = Array.from(state.all.slice())
    articles.splice(8)
    return articles
  }
}

const mutations = {
  setArticles (state, articles) {
    state.all = articles
  },
  setArticle (state, article) {
    state.article = article
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
