<template>
  <div class="cookies-box">
    <h3>{{ $t('this_site_use_cookies') }}</h3>
    <p>{{ $t('cookies_text') }}</p>
    <div id="agree">{{ $t('i_agree') }}</div>
    <router-link :to="'/' + lang + '/terms'">{{ $t('terms') }}</router-link>
  </div>
</template>

<script>
export default {
  name: 'cookies-box',
  computed: {
    lang () {
      return this.$i18n.locale
    }
  }
}
</script>

<style lang="scss">
.cookies-box {
  position: fixed;
  right: 195px;
  bottom: 0;
  z-index: 99999;
  padding: 20px;
  background: #333;
  width: 300px;
  color: #fff;
  display: none !important;
  h3 {
    padding-left: 40px;
    background: url('~@/assets/images/cookie-icon.svg') no-repeat left center;
  }
  p {
    display: block;
    width: 100%;
    margin: 10px 0;
  }
  #agree {
    cursor: pointer;
    padding: 10px;
    margin: 10px 0 0 0;
    border: 1px solid #fff;
    display: inline-block;
  }
}
</style>
