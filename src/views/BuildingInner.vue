<template>
  <div class="building-content">
    <transition name="fade" v-if="loading">
      <preloader-component />
    </transition>
    <transition v-else name="page" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import PreloaderComponent from '@/components/preloader/PreloaderComponent'
import { mapState } from 'vuex'
export default {
  name: 'building-inner',
  components: { PreloaderComponent },
  data () {
    return {
      loading: false
    }
  },
  created () {
    this.loading = true

    // eslint-disable-next-line
    this.$store.cache.dispatch('fetchBuilding', this.$route.params.id).then(() => this.loading = false)
  },
  computed: {
    ...mapState({
      building: state => state.buildings.building
    })
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.page-enter-active, .page-leave-active {
  transition: opacity 1s, transform 1s;
}
.page-enter, .page-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}
</style>
