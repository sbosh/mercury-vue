<template>
  <div class="building-listing-mobile">
    <h1 class="title">{{pageTitle}}</h1>
    <div class="building-box" v-for="(building, index) in current" :key="building.id">
      <router-link :to="'/' + lang + '/' + building.id + '/' + building['slug_' + $i18n.locale] + '/view'"><div class="img-box"><img :src="building.image" alt=""></div></router-link>
      <div class="info">
        <h2 class="title">
          <router-link :to="'/' + lang + '/' + building.id + '/' + building['slug_' + $i18n.locale] + '/view'"><span>{{ index + 1 }}</span> {{ building['title_' + $i18n.locale] }}</router-link>
        </h2>
      </div>
    </div>
    <div class="outher-buildings">
      <div class="buttons">
        <router-link :to="'/' + lang + '/future-buildings'">{{ $t('future_projects') }}</router-link>
        <router-link :to="'/' + lang + '/finished-buildings'">{{ $t('completed_projects') }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'buildings-mobile',
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
      current: state => state.buildings.current
    })
  }
}
</script>
