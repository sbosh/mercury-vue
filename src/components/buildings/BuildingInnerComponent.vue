<template>
  <div class="main-content" v-if="building">
    <mq-layout mq="md+" class="black-nav"><navinner-component navigation="buildingNav" :navTitle="building['title_' + $i18n.locale]" /></mq-layout>
    <div class="inner-building">
      <div class="inner-building-header">
        <mq-layout mq="sm"><h1 class="page-title" v-if="building">{{ building['title_' + $i18n.locale] }}</h1></mq-layout>
        <div class="main-img">
          <router-link v-if="building.status == 1 && building.use_svg == 1" :to="'/' + lang + '/' + building.id + '/' + building['slug_' + $i18n.locale] + '/view'"><img :src="building.image" alt=""></router-link>
          <img v-else :src="building.image" alt="">
        </div>
        <div v-if="building.status == 1 && building.use_svg == 1" class="btn-box">
          <router-link :to="'/' + lang + '/' + building.id + '/' + building['slug_' + $i18n.locale] + '/view'" class="btn">{{ $t('views_scheme') }}</router-link>
        </div>
      </div>
      <div class="caption animate-box" id="about">
        <div class="title-box">
          <h2 class="title" v-html="$t('about_building')"></h2>
        </div>
        <div class="text" v-bind:class="{ active: learnMore }" v-html="building['text_' + $i18n.locale]"></div>
        <mq-layout mq="sm" class="learn-more">
          <button @click="learnMore = !learnMore" v-bind:class="{ active: learnMore }"><span>{{ $t('learn_more') }}</span>{{ $t('close') }}</button>
        </mq-layout>
        <div class="pdf" v-if="building.pdf">{{ building.pdf }}</div>
      </div>
      <div class="about-complex" v-if="building.status === 1 && building.use_svg === 1">
        <div class="box-row">
          <div class="box animate-box">
            <div class="info">
              <div class="title">{{ $t('company_name') }}</div>
              <div class="text">{{ building['title_' + $i18n.locale] }}</div>
            </div>
          </div>
          <div class="box animate-box">
            <div class="info">
              <div class="title">{{ $t('floors_count') }}</div>
              <div class="text">{{ building.floorsCount }}</div>
            </div>
          </div>
          <div class="box animate-box">
            <div class="info">
              <div class="title">{{ $t('apartments_count') }}</div>
              <div class="text">{{ building.totalApartments }}</div>
            </div>
          </div>
          <div class="box animate-box">
            <div class="info">
              <div class="title">{{ $t('free_apartments') }}</div>
                <div class="text">{{ building.totalFreeApartments }}</div>
            </div>
          </div>
          <div class="box animate-box">
            <div class="info">
              <div class="title">{{ $t('finished_date') }}</div>
              <div class="text">{{ building.year }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="gallery-building" id="gallery">
        <mq-layout mq="md+">
          <swiper ref="swiper" :options="swiperOption">
            <swiper-slide v-for="(image, key) in building.gallery" :key="key">
              <img :src="image" alt=""><div class="progress-bar"></div>
            </swiper-slide>
          </swiper>
        </mq-layout>
        <mq-layout mq="sm">
          <swiper ref="swiper" :options="swiperOption" v-viewer>
            <swiper-slide v-for="(image, key) in building.gallery" :key="key">
              <img :src="image" alt=""><div class="progress-bar"></div>
            </swiper-slide>
          </swiper>
        </mq-layout>
      </div>
      <div class="location" id="location">
        <div class="caption animate-box">
          <div class="title-box">
            <h2 class="title" v-html="$t('about_location')"></h2>
          </div>
        </div>
        <div class="box-row" v-if="building.facilities">
          <div class="box" v-for="facility in building.facilities.data" :key="facility.id">
            <div class="info">
              <div class="icon"><img :src="facility.image" alt=""></div>
              <div class="text">{{facility['title_' + $i18n.locale]}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="map">
        <div class="img-box">
          <a :href="building.google_map" target='_blank' class="btn">{{ building['annonce_' + $i18n.locale] }} <span>{{ $t('to_the_location') }}</span></a>
          <GmapMap
            :center="{lat:Number(building.map_lat), lng:Number(building.map_lng)}"
            :zoom="16"
          >
            <GmapMarker
              :position="{lat:Number(building.map_lat), lng:Number(building.map_lng)}"
              :clickable="true"
              :icon="icon"
              @click="infoWindow = !infoWindow">
              <GmapInfoWindow v-if="infoWindow">
                <div class="map-tooltip">
                  <img v-if="building.thumb" :src="building.thumb" alt="" />
                  <h3>{{ building['title_' + $i18n.locale]}}</h3>
                  <p><span class="text">{{ $t('address') }}:</span>{{ building['annonce_' + $i18n.locale] }}</p>
                  <div v-if="building.use_svg === 1" class="available-apartments">
                    <div class="text" v-html="$t('available_apartments') + ':'"></div>
                    <span><b>{{ building.totalFreeApartments }}</b>/<span>{{ building.totalApartments }}</span></span>
                  </div>
                  <div v-if="building.use_svg === 1" class="tel"><div class="text">{{ $t('phone') }}:</div><a :href="$t('tel_href')">{{ $t('tel_phone') }}</a></div>
                  <div v-if="building.status == 1 && building.use_svg == 1" class="scheme">
                    <router-link :to="'/' + lang + '/' + building.id + '/' + building['slug_' + $i18n.locale] + '/view'" class="link">{{ $t('views_scheme') }}</router-link>
                  </div>
                </div>
              </GmapInfoWindow>
            </GmapMarker>
          </GmapMap>
          <div class="btn-box"><a :href="building.google_map" target='_blank' class="btn">{{ $t('see_map') }}</a></div>
        </div>
      </div>
      <div class="news-inner" id="news">
        <div class="title">{{ $t('news') }}</div>
        <div class="news-swiper">
          <news-listing-swiper :articles="swiperArticles" />
        </div>
      </div>
      <div class="next-building" v-if="building.next_building">
        <div class="text">{{ $t('next_building') }}</div>
        <h2 class="title animate-box">
          <router-link :to="'/' + lang + '/' + building.next_building.id + '/' + building.next_building['slug_' + $i18n.locale]">{{ building.next_building['title_' + $i18n.locale] }}</router-link>
        </h2>
        <div class="img-box">
          <router-link :to="'/' + lang + '/' + building.next_building.id + '/' + building.next_building['slug_' + $i18n.locale]">
            <img :src="building.next_building.image" alt="">
          </router-link>
        </div>
      </div>
      <div class="next-building" v-else>
        <div class="text">{{ $t('next_building') }}</div>
        <h2 class="title animate-box">
          <router-link :to="'/' + lang + '/' + 5 + '/' + building.first_building['slug_' + $i18n.locale]">{{ building.first_building['title_' + $i18n.locale] }}</router-link>
        </h2>
        <div class="img-box">
          <router-link :to="'/' + lang + '/' + 5 + '/' + building.first_building['slug_' + $i18n.locale]">
            <img :src="building.first_building.image" alt="">
          </router-link>
        </div>
      </div>
    </div>
    <footer-component />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import FooterComponent from '@/components/layout/FooterComponent.vue'
import NavinnerComponent from '@/components/layout/NavinnerComponent'
import NewsListingSwiper from '@/components/news/NewsListingSwiper'
export default {
  name: 'building-inner-component',
  components: {
    'footer-component': FooterComponent,
    'navinner-component': NavinnerComponent,
    'news-listing-swiper': NewsListingSwiper
  },
  data () {
    return {
      icon: require('@/assets/images/pin-build.svg'),
      infoWindow: false,
      learnMore: false,
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 15,
        speed: 1000,
        loop: true,
        init: false,
        slideToClickedSlide: true,
        autoplay: {
          delay: 7000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        breakpoints: {
          768: {
            loop: false,
            autoplay: false,
            spaceBetween: 10
          }
        }
      }
    }
  },
  mounted () {
    this.loading = false
    setTimeout(() => {
      this.$el.classList.add('active')
    }, 2000)
    let animateBox = document.getElementsByClassName('animate-box')
    window.addEventListener('scroll', function () {
      for (let index = 0; index < animateBox.length; index++) {
        let windowBottom = animateBox[index].getBoundingClientRect().bottom
        if (windowBottom - window.innerHeight <= 250) {
          animateBox[index].classList.add('visible')
        }
      }
    })
  },
  beforeDestroy () {
    this.loading = true
  },
  created () {
    this.$store.commit('startFetching')
    this.$store.dispatch('fetchBuilding', this.$route.params.id).then(() => {
      this.$refs.swiper.swiper.init()
      this.$refs.swiper.swiper.update()
      this.$store.commit('stopFetching')
    })
  },
  computed: {
    lang () {
      return this.$i18n.locale
    },
    ...mapGetters({
      swiperArticles: 'getSwiperArticles'
    }),
    ...mapState({
      articles: state => state.articles.all,
      building: state => state.buildings.building
    })
  }
}
</script>

<style lang="scss">
.next-building {
  padding: 120px 0 120px 100px;
  .text {
    color: #8d8d8d;
    font-family: Montserrat;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
  }
  .title,
  .title a {
    color: #2c2c2c;
    font-family: "Exo 2";
    font-size: 50px;
    font-weight: 600;
    text-transform: uppercase;
    text-decoration: none;
  }
  .title {
    display: flex;
    align-items: center;
    transform: translateX(-100%);
    transition: all .2s;
    opacity: 0;
    visibility: hidden;
    &.visible {
      transform: translateX(0);
      visibility: visible;
      opacity: 1;
    }
    &:hover {
      a {
        color: #000;
      }
      &:after {
        width: 15%;
        margin-left: 50px;
      }
      &:before {
        border-radius: 0;
        transform: rotate(45deg) translate(-10px, 10px);
        border-left-color: transparent;
        border-bottom-color: transparent;
      }
    }
    a {
      order: 1;
    }
    &:after {
      content: '';
      display: inline-block;
      width: 20%;
      height: 1px;
      background: #fa6a02;
      margin-left: 25px;
      order: 2;
      transition: all .3s;
    }
    &:before {
      content: '';
      display: inline-block;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 1px solid #fa6a02;
      order:3;
      transition: all .3s;
    }
  }
  .img-box {
    display: flex;
    justify-content: flex-end;
    margin-top: 55px;
    background: #000;
    overflow: hidden;
    img {
      transition: all .3s;
      opacity: .6;
      max-width: 100%;
      display: block;
    }
    &:hover {
      img {
        opacity: 1;
        transform: scale(1.1);
      }
    }

    a {
      display: block;
    }
  }
  @media screen and(max-width: 768px){
    padding: 45px 25px;
    .title, .title a {
      color: #2c2c2c;
      font-family: "Exo 2";
      font-size: 26px;
      font-weight: 600;
      text-transform: uppercase;
      &:before,&:after {
        display: none;
      }
    }
    .text {
      font-size: 10px;
      margin-bottom: 10px;
    }
    .img-box {
      display: block;
      margin-top: 20px;
      img {
        max-width: 100%;
      }
    }
  }
}
.news-inner {
  padding: 80px;
  background-color: #232323;
  .news-article .link a:hover {
    color: #fff;
  }
  .title {
    color: #fff;
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 80px;
  }
  .news-swiper .news-swiper-pagination .swiper-pagination-bullet:before {
    background: #9e9e9e;
  }
  .news-swiper .news-swiper-pagination .swiper-pagination-bullet-active:before {
    background: #fff;
  }
  @media screen and(max-width: 767px) {
    padding: 25px;
    .title {
      margin-bottom: 40px;
      color: #fff;
      font-size: 15px;
      font-weight: 600;
    }
  }
}
.map {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 100px;
  padding-left: 10%;
  .map-tooltip {
    h3 {
      margin-bottom: 10px;
      font-size: 18px;
      font-family: 'Exo 2', sans-serif;
    }
    img {
      max-width: 300px !important;
      display: block;
      margin-bottom: 5px;
    }
    p {
      margin: 0 0 10px 0;
    }
    .tel {
      display: flex;
      align-items: center;
      .text {
        display: inline-block;
        margin: 0 5px 0 0;
      }
      a {
        color: #333;
      }
    }
    .available-apartments {
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      .text {
        margin-right: 5px;
        margin-bottom: 0;
      }
      span {
        display: inline-block;
        font-size: 20px;
        background: #dfdfdf;
        color: #333;
        b {
          padding: 0 5px;
        }
        &:first-of-type {
          padding: 3px 5px;
        }
      }
    }
    .text, .tel {
      font-weight: 600;
      font-family: Montserrat;
      margin-bottom: 5px;
      br {
        display: none;
      }
    }
  }
  .vue-map-container {
    width: 100%;
    height: 65vh;
  }
  .img-box {
    width: 100%;
    img {
      max-width: 100%;
      display: block;
    }
    >.btn {
      width: 80%;
      margin-left: auto;
      margin-right: auto;
      background: #fff;
      text-transform: none;
      color: #2c2c2c;
      font-size: 16px;
      font-weight: 600;
      display: block;
      margin-bottom: -50px;
      position: relative;
      z-index: 99;
      &:before {
        content: '';
        width: 17px;
        height: 22px;
        float: left;
        margin: 0 10px 0 0;
        border: none;
        background: url('~@/assets/images/location-pin.svg') no-repeat center;
      }
      &:after {
        display: none;
      }
      span {
        float: right;
        font-size: 12px;
        text-transform: uppercase;
        font-weight: 600;
        font-family: 'Exo 2', sans-serif;
        color: #c1c1c1;
        &:after {
          content: '';
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 4px 0 4px 5px;
          border-color: transparent transparent transparent #fa6902;
          display: inline-block;
          margin: 0 0 0 10px;
        }
      }
    }
    .btn-box {
      margin-top: -40px;
      .btn {
        border-color: #fa6a02;
        background-color: #fa6a02;
        float: right;
        margin-right: 90px;
      }
    }
  }//img-box
  @media screen and(max-width: 768px){
    padding-left: 0;
    .img-box {
      > .btn {
        font-size: 12px;
        margin-bottom: 0;
        &:before {
          margin-top: -2px;
        }
        span {
          margin-top: 25px;
          display: block;
          float: none;
          color: #8d8d8d;
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          &:after {
            content: '';
            display: inline-block;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 4px 0 4px 5px;
            border-color: transparent transparent transparent #fa6a02;
            margin-top: 2px;
            margin-left: 10px;
          }
        }
      }
      .btn-box {
        margin-top: 0;
        margin-left: auto;
        margin-right: auto;
        max-width: 270px;
        .btn {
          float: none;
          display: block;
          padding: 30px;
          margin-left: auto;
          margin-right: auto;
          font-size: 11px;
        }
      }
    }
  }
  @media screen and(max-width: 600px) {
    .img-box {
      width: 100%;
      padding-left: 25px;
      padding-right: 25px;
      >.btn {
        width: 100%;
        margin-left: 0;
        margin-right: 0;
        box-sizing: border-box;
      }
      .btn-box {
        max-width: 100%;
        margin-left: 0;
        margin-right: 0;
      }
    }
  }
}//map
.location {
  padding-top: 100px;
  .caption {
    visibility: hidden;
    opacity: 0;
    transform: translateX(-100%);
    transition: all .2s;
    margin-bottom: 50px;
    &.visible {
      transform: translateX(0);
      visibility: visible;
      opacity: 1;
    }
  }
  .box-row {
    display: flex;
    justify-content: center;
    align-items: baseline;
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 1000px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 50px;
    margin-top: 50px;
  }
  .box {
    flex: 1 0 50%;
    .icon {
      width: 40px;
      img,svg {
        max-width: 100%;
      }
    }
    .info {
      padding: 15px 0;
      margin-left: 10px;
      margin-right: 10px;
      border-bottom: 1px solid #dfdfdf;
      display: flex;
      align-items: center;
    }
    .text {
      color: #484b47;
      font-size: 16px;
      font-weight: 600;
      margin-left: 20px;
    }
    &:nth-last-child(-n+2){
      .info {
        border-bottom: 0;
      }
    }
  }
  @media screen and(max-width: 768px) {
    padding: 50px 0;
    .caption {
      margin-bottom: 20px;
    }
    .box-row {
      flex-direction: column;
      padding-left: 20px;
      padding-right: 20px;
      flex-wrap: wrap;
      box-sizing: border-box;
      .box {
        flex: 1 0 100%;
        width: 100%;
        &:last-child .info {
          border-bottom: none;
        }
        .info {
          border-bottom: 1px solid #dfdfdf;
          .icon {
            width: 50px;
            img {
              max-width: 40px;
              max-height: 40px;
              display: block;
              margin: auto;
            }
          }
          .text {
            color: #484b47;
            font-size: 13px;
            font-weight: 600;
          }
        }
      }
    }
  }
}
.gallery-building {
  .swiper-container {
    padding-right: 200px;
  }
  .swiper-slide {
    background: #000;
    img {
      display: block;
      max-width: 100%;
      width: 100%;
      transition: all .3s;
    }
    .progress-bar {
      position: absolute;
      left: 80px;
      right: 80px;
      bottom: 80px;
      background: #979797;
      height: 1px;
      visibility: hidden;
      opacity: 0;
      transform: translateY(-100%);
      transition: all .3s;
      &:after {
        content: '';
        height: 1px;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        background: #fff;
      }
    }
  }
  .swiper-slide-active {
    img {
      opacity: 0.6;
      &:hover {
        opacity: 1;
      }
    }
    .progress-bar {
      visibility: visible;
      opacity: 1;
      transform: translateY(0);
      &:after {
        animation: progress-animation 7s forwards;
      }
    }
  }
  @media screen and(max-width: 768px) {
    .swiper-container {
      padding-right: 30px;
      padding-left: 30px;
    }
    .swiper-slide {
      width: 100%;
      .progress-bar {
        right: 25px;
        bottom: 25px;
        left: 25px;
        display: none;
      }
    }
  }
}
@keyframes progress-animation {
  from {
    left: 0;
    width: 0;
  }
  to {
    right: 0;
    width: 100%;
  }
}
#about {
  margin-bottom: 100px;
  .text {
    .prices {
      color: #fa6a02;
      text-decoration: none;
      &:before {
        content: '';
        width: 50px;
        height: 50px;
        background-color: #fff;
        background-image: url('~@/assets/images/arrow-pdf.svg');
        background-size: 20px;
        background-repeat: no-repeat;
        background-position: center;
        border-radius: 50%;
        margin-right: 10px;
        margin-bottom: -17px;
        display: inline-block;
      }
    }
  }
  @media screen and(max-width: 600px) {
    margin-bottom: 40px;
    .text {
      height: 37vh;
      overflow: hidden;
      position: relative;
      &:after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(255,255,255,0);
        background: -moz-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,0.37) 37%, rgba(248,248,248,0.83) 83%, rgba(248,248,248,0.9) 90%, rgba(248,248,248,1) 100%);
        background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(255,255,255,0)), color-stop(37%, rgba(255,255,255,0.37)), color-stop(83%, rgba(248,248,248,0.83)), color-stop(90%, rgba(248,248,248,0.9)), color-stop(100%, rgba(248,248,248,1)));
        background: -webkit-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,0.37) 37%, rgba(248,248,248,0.83) 83%, rgba(248,248,248,0.9) 90%, rgba(248,248,248,1) 100%);
        background: -o-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,0.37) 37%, rgba(248,248,248,0.83) 83%, rgba(248,248,248,0.9) 90%, rgba(248,248,248,1) 100%);
        background: -ms-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,0.37) 37%, rgba(248,248,248,0.83) 83%, rgba(248,248,248,0.9) 90%, rgba(248,248,248,1) 100%);
        background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.37) 37%, rgba(248,248,248,0.83) 83%, rgba(248,248,248,0.9) 90%, rgba(248,248,248,1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#f8f8f8', GradientType=0 );
      }
      &.active {
        height: auto;
        &:after {
          display: none;
        }
      }
    }
    .learn-more {
      text-align: center;
      button {
        padding: 10px 20px;
        border: none;
        box-shadow: none;
        outline: none;
        background: none;
        font-size: 0;
        text-transform: uppercase;
        font-family: "Fira Sans";
        span {
          font-size: 14px;
        }
        &.active {
          font-size: 14px;
          span {
            font-size: 0;
          }
        }
      }
    }
  }
}
.about-complex {
  padding: 0 90px;
  margin-bottom: 100px;
  .box-row {
    display: flex;
    justify-content: space-around;
    align-items: stretch;
    .box {
      padding: 0 10px;
      border-right: 1px solid #dfdfdf;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      visibility: hidden;
      opacity: 0;
      transition: all .3s;
      transform: translateY(200px);
      &.visible {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
      .info {
        display: inline-block;
        margin: auto;
        height: 100%;
      }
      &:first-child {
        .text {
          color: #4a4a4a;
          font-family: "Exo 2";
          font-size: 27px;
          font-weight: 600;
          text-transform: uppercase;
        }
      }
      &:last-child {
        border-right: 0;
      }
      .title {
        color: #8d8d8d;
        font-family: "Fira Sans";
        font-size: 15px;
        font-weight: 400;
        line-height: 19px;
      }
      .text {
        color: #484b47;
        font-size: 64px;
        font-weight: 600;
      }
    }
  }
  @media screen and(max-width: 768px) {
    padding: 20px 25px;
    margin: 25px 0;
    .box-row {
      flex-direction: column;
      align-self: center;
      justify-content: center;
      .box {
        text-align: center;
        border-right: 0;
        padding: 25px 0;
        border-bottom: 1px solid rgba(#979797, .37);
        .title {
          font-size: 12px;
          font-weight: 400;
          line-height: 14px;
        }
        .text {
          color: #4a4a4a;
          font-size: 36px;
          font-weight: 600;
          text-transform: uppercase;
        }
        &:last-child {
          border-bottom: 0;
        }
      }
    }
  }
}
.caption {
  .text {
    padding-left: 195px;
    margin-top: 40px;
    p {
      // column-count: 2;
      // column-gap: 100px;
      max-width: 84%;
      margin: 20px auto 10px auto;
      color: #383838;
      font-family: "Fira Sans";
      font-size: 17px;
      font-weight: 400;
      line-height: 23px;
    }
  }
}
.img {
  max-width: 100%;
  display: block;
  transform: translateX(-100px);
  opacity: 0;
  visibility: hidden;
  transition: all 1.4s;
}
.inner-building-header {
  transition: all 1.4s;
  background: linear-gradient(#232323 80%, #232323 80%, #232323 80%, #f8f8f8 20%, #f8f8f8 20%);
  padding: 130px 0 0 195px;
  margin-bottom: 140px;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    display: block;
    top: 200px;
    left: 88px;
    background: #979797;
    height: 50%;
    width: 1px;
  }
  .btn-box {
    margin-top: -50px;
    float: right;
    .btn {
      background-color: #fa6a02;
      border-color: #fa6a02;
      margin-right: 90px;
      padding: 42px 30px;
    }
  }
  .main-img {
    overflow: hidden;
    img {
      max-width: 100%;
      display: block;
      transition: all .3s;
    }
    &:hover img {
      transform: scale(1.1);
    }
  }
  @media screen and(max-width: 768px) {
    padding: 20px 0 0 25px;
    margin-bottom: 40px;
    &:before {
      display: none;
    }
    .page-title {
      padding: 90px 0 30px 0;
      color: #fff;
      font-family: "Exo 2";
      font-size: 18px;
      font-weight: 600;
      text-transform: uppercase;
    }
    .btn-box {
      margin-left: 0;
      float: none;
      width: 100%;
      display: flex;
      .btn {
        margin-right: auto;
        margin-left: auto;
        padding: 31px;
        font-size: 10px;
      }
    }
  }
  @media screen and(max-width: 600px) {
    padding-top: 0;
  }
}
.inner-building {
  padding: 0 195px 0 0;
  .caption .title {
    color: #2c2c2c;
    &:before {
      background: #2c2c2c;
    }
    &:after {
      border-color: #fa6a02;
    }
  }
  &.active {
    .img {
      transform: translateX(0);
      opacity: 1;
      visibility: visible;
    }
  }
  @media screen and(max-width: 768px) {
    padding: 0 195px 0 0;
    .caption {
      .title-box {
        padding-left: 40px;
        .title {
          color: #2c2c2c;
          font-size: 20px;
          font-weight: 600;
          br {
            display: none;
          }
          &:before {
            margin-right: 25px;
          }
          &:after {
            margin-right: 12px;
          }
        }
      }
      .text {
        padding: 0 40px;
        p {
          column-count: 1;
          color: #383838;
          font-size: 16px;
          font-weight: 400;
          line-height: 28px;
          margin: 0;
          max-width: 100%;
          text-align: justify;
        }
      }
    }
  }
  @media screen and(max-width: 600px) {
    padding: 0;
  }
}
</style>
