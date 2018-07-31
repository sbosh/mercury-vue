<template>
  <div class="main-content">
    <div class="about-us">
      <h1>About</h1>
      <h2>{{ $t('message') }}</h2>
      <p>{{ $t('text') }}</p>
    </div>
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
