<template>
  <mq-layout mq="md+">
    <nav class="nav">
      <router-link :to="'/' + lang" class="inner-logo"><img src="@/assets/images/logo-white.svg" alt=""></router-link>
    </nav>
  </mq-layout>
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
    .inner-logo {
      img {
        max-width: 100px;
      }
    }
  }
</style>
