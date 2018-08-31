<template>
  <div class="main-content">
    <nav-component />
    <buildings-carousel />
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
  computed: {
    lang () {
      return this.$i18n.locale
    }
  }
}
</script>
