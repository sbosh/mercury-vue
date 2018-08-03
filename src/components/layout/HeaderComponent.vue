<template>
  <header v-bind:class="{ active: isActive }">
    <nav>
      <ul>
        <router-link :to="'/' + lang">Home</router-link>
        <router-link :to="'/' + lang + '/about'">About</router-link>
        <router-link :to="'/' + lang + '/contacts'">Contacts</router-link>
      </ul>
      <button class="toggle-header"
        @click="isActive = !isActive"
        v-bind:class="{ active: isActive }">
        <div class="button">
          <span></span>
          <span></span>
        </div>
        <span>Меню</span>
      </button>
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
  data: function () {
    return {
      isActive: false
    }
  },
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
