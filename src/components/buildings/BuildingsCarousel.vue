<template>
  <div class="buildings-carousel">
    <swiper :options="swiperOption">
      <swiper-slide v-for="building in buildings" :key="building.id" >
        <building-listing-item
          :title="building.title"
          :image="building.bg"
          :link="building.link" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import BuildingListingItem from './BuildingListingItem'
export default {
  name: 'buildings-carousel',
  components: { BuildingListingItem },
  props: ['buildings'],
  data () {
    return {
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 0,
        effect: 'fade',
        speed: 1000,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        }
      }
    }
  }
}
</script>

<style lang="scss">
  .buildings-carousel {
    position: absolute;
    z-index: 99;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    height: 100vh;
    width: 100%;
    .swiper-wrapper,
    .swiper-container {
      height: 100vh;
      width: 100%;
    }
    .swiper-slide {
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      height: 100%;
      width: 100%;
      .bg {
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        height: 100%;
        width: 100%;
      }
    }
  }
</style>
