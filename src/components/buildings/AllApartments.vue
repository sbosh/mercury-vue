<template>
  <div class="all-apartments" v-bind:class="{ active: apartmentsActive }">
    <div class="table-box">
      <div class="close" @click="closed"></div>
      <div class="table">
        <div class="thead">
          <div class="tr">
            <div class="th">Вход:</div>
            <div class="th">Ниво:</div>
            <div class="th">Номер: (id)</div>
            <div class="th">квадратура:</div>
            <div class="th">Цена:</div>
            <div class="th">Статус:</div>
          </div>
        </div>
        <div class="tbody">
          {{ filtrApartments(10000, 180000, [4]) }}
          <router-link :to="'/' + $i18n.locale + '/' + $route.params.id + '/' + $route.params.building + '/floor/' + apartment.floor_for_filters + '/1/' + apartment['slug_' + $i18n.locale]" class="tr" v-for="apartment in apartments" :key="apartment.id">
            <div class="td"><div class="block">{{ apartment.block }}</div></div>
            <div class="td"><div class="level">{{ apartment.floor_for_filters }}</div></div>
            <div class="td"><div class="number">{{ apartment.id }}</div></div>
            <div class="td"><div class="sqm">{{ apartment.total_area }}</div></div>
            <div class="td"><div class="price">{{ apartment.price }}</div></div>
            <div class="td"><div class="status">{{ apartment.status }}</div></div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'all-apartments',
  props: [ 'apartmentsActive' ],
  computed: {
    ...mapGetters({
      apartments: 'getApartments',
      filtrApartments: 'getFiltredApartments'
    })
  },
  methods: {
    closed () {
      this.$emit('clicked', false)
    }
  }
}
</script>
