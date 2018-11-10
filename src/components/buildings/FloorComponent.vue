<template>
  <div class="floor-plan">
    <mq-layout mq="md+" class="left-sidebar">
      <div class="top">
        <router-link :to="'/' + lang"><img src="@/assets/images/logo-filter.svg" class="logo" alt=""></router-link>
        <router-link :to="'/' + lang + '/' + this.$route.params.id + '/' + this.$route.params.building + '/' + 'view'" class="back-btn">{{ $t('back_building') }}</router-link>
      </div>
      <div class="available-from">
        <div class="text" v-html="$t('available_apartments')"></div>
        <span v-if="floors[Number($route.params.floorId)-1]">{{ floors[Number($route.params.floorId)-1].totalApartments }}</span> /
        <span v-if="floors[Number($route.params.floorId)-1]">{{ floors[Number($route.params.floorId)-1].totalFreeApartments }}</span>
        <div class="input-group">
          <label for="">{{ $t('selected_block') }}:</label>
          <select name="" id="" @change="changeRout">
            <option :value="entrance['slug_' + $i18n.locale]" v-for="entrance in buildingEntrances" :key="entrance.id" :selected="entrance['slug_' + $i18n.locale] === $route.params.slug">
            {{ entrance['title_' + $i18n.locale] }}
            </option>
          </select>
        </div>
      </div>
      <div class="compass" v-if="floors[Number($route.params.floorId)-1]"><img src="@/assets/images/compass.svg" v-if="floors" :style="{ transform: 'rotate(-' + floors[Number($route.params.floorId)-1].degrees +'deg)' }" alt=""></div>
    </mq-layout>
    <mq-layout mq="sm" class="floor-info-mobile">
      <div class="available-from">
        <div class="input-group">
          <label for="">{{ $t('selected_block') }}:</label>
          <select name="" id="" @change="changeRout">
            <option :value="entrance['slug_' + $i18n.locale]" v-for="entrance in buildingEntrances" :key="entrance.id" :selected="entrance['slug_' + $i18n.locale] === $route.params.slug">
            {{ entrance['title_' + $i18n.locale] }}
            </option>
          </select>
        </div>
        <div class="right"><div class="text" v-html="$t('available_apartments')"></div>
          <span v-if="floors[Number($route.params.floorId)-1]">{{ floors[Number($route.params.floorId)-1].totalApartments }}</span> /
          <span v-if="floors[Number($route.params.floorId)-1]">{{ floors[Number($route.params.floorId)-1].totalFreeApartments }}</span>
        </div>
      </div>
    </mq-layout>
    <div class="floor-info">
      <swiper ref="mySwiper" :options="swiperOptions()">
        <swiper-slide v-for="floor in floors" :key="floor.id">
          <div class="img-box">
            <img :src="floor.image" alt="">
            <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
              <g
                v-bind:class="{sold: apartment.status !== 1}"
                v-for="apartment in floor.apartments.data"
                :key="apartment.id"
                @click="apartmentRoute(apartment['slug_' + $i18n.locale])"
                v-tooltip="{ content: tooltipContent(apartment), placement: 'top', offset: '0' }">
                <path :d="apartment.coords"></path>
              </g>
            </svg>
          </div>
        </swiper-slide>
      </swiper>
      <div class="swiper-pagination"></div>
    </div>
    <mq-layout mq="sm" class="buttons-mobile">
      <router-link :to="'/' + lang + '/' + this.$route.params.id + '/' + this.$route.params.building + '/' + 'view'" class="btn">{{ $t('back_building') }}</router-link>
    </mq-layout>
  </div>
</template>

