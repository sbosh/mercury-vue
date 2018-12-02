<template>
  <div class="main-content terms" v-if="terms">
    <mq-layout mq="md+"><navinner-component :navTitle="terms['title_' + $i18n.locale]" /></mq-layout>
    <mq-layout mq="sm" class="mobile-header"><h1 class="title">{{ terms['title_' + $i18n.locale] }}</h1></mq-layout>
    <div class="tersm-container" v-html="terms['text_' + $i18n.locale]"></div>
    <footer-component />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import FooterComponent from '@/components/layout/FooterComponent'
import NavinnerComponent from '@/components/layout/NavinnerComponent'
export default {
  name: 'terms',
  components: { FooterComponent, NavinnerComponent },
  metaInfo () {
    return {
      title: this.terms ? this.terms['seo_title_' + this.$i18n.locale] : ''
    }
  },
  computed: {
    lang () {
      return this.$i18n.locale
    },
    ...mapState({
      terms: state => state.pages.terms
    })
  }
}
</script>

<style lang="scss">
.terms {
  position: relative;
  padding-top: 200px;
  &:before {
    content: '';
    position: absolute;
    height: 500px;
    left: 0;
    right: 0;
    top: 0;
    z-index: -1;
    background: #232323;
  }
  .tersm-container {
    max-width: 1200px;
    margin-left: 195px;
    margin-right: 195px;
    padding: 40px;
    background: #f8f8f8;
    margin-bottom: 40px;
  }
}
.mobile-header {
  background: #232323;
  padding: 90px 25px 25px;
  .title {
    color: #fff;
    font-size: 34px;
  }
}
</style>
