<template>
  <div class="parkings" v-if="building" v-bind:class="{ active: parkingsActive }">
    <div class="table-box">
      <div class="close" @click="closed"></div>
      <div class="table">
        <div class="thead">
          <div class="tr">
            <div class="th">{{ $t('number') }}: (id)</div>
            <div class="th">{{ $t('mq2') }}:</div>
            <div class="th">{{ $t('price') }}:</div>
            <div class="th">{{ $t('status') }}:</div>
          </div>
        </div>
        <div class="tbody">
          {{ filtrApartments(10000, 180000, [4]) }}
          <div class="tr" v-for="parking in building.apartments.data" :key="parking.id">
            <div class="td"><div class="number">{{ parking.id }}</div></div>
            <div class="td"><div class="sqm">{{ parking.total_area }}</div></div>
            <div class="td"><div class="price" v-if="parking.status === 1 || parking.status === 2">{{ parking.price }}</div></div>
            <div class="td">
              <div v-if="parking.status == 2" class="status reserved">
                {{ $t('reserved') }}
              </div>
              <div v-if="parking.status == 3" class="status sold">
                {{ $t('sold') }}
              </div>
              <div v-if="parking.status == 1" class="status available">
                {{ $t('available') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'parking-component',
  props: [ 'parkingsActive' ],
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
