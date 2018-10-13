<template>
  <div class="building-content">
    <!-- <preloader-component @complete="isComplete" v-if="building && isLoading" /> -->
    <transition name="page" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PreloaderComponent from '@/components/preloader/PreloaderComponent'
export default {
  name: 'building-inner',
  components: { PreloaderComponent },
  data () {
    return {
      isLoading: true
    }
  },
  methods: {
    isComplete () {
      this.isLoading = false
    }
  },
  created () {
    console.log(this.$route.params.id)
    this.$store.cache.dispatch('fetchBuildingById', this.$route.params.id)
  },
  computed: {
    ...mapState({
      building: state => state.buildings.building
    })
  }
}
</script>

<style lang="scss" scoped>
.page-enter-active, .page-leave-active {
  transition: opacity 1s, transform 1s;
}
.page-enter, .page-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}
</style>
