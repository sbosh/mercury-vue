<template>
  <div class="building-content">
    <preloader-component @complete="isComplete" v-if="building && isLoading" />
    <router-view />
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
