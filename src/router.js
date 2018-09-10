import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import Home from './views/Home.vue'
import Error404 from './views/Error404.vue'
import About from './views/About.vue'
import Contacts from './views/Contacts.vue'
import News from './views/News.vue'
import NewsInner from './views/NewsInner.vue'
import BuildingInner from './views/BuildingInner.vue'
import Buildings from './views/Buildings.vue'
import BuildingSort from './views/BuildingSort.vue'
import BuildingView from './views/BuildingView.vue'
import { loadLanguageAsync, i18n } from './setup/i18n'

Vue.use(Router)
Vue.use(Meta)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/:lang',
      name: 'home',
      component: Home
    },
    {
      path: '/:lang/about',
      name: 'about',
      component: About
    },
    {
      path: '/:lang/contacts',
      name: 'contacts',
      component: Contacts
    },
    {
      path: '/:lang/buildings',
      name: 'buildings',
      component: Buildings
    },
    {
      path: '/:lang/building-sort',
      name: 'building-sort',
      component: BuildingSort
    },
    {
      path: '/:lang/building-inner',
      name: 'building-inner',
      component: BuildingInner,
      meta: { transitionName: 'slide' }
    },
    {
      path: '/:lang/building-view',
      name: 'building-view',
      component: BuildingView,
      meta: { transitionName: 'slide' }
    },
    {
      path: '/:lang/news',
      name: 'news',
      component: News,
      meta: { transitionName: 'slide' }
    },
    {
      path: '/:lang/news-inner/:id/:slug',
      name: 'news-inner',
      component: NewsInner,
      meta: { transitionName: 'slide' }
    },
    {
      path: '/:lang/*',
      name: 'error404',
      component: Error404
    }
  ]
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  if (!to.params.lang) {
    let name = to.name ? to.name : 'home'
    router.push({ name, params: { lang: i18n.locale } })
    return
  }

  let lang = to.params.lang
  loadLanguageAsync(lang).then(() => next())
})

export default router
