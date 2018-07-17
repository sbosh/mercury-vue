<template>
  <header>
    <nav>
      <ul>
        <router-link tag="li" :to="'/' + lang"><a href="#!">Home</a></router-link>
        <router-link tag="li" :to="'/' + lang + '/about'"><a href="#!">About</a></router-link>
      </ul>
      <ul class="lng">
        <li v-if="lang === 'bg'" ><a href="#!" @click="changeLang('en', $event)">en</a></li>
        <li v-else><a href="#!" @click="changeLang('bg', $event)">bg</a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { loadLanguageAsync } from '@/setup/i18n'
export default {
  name: 'header-component',
  computed: {
    lang () {
      return this.$i18n.locale
    }
  },
  methods: {
    changeLang (lang, event) {
      event.preventDefault()
      let $this = this
      loadLanguageAsync(lang).then(function (lang) {
        $this.$router.push({ name: $this.$router.history.current.name, params: { lang } })
      })
    }
  }
}
</script>

<style>

</style>
