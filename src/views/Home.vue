<template>
  <div class="main-content">
    <nav-component/>
    <div class="home-slider">
      <div class="lines">
        <span class="line-1"></span>
        <span class="line-2"></span>
        <span class="line-3"></span>
      </div>
      <div class="caption">
        <div class="title-box">
          <h2 class="title">Ние имаме различна<br> архитектурна практика</h2>
        </div>
        <div class="btn-box">
          <router-link :to="'/' + lang + '/building-inner'" class="btn"><div class="btn-overlay"></div>виж нашите проекти</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavComponent from '@/components/layout/NavComponent'
export default {
  name: 'home',
  components: { NavComponent },
  computed: {
    lang () {
      return this.$i18n.locale
    }
  }
}
</script>
