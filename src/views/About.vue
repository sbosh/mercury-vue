<template>
  <div class="main-content about-us">
    <mq-layout mq="md+"><navinner-component navigation="aboutNav" :navTitle="about['title_' + $i18n.locale]" /></mq-layout>
    <mq-layout mq="sm" class="mobile-header"><h1 class="title">{{about['title_' + $i18n.locale]}}</h1></mq-layout>
    <company-component id="company" />
    <service-component id="services" />
    <history-component id="history" />
    <footer-component />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import FooterComponent from '@/components/layout/FooterComponent'
import NavinnerComponent from '@/components/layout/NavinnerComponent'
import ServiceComponent from '@/components/about/ServiceComponent'
import HistoryComponent from '@/components/about/HistoryComponent'
import CompanyComponent from '@/components/about/CompanyComponent'
export default {
  name: 'about',
  components: { FooterComponent, NavinnerComponent, ServiceComponent, HistoryComponent, CompanyComponent },
  data () {
    return {
      title: 'За нас'
    }
  },
  metaInfo () {
    return {
      title: this.about ? this.about['seo_title_' + this.$i18n.locale] : ''
    }
  },
  computed: {
    ...mapState({
      about: state => state.pages.about
    })
  }
}
</script>

<style lang="scss">
.mobile-header {
  background: #232323;
  padding: 90px 25px 25px;
  .title {
    color: #fff;
    font-size: 34px;
  }
}
</style>
