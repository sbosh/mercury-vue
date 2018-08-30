<template>
  <div class="main-content">
    <nav-component />
    <buildings-carousel :buildings="buildings" :fullListing="true" />
  </div>
</template>

<script>
import NavComponent from '@/components/layout/NavComponent'
import BuildingsCarousel from '@/components/buildings/BuildingsCarousel'
export default {
  name: 'buildings-listing',
  components: {
    'nav-component': NavComponent,
    'buildings-carousel': BuildingsCarousel
  },
  data () {
    return {
      buildings: [
        {
          title: 'Title 1',
          link: 'https://google.com',
          bg: require('@/assets/images/building01.jpg')
        },
        {
          title: 'Title 2',
          link: 'https://google.com',
          bg: require('@/assets/images/gallery01.jpg')
        },
        {
          title: 'Title 3',
          link: 'https://google.com',
          bg: require('@/assets/images/next-building.jpg')
        }
      ]
    }
  },
  computed: {
    lang () {
      return this.$i18n.locale
    }
  }
}
</script>
