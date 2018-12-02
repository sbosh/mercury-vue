<template>
  <div class="main-content">
    <mq-layout mq="md+" class="black-nav"><navinner-component :navTitle="this.futureBuildingsPage['title_' + this.$i18n.locale]" /></mq-layout>
    <mq-layout mq="md+" class="mq-m future-current" v-if="futureBuildingsPage">
      <div v-if="futured.length">
        <div class="buildings building-sort">
          <swiper :options="swiperOptions">
            <swiper-slide v-for="building in futured" :key="building.id">
              <div class="building-item">
                <div class="img-box">
                  <router-link :to="'/' + lang + '/' + building.id + '/' + building['slug_' + $i18n.locale]">
                    <img :src="building.thumb" alt="">
                  </router-link>
                </div>
                <div class="caption">
                  <div class="title-box">
                    <h2 class="title"><router-link :to="'/' + lang + '/' + building.id + '/' + building['slug_' + $i18n.locale]">{{ building['title_' + $i18n.locale] }}</router-link></h2>
                    <div class="location-info">{{ building['annonce_' + $i18n.locale] }}</div>
                    <div class="btn-box"><router-link :to="'/' + lang + '/' + building.id + '/' + building['slug_' + $i18n.locale]" class="btn">{{ $t('see') }}</router-link></div>
                  </div>
                </div>
              </div>
            </swiper-slide>
            <div class="dots-paggination"></div>
          </swiper>
        </div>
      </div>
      <div v-else class="comming-soon">
        <div class="box-row">
          <div class="left"><div class="thumb-box"><img src="@/assets/images/future-building.svg" alt=""></div></div>
          <div class="right">
            <div class="caption">
              <div class="title-box">
                <h2 class="title">{{ $t('comming_soon') }}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </mq-layout>
    <mq-layout mq="sm" v-if="futureBuildingsPage">
      <futurebuildings-mobile :pageTitle="this.futureBuildingsPage['title_' + this.$i18n.locale]" />
    </mq-layout>
  </div>
</template>

<script>
import store from '../store'
import { mapState } from 'vuex'
import NavinnerComponent from '@/components/layout/NavinnerComponent'
import FutureBuildingsMobile from '@/components/mobile/FutureBuildingsMobile'
export default {
  name: 'future-buildings',
  components: {
    'navinner-component': NavinnerComponent,
    'futurebuildings-mobile': FutureBuildingsMobile
  },
  metaInfo () {
    return {
      title: this.futureBuildingsPage ? this.futureBuildingsPage['seo_title_' + this.$i18n.locale] : ''
    }
  },
  beforeRouteEnter (to, from, next) {
    store.commit('startFetching')
    store.cache.dispatch('fetchFuturedBuildings').then(() => {
      store.cache.dispatch('fetchFutureBuildingsPage').then(() => {
        next()
        store.commit('stopFetching')
      })
    })
  },
  computed: {
    swiperOptions () {
      if (this.finished.length > 1) {
        return {
          slidesPerView: 'auto',
          spaceBetween: 0,
          effect: 'fade',
          speed: 3000,
          loop: true,
          mousewheel: true,
          pagination: {
            el: '.dots-paggination',
            clickable: true,
            renderBullet (index, className) {
              return `<div class="${className}">${index + 1}</div>`
            }
          }
        }
      }
      return {
        slidesPerView: 'auto',
        spaceBetween: 0,
        effect: 'fade',
        speed: 3000,
        loop: false,
        mousewheel: false
      }
    },
    lang () {
      return this.$i18n.locale
    },
    ...mapState({
      futureBuildingsPage: state => state.pages.futureBuildingsPage,
      futured: state => state.buildings.futured
    })
  }
}
</script>

<style lang="scss">
.future-current {
  .swiper-container {
    width: 100%;
  }
  .nav-inner {
    background: #232323;
  }
}
.building-sort {
  position:relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 360px;
    background-color: #232323;
    z-index: 0;
  }
  @media screen and(max-width: 1024px) {
    &:before {
      width: 200px;
    }
  }
}
.dots-paggination {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .swiper-pagination-bullet {
    width: auto;
    height: auto;
    color: #8e8e8e;
    font-size: 16px;
    font-weight: 700;
    padding: 15px;
    border-bottom: 1px solid transparent;
    border-radius: 0;
    background: none;
    opacity: 1;
    transition: all .3s;
    &.swiper-pagination-bullet-active {
      color: #fff;
      border-bottom-color: #fa6a02;
    }
  }
}
.building-item {
  display: flex;
  align-items: center;
  opacity: 0;
  visibility: hidden;
  padding: 0 200px;
  .img-box {
    width: 50%;
    height: 60vh;
    position: relative;
    overflow: hidden;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: #232323;
      transition-duration: .7s;
      transition-delay: .3s;
      transition-property: all;
      transform: translateX(-100%);
    }
    img {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-150%, -50%);
      transition-duration: .7s;
      transition-delay: 1s;
      transition-property: all;
    }
  }
  .caption {
    width: 50%;
    .location-info {
      color: #ababab;
      font-size: 16px;
      font-weight: 600;
      background-image: url(../assets/images/location-pin.svg);
      background-position: top left;
      background-repeat: no-repeat;
      padding-left: 31px;
      min-height: 23px;
      margin: 25px 0 40px 0;
      transform: translateY(400px);
      transition-delay: 1.5s;
      transition-duration: .7s;
      transition-property: all;
    }
  }
  .title-box {
    .title {
      opacity: 0;
      visibility: hidden;
      transition-delay: 1s;
      transition-duration: .7s;
      transition-property: all;
    }
    .title, .title a {
      color: #fff;
      font-family: "Exo 2";
      font-size: 42px;
      font-weight: 700;
      text-transform: uppercase;
    }
    .title:before {
      background-color: #8d8d8d;
    }
    .title:after {
      border-color: #fa6a02;
    }
    .btn-box {
      transform: translateY(250px);
      transition-delay: 1.5s;
      transition-duration: .7s;
      transition-property: all;
      margin: 0;
      .btn {
        color: #fff;
        border-color: #fa6a02;
        &:after {
          background: #fff;
        }
        &:before {
          border-color: transparent transparent transparent #fff;
        }
      }
    }
  }
  @media screen and(max-width: 1366px){
    .title-box {
      padding-left: 80px;
      .title {
        &:before {
          margin-right: 30px;
        }
        &:after {
          margin-right: 18px;
        }
      }
    }
  }
  @media screen and(max-width:1024px){
    flex-direction: column;
    .img-box {
      width: 100%;
      height: 40vh;
      margin-bottom: 20px;
    }
    .caption {
      width: 100%;
    }
  }
  @media screen and(max-width: 768px) {
    padding-left: 0;
    .title-box {
      .title, .title a {
        font-size: 32px;
      }
    }
  }
}
.swiper-slide-active {
  .building-item {
    opacity: 1;
    visibility: visible;
    .img-box {
      &:before {
        transform: translateX(0);
      }
      img {
        transform: translate(-50%, -50%);
      }
    }
    .title-box {
      .title {
        opacity: 1;
        visibility: visible;
      }
    }
    .location-info {
      transform: translateY(0);
    }
    .caption {
      .btn-box {
        transform: translateY(0);
      }
    }
  }
}
</style>