<script>
import store from '../../store'
import { mapState } from 'vuex'
export default {
  name: 'building-inner-floor',
  data () {
    return {
      swiperHasRef: false,
      degrees: null
    }
  },
  computed: {
    ...mapState({
      building: state => state.buildings.building,
      buildingEntrances: state => state.buildings.buildingEntrances
    }),
    floors () {
      return this.$store.getters.getFloorsByEntrance(this.$route.params.slug)
    },
    lang () {
      return this.$i18n.locale
    },
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.$el.querySelector('.left-sidebar')) this.$el.querySelector('.left-sidebar').style.display = 'none'
    next()
  },
  beforeRouteEnter (to, from, next) {
    store.commit('startFetching')
    // eslint-disable-next-line
    store.cache.dispatch('fetchBuildingEntrances', to.params.id).then(() => {
      // eslint-disable-next-line
      store.cache.dispatch('fetchBuildingFloors', to.params.id).then(() => {
        // eslint-disable-next-line
        store.cache.dispatch('fetchBuildingApartments', to.params.id).then(() => {
          next()
        })
      })
    })
  },
  mounted () {
    this.initSwiper()
  },
  updated () {
    this.initSwiper()
  },
  methods: {
    tooltipContent (apartment) {
      return `<h4>${apartment['title_' + this.$i18n.locale]}</h4><div class="icons"><div><i class="area-icon"></i> ${apartment.total_area} m²</div> <div><i class="rooms-icon"></i>${apartment.rooms}</div></div> <div class="price">${apartment.price} EUR</div><div class="status">${this.apartmentStatus(apartment.status)}</div>`
    },
    apartmentStatus (status) {
      if (status === 1) {
        return `<div class="available">` + this.$t('available') + `<div>`
      }
      if (status === 2) {
        return `<div class="reserved">` + this.$t('reserved') + `<div>`
      }
      if (status === 3) {
        return `<div class="sold">` + this.$t('sold') + `<div>`
      }
    },
    initSwiper () {
      store.commit('stopFetching')
      if (this.$refs.mySwiper) {
        this.$refs.mySwiper.swiper.slideTo(Number(this.$route.params.floorId))
        this.$refs.mySwiper.swiper.on('slideChange', this.handleSlideChange)
      }
    },
    swiperOptions () {
      const $this = this
      return {
        slidesPerView: 'auto',
        spaceBetween: 0,
        effect: 'fade',
        speed: 1000,
        loop: true,
        mousewheel: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + ' <span class="floor">' + $this.$t('floor') + '</span></span>'
          }
        }
      }
    },
    apartmentRoute (apartmentSlug) {
      this.$router.push({ name: 'apartment', params: { apartmentSlug } })
    },
    changeRout (event) {
      this.$router.replace({ name: 'building-inner-floor', params: { slug: event.target.value, floorId: 1 } })
    },
    handleSlideChange () {
      const floor = this.floors[this.swiper.activeIndex - 1]
      this.$router.replace({ name: 'building-inner-floor', params: { floorId: floor['slug_' + this.$i18n.locale] } })
    }
  }
}
</script>

