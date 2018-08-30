<template>
  <div class="bg" :style="{ 'background-image': 'url(' + building.bg + ')' }">
    <div class="title"><a :href="building.link">{{ building.title }}</a></div>
  </div>
</template>

<script>
import NavComponent from '@/components/layout/NavComponent'
import BuildingsCarouselComponent from '@/components/buildings/BuildingsCarouselComponent'
export default {
  name: 'buildings-listing',
  components: {
    'nav-component': NavComponent,
    'buildings-carousel': BuildingsCarouselComponent
  },
  computed: {
    lang () {
      return this.$i18n.locale
    }
  }
}
</script>
