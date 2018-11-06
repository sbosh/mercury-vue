<template>
  <div class="building-listing-mobile">
    <h1 class="title">{{pageTitle}}</h1>
    <div v-if="futured.length">
      <div class="building-box" v-for="building in futured" :key="building.id">
        <div class="img-box">
          <router-link :to="'/' + lang + '/' + building.id + '/' + building['slug_' + $i18n.locale]">
            <img :src="building.thumb" alt="">
          </router-link>
        </div>
        <div class="info">
          <h2 class="title"><router-link :to="'/' + lang + '/' + building.id + '/' + building['slug_' + $i18n.locale]">{{ building['title_' + $i18n.locale] }}</router-link></h2>
        </div>
      </div>
    </div>
    <div v-else>
      <h2>{{ $t('comming_soon_buildings') }}</h2>
    </div>
    <div class="outher-buildings">
      <div class="buttons">
        <router-link :to="'/' + lang + '/current-buildings'">{{ $t('current_projects') }}</router-link>
        <router-link :to="'/' + lang + '/finished-buildings'">{{ $t('completed_projects') }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'futurebuildings-mobile',
  props: ['pageTitle'],
  data () {
    return {
      buildingsRoute: null
    }
  },
  computed: {
    lang () {
      return this.$i18n.locale
    },
    ...mapState({
      futured: state => state.buildings.futured
    })
  }
}
</script>
