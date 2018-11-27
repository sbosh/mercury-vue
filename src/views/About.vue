<template>
  <div class="main-content about-us">
    <mq-layout mq="md+" class="black-nav"><navinner-component navigation="aboutNav" :navTitle="about['title_' + $i18n.locale]" /></mq-layout>
    <mq-layout mq="sm" class="mobile-header"><h1 class="title">{{about['title_' + $i18n.locale]}}</h1></mq-layout>
    <div class="about-content">
      <company-component id="company" />
      <service-component id="services" />
      <history-component id="history" />
    </div>
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
@media screen and(max-width: 768px){
  .black-nav {
    background: #232323;
    .headroom {
      margin-bottom: 0;
    }
  }
}
.about-us {
  @media screen and(max-width: 768px){
    .about-content {
      margin-top: -1px;
      padding-top: 25px;
      padding-right: 195px;
      .company-component:before {
        margin-top: -30px;
      }
    }
  }
  @media screen and(max-width: 600px){
    .about-content {
      margin-top: -1px;
      padding-top: 25px;
      padding-right: 0;
      .company-component:before {
        height: 200px;
      }
    }
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
