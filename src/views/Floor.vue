<template>
  <div class="floor-apartment">
    <transition name="page" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'building-floor',
  data () {
    return {
      loading: true
    }
  },
  created () {
    // eslint-disable-next-line
    this.$store.cache.dispatch('fetchBuildingEntrances', this.$route.params.id).then(() => {
      // eslint-disable-next-line
      this.$store.cache.dispatch('fetchBuildingFloors', this.$route.params.id).then(() => {
        // eslint-disable-next-line
        this.$store.cache.dispatch('fetchBuildingApartments', this.$route.params.id).then(() => {
          this.loading = false
        })
      })
    })
  }
}
</script>

<style lang="scss">
.page-enter-active, .page-leave-active {
  transition: opacity 1s, transform 1s;
}
.page-enter, .page-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}
</style>
