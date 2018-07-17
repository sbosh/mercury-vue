<template>
  <footer>
    <nav>
      <ul>
        <router-link tag="li" :to="'/' + lang"><a href="#!">Home</a></router-link>
        <router-link tag="li" :to="'/' + lang + '/about'"><a href="#!">About</a></router-link>
      </ul>
    </nav>
  </footer>
</template>

<script>
export default {
  name: 'footer-component',
  computed: {
    lang () {
      return this.$i18n.locale
    }
  }
}
</script>

<style>

</style>
