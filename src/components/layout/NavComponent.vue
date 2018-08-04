<template>
  <nav>
    <router-link :to="'/' + lang"><img src="@/assets/images/logo.svg" class="logo" alt=""></router-link>
  </nav>
</template>

<script>
export default {
  name: 'nav-component',
  computed: {
    lang () {
      return this.$i18n.locale
    }
  }
}
</script>

<style lang="scss">
  .logo {
    position: absolute;
    top: 30px;
    left: 45px;
  }
</style>
