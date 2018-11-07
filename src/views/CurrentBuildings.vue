<template>
  <div class="main-content">
    <transition name="fade" v-if="!currentBuildingsPage">
      <preloader-component />
    </transition>
    <div v-else>
      <nav-component />
      <mq-layout mq="md+"><buildings-carousel :pageTitle="this.currentBuildingsPage['title_' + this.$i18n.locale]" /></mq-layout>
      <mq-layout mq="sm"><buildings-mobile :pageTitle="this.currentBuildingsPage['title_' + this.$i18n.locale]" /></mq-layout>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NavComponent from '@/components/layout/NavComponent'
import BuildingsCarousel from '@/components/buildings/BuildingsCarousel'
import BuildingsMobile from '@/components/mobile/BuildingsMobile.vue'
import PreloaderComponent from '@/components/preloader/PreloaderComponent'
export default {
  name: 'current-buildings',
  components: {
    'nav-component': NavComponent,
    'buildings-carousel': BuildingsCarousel,
    'buildings-mobile': BuildingsMobile,
    'preloader-component': PreloaderComponent
  },
  data: function () {
    return {
      homeRoute: true,
      loading: true
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
  }
}
</script>
