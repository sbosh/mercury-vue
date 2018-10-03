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
import CurrentBuildings from './views/CurrentBuildings.vue'
import BuildingSort from './views/BuildingSort.vue'
import BuildingView from './views/BuildingView.vue'
import BuildingInnerComponent from './components/buildings/BuildingInnerComponent'
import FutureBuildings from './views/FutureBuildings.vue'
import FinishedBuildings from './views/FinishedBuildings.vue'
import Floor from './views/Floor.vue'
import Apartment from './views/Apartment.vue'
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
      path: '/:lang/current-buildings',
      name: 'current-buildings',
      component: CurrentBuildings
    },
    {
      path: '/:lang/building-sort',
      name: 'building-sort',
      component: BuildingSort
    },
    {
      path: '/:lang/future-buildings',
      name: 'future-buildings',
      component: FutureBuildings
    },
    {
      path: '/:lang/finished-buildings',
      name: 'finished-buildings',
      component: FinishedBuildings
    },
    {
      path: '/:lang/:id/:building',
      children: [
        {
          path: '',
          name: 'building-inner-component',
          component: BuildingInnerComponent,
          meta: { transitionName: 'slide' }
        },
        {
          path: 'view',
          component: BuildingView,
          name: 'building-view'
        },
        {
          path: 'floor/:slug/:id',
          component: Floor,
          name: 'building-floor'
        }
      ],
      component: BuildingInner,
      meta: { transitionName: 'slide' }
    },
    {
      path: '/:lang/apartment/:id/:slug',
      name: 'apartment',
      component: Apartment,
      meta: { transitionName: 'slide' }
    },
    {
      path: '/:lang/news',
      name: 'news',
      component: News,
      meta: { transitionName: 'slide' }
    },
    {
      path: '/:lang/article/:id/:slug',
      name: 'article-inner',
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
  if (from.name) {
    window.fakeRouter = true
  }
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
  if (!to.params.lang) {
    let name = to.name ? to.name : 'home'
    router.push({ name, params: { lang: i18n.locale } })
    return
  }
  let lang = to.params.lang
  loadLanguageAsync(lang).then(() => next())
})

export default router
