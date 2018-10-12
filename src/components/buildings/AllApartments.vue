<template>
  <div class="all-apartments" v-bind:class="{ active: apartmentsActive }">
    <div class="table-box">
      <div class="close" @click="closed"></div>
      <div class="table">
        <div class="thead">
          <div class="tr">
            <div class="th">{{ $t('entrance') }}:</div>
            <div class="th">{{ $t('level') }}:</div>
            <div class="th">{{ $t('number') }}: (id)</div>
            <div class="th">{{ $t('mq2') }}:</div>
            <div class="th">{{ $t('price') }}:</div>
            <div class="th">{{ $t('status') }}:</div>
          </div>
        </div>
        <div class="tbody">
          {{ filtrApartments(10000, 180000, [4]) }}
          <router-link :to="'/' + $i18n.locale + '/' + $route.params.id + '/' + $route.params.building + '/floor/' + apartment.floor_for_filters + '/1/' + apartment['slug_' + $i18n.locale]" class="tr" v-for="apartment in building.apartments.data" :key="apartment.id">
            <div class="td"><div class="block">{{ apartment.block }}</div></div>
            <div class="td"><div class="level">{{ apartment.floor_for_filters }}</div></div>
            <div class="td"><div class="number">{{ apartment.id }}</div></div>
            <div class="td"><div class="sqm">{{ apartment.total_area }}</div></div>
            <div class="td"><div class="price" v-if="apartment.status === 1 || apartment.status === 2">{{ apartment.price }}</div></div>
            <div class="td">
              <div v-if="apartment.status == 2" class="status reserved">
                {{ $t('reserved') }}
              </div>
              <div v-if="apartment.status == 3" class="status sold">
                {{ $t('sold') }}
              </div>
              <div v-if="apartment.status == 1" class="status available">
                {{ $t('available') }}
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'all-apartments',
  props: [ 'apartmentsActive' ],
  computed: {
    ...mapState({
      building: state => state.buildings.building
    }),
    ...mapGetters({
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
