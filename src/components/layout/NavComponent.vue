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
  .active-component {
    .logo {
      transform: translateX(0);
    }
  }
  .logo {
    position: absolute;
    transform: translateX(-100px);
    transition: all .6s;
  }
</style>