<style lang="scss">
.tooltip {
  background: #fff;
  box-shadow: 0px 0px 12px -2px rgba(0,0,0,0.46);
  padding: 25px;
  z-index: 9999;
  font-size: 16px;
  line-height: 20px;
  min-width: 200px;
  @media screen and(max-width: 1025px) {
    display: none !important;
  }
  .icons {
    display: flex;
    align-items: center;
    margin: 5px -10px;
    div {
      display: flex;
      align-items: center;
      margin: 10px;
      font-size: 14px;
      font-weight: 600;
    }
    i {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #fa6a02;
      background-repeat: no-repeat;
      background-position: center center;
      margin-right: 6px;
      display: inline-block;
      &.area-icon {
        background-image: url(~@/assets/images/area-icon.svg);
      }
      &.rooms-icon {
        background-image: url(~@/assets/images/rooms-icon.svg);
      }
    }
  }
  .price {
    font-weight: 600;
    margin-bottom: 10px;
  }
  &:not(.right-tooltip):after {
    content: '';
    position: absolute;
    bottom: -7px;
    left: 50%;
    margin-left: -5px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 7px 6.5px 0 6.5px;
    border-color: #fff transparent transparent transparent;
  }
  &.right-tooltip:after {
    content: '';
    position: absolute;
    bottom: 20px;
    left: 0;
    margin-left: -7px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 6.5px 7px 6.5px 0;
    border-color: transparent #fff transparent transparent;
  }
  &.left-tooltip:after {
    content: '';
    position: absolute;
    left: 100%;
    right: initial;
    display: block;
    top: 50%;
    margin-top: -7px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 10px 0 10px 11px;
    border-color: transparent transparent transparent #fff;
  }
  h3 {
    text-align: center;
    margin: 0 0 10px 0;
  }
  .sold,
  .reserved,
  .available {
    font-weight: 600;
    margin-top: 5px;
  }
  .sold {
    color: #e22f2f;
  }
  .available {
    color: #22a314;
  }
  .reserved {
    color: #fa6a02;
  }
}
.center-tooltip {
  width: auto;
  min-width: inherit;
  padding: 5px;
  font-size: 10px;
  text-transform: uppercase;
  text-align: center;
  &:after {
    display: none;
  }
}
.floor-info {
  height: 100vh;
  text-align: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  .img-box {
    visibility: hidden;
    opacity: 0;
    transition: all .3s;
    margin: 0 440px 0 220px;
    position: relative;
    max-width: 1200px;
    img {
      max-width: 100%;
      position: relative;
      z-index: 1;
    }
    svg {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      width: 100%;
      height: 100%;
      path,
      polygon,
      rect {
        -webkit-transition: .3s all cubic-bezier(.115,.87,.19,1);
        -o-transition: .3s all cubic-bezier(.115,.87,.19,1);
        transition: .3s all cubic-bezier(.115,.87,.19,1);
        opacity: 0;
        fill: #fa6a02 !important;
        mix-blend-mode: multiply;
        cursor: pointer;
      }
    }
    g:hover path,
    g:hover polygon,
    g:hover rect,
    g:hover,
    g polygon:hover {
      opacity: .7;
    }
  }
  .swiper-slide-active {
    .img-box {
      visibility: visible;
      opacity: 1;
    }
  }
  .swiper-pagination.swiper-pagination-bullets {
    right: 0;
    top: 50%;
    transform: translate3d(0, 0, 0) rotate(90deg) translateX(-52px);
    white-space: nowrap;
    padding-top: 20px;
    .swiper-pagination-bullet {
      transform: scale(1) rotate(-90deg);
      position: relative;
      width: 100px;
      height: 100px;
      border-radius: 0;
      border: 1px solid transparent;
      background: transparent;
      margin: 0 10px;
      text-align: center;
      line-height: 100px;
      box-shadow: none;
      outline: none;
      font-size: 64px;
      font-weight: 700;
      text-transform: uppercase;
      color: #000000;
      opacity: 1;
      .floor {
        opacity: 0;
        transform: rotate(90deg) translateY(-50%);
        color: #8d8d8d;
        font-family: "Fira Sans";
        font-size: 11px;
        height: 15px;
        line-height: 15px;
        font-weight: 500;
        text-transform: uppercase;
        position: absolute;
        right: -22px;
        top: 50%;
        margin-top: -7px;
      }
      &.swiper-pagination-bullet-active {
        color: #fa6a02;
        border: 1px solid #fa6a02;
        .floor {
          opacity: 1;
        }
      }
    }
  }
  @media screen and(max-width: 768px) {
    padding: 0 25px 25px;
    display: block;
    height: auto;
    min-height: 50vh;
    .img-box {
      padding-right: 0;
      margin-bottom: 30px;
      margin-left: 0;
      margin-right: 0;
      img,
      svg {
        max-width: 100%;
        max-height: 100%;
        height: auto;
        display: block;
        margin: auto;
      }
    }
    .swiper-pagination.swiper-pagination-bullets {
      position: relative;
      right: 0;
      left: 0;
      top: inherit;
      transform: translate3d(0, 0, 0) rotate(0) translateX(0);
      padding-top: 20px;
      .swiper-pagination-bullet {
        transform: scale(1) rotate(0);
        width: 50px;
        height: 50px;
        line-height: 50px;
        font-size: 24px;
        margin: 0 5px;
        .floor {
          opacity: 0;
          transform: rotate(0) translateY(0);
          color: #8d8d8d;
          font-family: "Fira Sans";
          font-size: 11px;
          height: 15px;
          line-height: 15px;
          right: 0;
          left: 0;
          text-align: center;
          top: -20px;
          margin-top: 0;
        }
        &.swiper-pagination-bullet-active {
          .floor {
            opacity: 1;
          }
        }
      }
    }
  }
}
.left-sidebar {
  width: 195px;
  border-right: 1px solid #979797;
  background: #f8f8f8;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 1001;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding-left: 25px;
  padding-right: 25px;
  box-sizing: border-box;
  padding-bottom: 40px;
  padding-top: 30px;
  transition: all .3s;
  /*transform: translateX(-195px);*/
  .router-link-active {
    margin: 40px auto;
    display: block;
    text-align: center;
    img {
      max-width: 100px;
    }
  }
  .back-btn {
    color: #000;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    background-color: #eeeeee;
    display: block;
    padding: 20px 10px;
    text-align: center;
    cursor: pointer;
    text-decoration: none;
    &:before {
      content: '';
      width: 19px;
      height: 12px;
      background: url(~@/assets/images/back-arrow-gray.svg) no-repeat center;
      display: inline-block;
      transform: rotate(90deg);
    }
  }
  .available-from {
    text-align: left;
    width: 100%;
    .text {
      display: block;
      color: #8d8d8d;
      font-family: "Fira Sans";
      font-size: 11px;
      font-weight: 500;
      text-transform: uppercase;
    }
    .input-group {
      margin: 20px 0;
    }
    label {
      color: #8d8d8d;
      font-family: "Fira Sans";
      font-size: 11px;
      font-weight: 500;
      text-transform: uppercase;
      margin-bottom: 6px;
      display: block;
    }
    select {
      width: 100%;
      height: 43px;
      line-height: 44px;
      border: 1px solid #c0c0c0;
      color: #000;
      font-size: 14px;
      font-weight: 600;
      outline: none;
      padding-left: 20px;
    }
    span {
      color: #8d8d8d;
      font-size: 24px;
      text-transform: uppercase;
      font-weight: 400;
      &:first-of-type {
        color: #000;
        font-weight: 600;
      }
    }
  }
}
.active-component {
  .left-sidebar {
    /*transform: translateX(0);*/
    .compass {
      animation: rotate-animation 1.3s linear;
      img {
        transition: all .4s;
      }
    }
  }
}
.floor-info-mobile {
  margin: 90px 25px 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(#979797, .37);
  .available-from {
    display: flex;
    justify-content: space-around;
    align-items: center;
    >div {
      width: 100%;
    }
    .input-group {
      margin-right: 20px;
    }
    .text {
      display: block;
      color: #8d8d8d;
      font-family: "Fira Sans";
      font-size: 11px;
      font-weight: 500;
      text-transform: uppercase;
    }
    label {
      color: #8d8d8d;
      font-family: "Fira Sans";
      font-size: 11px;
      font-weight: 500;
      text-transform: uppercase;
      margin-bottom: 6px;
      display: block;
    }
    select {
      width: 100%;
      height: 43px;
      line-height: 44px;
      border: 1px solid #c0c0c0;
      color: #000;
      font-size: 14px;
      font-weight: 600;
      outline: none;
      padding-left: 20px;
    }
    span {
      color: #000;
      font-size: 27px;
      text-transform: uppercase;
      font-weight: 300;
      &:first-of-type {
        color: #000;
        font-weight: 600;
      }
    }
  }
}
.buttons-mobile {
  padding: 30px 0;
  margin: 15px 25px 0 25px;
  border-top: 1px solid rgba(#979797, .37);
  .btn {
    width: 100%;
    box-sizing: border-box;
    background-color: #eee;
    color: #000;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    text-align: center;
    padding: 30px 20px;
    text-decoration: none;
    &:before {
      position: absolute;
      left: 10px;
      top: 25px;
      width: 20px;
      height: 20px;
      padding: 0;
      margin: 0;
      border: none;
      background-image: url(~@/assets/images/arrow-right.png);
      background-repeat: no-repeat;
      background-position: center center;
    }
    &:after {
      display: none;
    }
  }
}
@keyframes rotate-animation {
  0% {
    transform: rotate(0)
  }
  100% {
    transform: rotate(360deg)
  }
}
</style>
