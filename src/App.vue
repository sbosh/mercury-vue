<template>
  <div id="app">
    <header-component/>
    <router-view/>
  </div>
</template>
<script>
import HeaderComponent from '@/components/layout/HeaderComponent'
export default {
  name: 'app',
  components: { HeaderComponent }
}
</script>
