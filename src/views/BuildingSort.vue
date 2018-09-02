<template>
  <div class="main-content">
    <nav-component />
    <div class="buildings">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis eligendi repellendus ad provident neque, laudantium dolore est esse vero in porro earum quo illum aspernatur quos eveniet soluta mollitia odit!
    </div>
  </div>
</template>

<script>
import NavComponent from '@/components/layout/NavComponent'
export default {
  name: 'building-sort',
  components: {
    'nav-component': NavComponent
  },
  computed: {
    lang () {
      return this.$i18n.locale
    }
  }
}
</script>
