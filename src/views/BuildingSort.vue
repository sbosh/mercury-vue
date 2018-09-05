<template>
  <div class="main-content">
    <nav-component />
    <div class="buildings">
      <swiper :options="swiperOptions">
        <swiper-slide v-for="building in buildings" :key="building.id" >
          <div :style="{ 'background-image': 'url(' +  + ')' }">
            <div class="caption">
              <div class="title-box">
                <h2 class="title"><a :href="building.link">{{ building.description }}</a></h2>
                <div class="location">location</div>
                <div class="btn-box"><a href="" :herf="building.link"></a></div>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NavComponent from '@/components/layout/NavComponent'
export default {
  name: 'building-sort',
  components: {
    'nav-component': NavComponent
  },
  data () {
    return {
      swiperOptions: {
        slidesPerView: 'auto',
        spaceBetween: 0,
        effect: 'fade',
        speed: 1000,
        loop: true,
        mousewheel: true,
        pagination: {
          el: '.buildings-titles',
          clickable: false,
          renderBullet (index, className) {
            return `<div class="${className}">${index + 1}</div>`
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      buildings: 'getSortedBuildings'
    })
  }
}
</script>
