<template>
  <div>
    <h1>About</h1>
    <h2>{{ $t('message') }}</h2>
    <footer-component/>
  </div>
</template>
<script>
import FooterComponent from '@/components/layout/FooterComponent'
export default {
  name: 'about',
  components: { FooterComponent }
}
</script>
