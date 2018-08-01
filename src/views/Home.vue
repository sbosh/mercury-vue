<template>
  <div class="main-content">
    <div class="home-slider">
      <div class="lines">
        <span class="line-1"></span>
        <span class="line-2"></span>
        <span class="line-3"></span>
      </div>
      <div class="caption">
        <h2 class="title">Ние имаме различна архитектурна практика</h2>
        <router-link :to="'/' + lang + '/building-inner'" class="btn">виж нашите проекти</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  computed: {
    lang () {
      return this.$i18n.locale
    }
  }
}
</script>
