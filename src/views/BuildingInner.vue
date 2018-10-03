<template>
  <div class="building-content">
    <router-view></router-view>
    <footer-component />
  </div>
</template>

<script>
import FooterComponent from '@/components/layout/FooterComponent.vue'
export default {
  name: 'building-inner',
  components: {
    'footer-component': FooterComponent
  }
}
</script>
