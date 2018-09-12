<template>
  <div class="main-content about-us">
    <navinner-component />
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
  components: { FooterComponent, NavinnerComponent, ServiceComponent, HistoryComponent, CompanyComponent }
}
</script>

<style lang="scss">

</style>
