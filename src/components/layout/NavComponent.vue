<template>
  <nav class="nav">
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
  .nav {
    position: absolute;
    z-index: 999;
    top: 0;
    left: 0;
    bottom: 0;
    border-right: 1px solid rgba(#979797, .37);
    width: 195px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 30px;
  }
</style>
