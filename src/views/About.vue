<template>
  <div class="main-content about-us">
    <navinner-component navigation="aboutNav" :navTitle="title" />
    <company-component />
    <service-component />
    <history-component />
    <footer-component />
  </div>
</template>
<script>
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
  metaInfo: {
    title: 'About us',
    titleTemplate: '%s | MERCURY 99 Building Company'
  }
}
</script>

<style lang="scss">

</style>
