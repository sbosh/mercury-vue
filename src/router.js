import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Contacts from './views/Contacts.vue'
import News from './views/News.vue'
import BuildingInnerComponent from './components/buildings/BuildingInnerComponent.vue'
import { loadLanguageAsync, i18n } from './setup/i18n'

Vue.use(Router)

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
      path: '/:lang/building-inner',
      name: 'building-inner',
      component: BuildingInnerComponent,
      meta: { transitionName: 'slide' }
    },
    {
      path: '/:lang/news',
      name: 'news',
      component: News,
      meta: { transitionName: 'slide' }
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
