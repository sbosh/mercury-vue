<template>
  <div class="main-content">
    <div class="about-us">
      <h1>Contacts</h1>
      <h2>{{ $t('message') }}</h2>
      <p>{{ $t('text') }}</p>
      <form action="">
        <input type="text" name="" id="">
        <input type="text" name="" id="">
        <input type="submit" value="send">
      </form>
    </div>
    <footer-component/>
  </div>
</template>
<script>
import FooterComponent from '@/components/layout/FooterComponent'
export default {
  name: 'contacts',
  components: { FooterComponent }
}
</script>
