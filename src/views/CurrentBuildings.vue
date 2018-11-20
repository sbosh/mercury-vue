<template>
  <div class="main-content">
    <nav-component />
    <mq-layout mq="md+"><buildings-carousel :current="current" :pageTitle="this.currentBuildingsPage['title_' + this.$i18n.locale]" /></mq-layout>
    <mq-layout mq="sm"><buildings-mobile :current="current" :pageTitle="this.currentBuildingsPage['title_' + this.$i18n.locale]" /></mq-layout>
  </div>
</template>

<script>
import store from '../store'
import { mapState } from 'vuex'
import NavComponent from '@/components/layout/NavComponent'
import BuildingsCarousel from '@/components/buildings/BuildingsCarousel'
import BuildingsMobile from '@/components/mobile/BuildingsMobile.vue'
export default {
  name: 'current-buildings',
  components: {
    'nav-component': NavComponent,
    'buildings-carousel': BuildingsCarousel,
    'buildings-mobile': BuildingsMobile
  },
  data: function () {
    return {
      homeRoute: true
    }
  },
  metaInfo () {
    return {
      title: this.currentBuildingsPage ? this.currentBuildingsPage['seo_title_' + this.$i18n.locale] : ''
    }
  },
  computed: {
    ...mapState({
      currentBuildingsPage: state => state.pages.currentBuildingsPage,
      current: state => state.buildings.current
    })
  },
  beforeRouteEnter (to, from, next) {
    // eslint-disable-next-line
    store.dispatch('fetchCurrentBuildingsPage').then(() => {
      next()
    })
  }
}
</script>
