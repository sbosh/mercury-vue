<template>
  <div id="app">
    <header-component/>
    <router-view/>
    <footer-component/>
  </div>
</template>
<script>
import HeaderComponent from '@/components/layout/HeaderComponent'
import FooterComponent from '@/components/layout/FooterComponent'
export default {
  name: 'app',
  components: { HeaderComponent, FooterComponent }
}
</script>
