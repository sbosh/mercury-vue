<template>
  <nav class="nav-inner">
    <router-link :to="'/' + lang"><img src="@/assets/images/logo-flat.png" class="logo" alt=""></router-link>
  </nav>
</template>

<script>
export default {
  name: 'navinner-component',
  computed: {
    lang () {
      return this.$i18n.locale
    }
  }
}
</script>

<style>
  .nav-inner {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 195px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 30px;
  }
</style>
