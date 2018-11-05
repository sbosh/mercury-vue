<template>
  <div class="buildings-carousel" v-if="current">
    <swiper ref="swiper" :options="this.getSwiperOptions(this.home)">
      <swiper-slide v-for="building in current" :key="building.id">
        <div class="bg" :style="{ 'background-image': 'url(' + building.image + ')' }">
          <div class="caption" v-if="!home">
            <div class="title-box">
              <h2 class="title"><router-link :to="'/' + lang + '/' + building.id + '/' + building['slug_' + $i18n.locale]">{{ building['title_' + $i18n.locale] }}</router-link></h2>
            </div>
          </div>
        </div>
      </swiper-slide>
      <div class="buildings-list" v-if="!home">
        <h3>{{ currentBuildingsPage['title_' + $i18n.locale] }}</h3>
        <div class="buildings-titles">
          <div class="building-title" v-for="(building, index) in current" :key="building.id" @mouseenter="changeSwpier(index)">
            <router-link :to="'/' + lang + '/' + building.id + '/' + building['slug_' + $i18n.locale] + '/view'" v-if="building.use_svg">
              {{ building['title_' + $i18n.locale] }}
            </router-link>
            <router-link :to="'/' + lang + '/' + building.id + '/' + building['slug_' + $i18n.locale]" v-else>
              {{ building['title_' + $i18n.locale] }}
            </router-link>
          </div>
        </div>
        <div class="buttons">
          <router-link :to="'/' + lang + '/future-buildings'">{{ $t('future_projects') }}</router-link>
          <router-link :to="'/' + lang + '/finished-buildings'">{{ $t('completed_projects') }}</router-link>
        </div>
      </div>
      <div class="scroll-icon" v-if="!home"><span></span></div>
    </swiper>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'buildings-carousel',
  props: ['home', 'pageTitle'],
  data () {
    return {
      buildingsRoute: null,
      active: false
    }
  },
  methods: {
    changeSwpier (index) {
      this.$refs.swiper.swiper.slideTo(index)
    },
    getSwiperOptions (isHome) {
      let options = {
        slidesPerView: 'auto',
        spaceBetween: 0,
        effect: 'fade',
        speed: 1000,
        loop: true,
        mousewheel: true,
        keyboard: {
          enabled: true
        }
      }
      if (isHome) {
        options.autoplay = {
          delay: 3000,
          disableOnInteraction: false
        }
      }
      return options
    }
  },
  created () {
    this.$store.cache.dispatch('fetchCurrentBuildings')
  },
  computed: {
    lang () {
      return this.$i18n.locale
    },
    ...mapState({
      currentBuildingsPage: state => state.pages.currentBuildingsPage,
      current: state => state.buildings.current
    })
  }
}
</script>

<style lang="scss">
.scroll-icon {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translate(-50%, 200%);
  transition-delay: 1.5s;
  transition-duration: .7s;
  transition-property: all;
  z-index: 2000;
  span {
    width: 24px;
    height: 40px;
    border: 2px solid #fff;
    display: block;
    border-radius: 12px;
    &:after {
      content: '';
      border-radius: 12px;
      width: 4px;
      height: 12px;
      background: #fff;
      position: absolute;
      left: 50%;
      top: 7px;
      margin-left: -2px;
      animation: bounce-animation .4s linear alternate infinite;
    }
  }
}
.active-component {
  .scroll-icon {
  transform: translate(-50%, 0);
  }
 .buildings-list {
  transform: translateY(0);
 }
}
.buildings-list {
  position: absolute;
  right: 195px;
  bottom: 0;
  background: #fff;
  z-index: 999;
  padding: 35px 0;
  transition: .7s;
  transform: translateY(100%);
  counter-reset: titles;
  &:before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    height: 100vh;
    width: 1px;
    background: rgba(151, 151, 151, 0.37);
  }
  h3 {
    color: #8d8d8d;
    font-family: "Exo 2";
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    margin-left: 40px;
    margin-bottom: 20px;
  }
  .buildings-titles {
    border-bottom: 1px solid #dfdfdf;
    margin-bottom: 40px;
  }
  .building-title {
    color: #000;
    font-size: 18px;
    font-weight: 600;
    border-bottom: 1px solid #dfdfdf;
    margin-left: 40px;
    margin-right: 40px;
    width: auto;
    height: auto;
    background: none;
    box-shadow: none;
    border-radius: 0;
    opacity: 1;
    display: block;
    &:last-child {
      border-bottom: 0;
    }
    a {
      color: #000;
      display: block;
      padding: 20px 0;
      text-decoration: none;
      display: block;
      &:before {
        counter-increment: titles;
        content: "0" counters(titles,". 0");
        display: inline-block;
        color: #fa6a02;
        font-family: Montserrat;
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        float: left;
        margin: 5px 10px 0;
      }
    }
    &:hover,
    &.active {
      a {
        color: #fa6a02;
      }
    }
  }
  .buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 40px;
    margin-right: 40px;
    a {
      border-right: 1px solid #8d8d8d;
      color: #484b47;
      font-family: "Fira Sans";
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      text-decoration: none;
      display: block;
      padding: 13px 30px;
      transition: all .3s;
      border: 1px solid #8d8d8d;
      &:hover {
        background: #fa6a02;
        color: #fff;
        border-color: #fa6a02;
      }
      &:last-child {
        border-left: 0;
      }
    }
  }
}
.buildings-carousel {
  position: absolute;
  z-index: 99;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  height: 100vh;
  width: 100%;
  .caption {
    max-width: 50%;
    position: relative;
    z-index: 1000;
  }
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
      display: flex;
      align-items: center;
      &:after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(0,0,0, .4s);
      }
    }
  }
}
@media screen and(max-width: 1366px) {
  .buildings-carousel {
    .swiper-slide {
      .caption {
        .title {
          font-size: 28px;
          line-height: 36px;
        }
      }
    }
  }
}
@keyframes bounce-animation {
  0%{
    transform:translateY(0);
    }
  to{
    transform:translateY(7px);
  }
}
</style>
