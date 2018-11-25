<template>
<div class="apartment-inner">
  <mq-layout mq="md+" class="left-sidebar">
    <div class="top">
      <router-link :to="'/' + lang"><img src="@/assets/images/logo-filter.svg" class="logo" alt=""></router-link>
      <router-link :to="'/' + lang + '/' + this.$route.params.id + '/' + this.$route.params.building + '/' + 'view'" class="back-btn">{{ $t('back_building') }}</router-link>
      <router-link :to="'/' + lang + '/' + this.$route.params.id + '/' + this.$route.params.building + '/floor/' + this.$route.params.floorId + '/' + this.$route.params.slug" class="back-btn">{{ $t('back_floor') }}</router-link>
    </div>
    <div class="available-from">
      <div class="status">
        <div class="text">{{ $t('status') }}</div>
        <div v-if="apartment.status == 1" class="available">
          {{ $t('available') }}
        </div>
        <div v-if="apartment.status == 2" class="reserved">
          {{ $t('reserved') }}
        </div>
        <div v-if="apartment.status == 3" class="sold">
          {{ $t('sold') }}
        </div>
      </div>
      <div class="input-group">
        <label for="">{{ $t('selected_block') }}:</label>
        <select name="" id="" @change="changeRout">
          <option :value="entrance['slug_' + $i18n.locale]" v-for="entrance in buildingEntrances" :key="entrance.id" :selected="entrance['slug_' + $i18n.locale] === $route.params.slug">
          {{ entrance['title_' + $i18n.locale] }}
          </option>
        </select>
      </div>
    </div>
    <div class="floor-plan">
      <div class="text">{{ $t('floor_layout') }} <br> {{ $t('floor') }}: {{ Number($route.params.floorId)}}</div>
      <div class="svg-box" v-if="floors">
          <img :src="floors[Number($route.params.floorId) - 1].image" alt="">
          <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
            <g
              :class="{'active': apartment['slug_' + $i18n.locale] === $route.params.apartmentSlug }"
              v-for="apartment in floors[Number($route.params.floorId) -1].apartments.data"
              :key="apartment.id"
              v-tooltip="{ content: tooltipContent(apartment), placement: 'right-end', offset: '30', classes: 'right-tooltip' }"
              @click="apartmentRoute(apartment['slug_' + $i18n.locale])">
              <path :d="apartment.coords" fill="none"></path>
            </g>
          </svg>
      </div>
    </div>
  </mq-layout>
  <div class="apartment-info">
    <div class="apartment-header">
      <div class="left">
        <div class="title"><h1>{{ apartment['title_' + $i18n.locale] }}</h1></div>
        <div class="sqm">{{ apartment.total_area }} m²</div>
      </div>
      <div class="right">
        <div class="">
          <div class="text" v-if="apartment.status == 1">{{ $t('total_price') }}:</div>
          <div class="price" v-if="apartment.status == 1">{{ this.formatPrice(apartment.price) }} <div class="currency">{{ $t('euro') }}</div></div>
          <div class="price available" v-if="apartment.status == 2" >{{ $t('available') }}</div>
          <div class="price sold" v-if="apartment.status == 3" >{{ $t('sold') }}</div>
        </div>
        <div v-if="apartment.status == 1">
          <div class="text"><span>{{ $t('price_per_m') }}</span> m²:</div>
          <div class="price">{{ this.formatPrice(apartment.price_m2) }} <div class="currency">{{ $t('euro') }}</div></div>
        </div>
      </div>
    </div>
    <div class="apartment-content">
      <div class="right-info">
        <div class="sidebar">
          <h3>{{ $t('apartment_information') }}</h3>
          <div class="text" v-html="apartment['text_' + $i18n.locale]"></div>
          <mq-layout mq="sm" class="status-mobile">
            <div class="text">{{ $t('status') }}</div>
            <div class="status">
              <div v-if="apartment.status == 2" class="reserved">
                {{ $t('reserved') }}
              </div>
              <div v-if="apartment.status == 3" class="sold">
                {{ $t('sold') }}
              </div>
              <div v-if="apartment.status == 1" class="available">
                {{ $t('available') }}
              </div>
            </div>
          </mq-layout>
          <a v-if="apartment.status !== 3" @click="contactFormActive = !contactFormActive" class="btn">{{ $t('send_request') }}</a>
          <div class="popup" v-bind:class="{ active: contactFormActive }" >
            <div class="close" @click="contactFormActive = false">{{ $t('close') }}</div>
            <contact-form :hasApartment="apartment.id" />
          </div>
          <div class="donwload-pdf" v-if="apartment.pdf">
            <a target="_blank" :href="apartment.pdf" class="btn-pdf">{{ $t('download_pdf') }}</a>
          </div>
          <mq-layout mq="sm" class="buttons">
            <router-link :to="'/' + lang + '/' + this.$route.params.id + '/' + this.$route.params.building + '/' + 'view'" class="btn">{{ $t('back_building') }}</router-link>
            <router-link :to="'/' + lang + '/' + this.$route.params.id + '/' + this.$route.params.building + '/floor/' + this.$route.params.floorId + '/' + this.$route.params.slug" class="btn">{{ $t('back_floor') }}</router-link>
          </mq-layout>
        </div>
      </div>
      <div class="apartment-floorplan">
        <div class="compass">
          <img src="@/assets/images/compass.svg" :style="{ transform: 'rotate(-' + apartment.degrees +'deg)' }" alt="">
        </div>
        <div v-if="apartment.mezonet == 1" class="maisonette-info">
          <swiper :options="swiperOption">
            <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
            <swiper-slide><div class="img-box"><viewer><img :src="apartment.image" alt=""></viewer></div></swiper-slide>
            <swiper-slide><div class="img-box"><viewer><img :src="apartment.image2" alt=""></viewer></div></swiper-slide>
          </swiper>
        </div>
        <div v-else class="img-box">
          <viewer><img :src="apartment.image" alt=""></viewer>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import store from '../store'
import { mapState } from 'vuex'
import ContactForm from '@/components/contactForm/ContactForm'
export default {
  name: 'apartment',
  components: { ContactForm },
  data () {
    let $this = this
    return {
      contactFormActive: false,
      swiperOption: {
        effect: 'fade',
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          renderBullet (index, className) {
            return `<span class="${className} swiper-pagination-bullet-custom"><span class="text">${$this.$t('floor')} ${index + 1}</span></span>`
          }
        }
      }
    }
  },
  metaInfo () {
    return {
      title: this.apartment ? this.apartment['seo_title_' + this.$i18n.locale] : ''
    }
  },
  methods: {
    tooltipContent (apartment) {
      return `<h4>${apartment['title_' + this.$i18n.locale]}</h4><div class="icons"><div><i class="area-icon"></i> ${apartment.total_area} m²</div> <div><i class="rooms-icon"></i>${apartment.rooms}</div></div> <div class="price">${apartment.status !== 1 ? '' : this.formatPrice(apartment.price) + ' EUR'}</div><div class="status">${this.apartmentStatus(apartment.status)}</div>`
    },
    formatPrice (value) {
      let val = (value / 1)
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
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
    apartmentRoute (apartmentSlug) {
      this.$router.push({ name: 'apartment', params: { apartmentSlug } })
    },
    changeRout (event) {
      this.$router.replace({ name: 'building-inner-floor', params: { slug: event.target.value, floorId: 1 } })
    }
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
          store.commit('stopFetching')
        })
      })
    })
  },
  computed: {
    lang () {
      return this.$i18n.locale
    },
    floors () {
      return this.$store.getters.getFloorsByEntrance(this.$route.params.slug)
    },
    apartment () {
      return this.$store.getters.getApartment(this.$route.params.apartmentSlug)
    },
    ...mapState({
      contacts: state => state.pages.contacts,
      buildingEntrances: state => state.buildings.buildingEntrances
    })
  }
}
</script>

<style lang="scss">
.popup {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(#000, .5);
  z-index: -1;
  opacity: 0;
  visibility: hidden;
  overflow: auto;
  transition: all .4s;
  transform: translateX(-100%);
  .close {
    color: #fff;
    font-size: 20px;
    font-weight: 500;
    padding: 30px;
    cursor: pointer;
    position: fixed;
    right: 0;
    top: 0;
  }
  .popup-title {
    font-size: 24px;
    text-align: center;
    color: #fff;
    font-weight: 500;
    margin-top: 3%;
  }
  form {
    margin: 5% 10%;
    background: #fff;
    padding: 5%;
    transform: translateY(150%);
    transition-delay: .3s;
    transition-property: all;
    transition-duration: .3s;
    h3 {
      color: #2c2c2c;
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 10px;
      margin-top: 20px;
      &:first-of-type {
        margin-top: 0;
      }
    }
  }
  &.active {
    z-index: 99999;
    opacity: 1;
    visibility: visible;
    transform: translateX(0);
    form {
      transform: translateY(0);
    }
  }
  @media screen and(max-width: 768px) {
    .popup-title {
      margin-top: 25px;
      margin-bottom: 25px;
    }
    form {
      margin-left: 10px;
      margin-right: 10px;
    }
  }
}
.apartment-info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding-left: 250px;
  padding-right: 250px;
  height: 100%;
  min-height: 100vh;
  .apartment-header {
    width: 100%;
    border-bottom: 1px solid #dfdfdf;
    padding: 30px 0;
    margin-bottom: 50px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .left {
      margin-right: auto;
      .sqm {
        font-weight: 600;
        color: #8d8d8d;
        font-size: 20px;
      }
    }
    .right {
      display: flex;
      margin-left: auto;
      margin-top: auto;
      >div:first-of-type {
        border-right: 1px solid #dfdfdf;
        padding-right: 40px;
        padding-left: 0;
        display: flex;
        flex-direction: column;
      }
      >div {
        padding-left: 40px;
      }
      .text {
        color: #8d8d8d;
        font-family: "Fira Sans";
        font-size: 10px;
        span {
          font-weight: 500;
          text-transform: uppercase;
        }
      }
      .price {
        color: #000;
        font-size: 24px;
        font-weight: 600;
        &.sold {
          color: #e22f2f;
          margin-top: 10px;
        }
        .currency {
          font-weight: 300;
          position: relative;
          display: inline-block;
          &.drop-arrow {
            &:after {
              content: '';
              width: 0;
              height: 0;
              border-style: solid;
              border-width: 6px 4px 0 4px;
              border-color: #fa6902 transparent transparent transparent;
              margin-top: 12px;
              margin-left: 10px;
              float: right;
              display: inline-block;
              transition: all .3s;
            }
          }
          &:hover {
            .dropdown {
              visibility: visible;
              opacity: 1;
            }
            &.drop-arrow:after {
              transform: rotate(90deg);
            }
          }
          .dropdown {
            position: absolute;
            left: 0;
            top: 100%;
            visibility: hidden;
            opacity: 0;
            transition: all .3s;
          }
        }
      }
    }
  }
  .apartment-content {
    display: flex;
    justify-content: space-around;
    flex-direction: row-reverse;
    flex-wrap: wrap;
    align-items: stretch;
    margin-bottom: auto;
    margin-bottom: 20px;
    width: 100%;
    .apartment-floorplan {
      width: 70%;
      position: relative;
      .img-box {
        padding: 70px 0 20px 0;
        background-color: #f8f8f8;
        max-width: 700px;
        margin: 0 auto;
        img {
          cursor: pointer;
        }
      }
      .compass {
        position: absolute;
        right: 0;
        top: 0;
        z-index: 999;
        img {
          max-width: 60px;
        }
      }
      .swiper-slide {
        opacity: 0 !important;
        &.swiper-slide-active {
          opacity: 1 !important;
        }
      }
      .swiper-container {
        display: flex;
        flex-direction: column-reverse;
      }
      .swiper-pagination {
        position: relative;
        text-align: left;
        left: inherit;
        bottom: inherit;
        display: flex;
        .swiper-pagination-bullet {
          width: auto;
          height: auto;
          border-radius: 0;
          background: transparent;
          opacity: 1;
          font-family: 'Montserrat', sans-serif;
          text-decoration: none;
          padding: 0 10px;
          margin: 0 0;
          outline: none;
          .text {
            font-size: 14px;
            color: #8d8d8d;
            font-weight: 600;
            display: inline-block;
            list-style: none;
            padding: 3px 10px;
            border-bottom: 2px solid transparent;
          }
          &:first-child {
          }
          &+.swiper-pagination-bullet {
            border-left: 1px solid #e1e1e1;
          }
          &.swiper-pagination-bullet-active {
            background: transparent;
            .text {
              color: #111;
              border-bottom: 2px solid #fa6902;
            }
          }
        }
      }
      img,
      svg {
        max-width: 100%;
      }
    }
    .right-info {
      width: 30%;
    }
    .sidebar {
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      padding-left: 40px;
      min-width: 270px;
      counter-reset: counter;
      p {
        font-family: "Fira Sans";
        font-weight: 500;
        font-size: 14px;
      }
      ol,
      ul {
        padding: 0;
        margin: 15px 0;
        li {
          color: #4a4a4a;
          font-family: "Fira Sans";
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 4px;
          list-style: none;
          display: flex;
          align-items: center;
          &:nth-child(even) {
            background: #f2f2f2;
          }
          &:before {
            counter-increment: counter;
            content: counters(counter,". 0");
            width: 36px;
            height: 36px;
            line-height: 36px;
            color: #fff;
            background-color: #fa6a02;
            text-align: center;
            margin-right: 9px;
            display: inline-block;
          }
          &:after {
            content: 'm²';
            margin-left: 5px;
          }
          span,strong, b {
            margin-left: auto;
          }
        }
      }
      .btn {
        color: #000;
        border-color: #fa6a02;
        padding: 20px;
        display: inline-block;
        margin-right: auto;
        margin-bottom: 20px;
        width: auto;
        min-width: 220px;
        text-align: center;
        transition: all .3s;
        cursor: pointer;
        box-sizing: border-box;
        text-decoration: none;
        &:hover {
          color: #fff;
          background: #fa6a02;
        }
        &:after,
        &:before {
          display: none;
        }
      }
      .donwload-pdf {
        .btn-pdf {
          color: #000;
          font-family: "Fira Sans";
          font-size: 13px;
          font-weight: 400;
          line-height: 17px;
          text-decoration: none;
          display: flex;
          align-items: center;
          &:before {
            content: '';
            width: 54px;
            height: 53px;
            background-color: #eee;
            background-image: url(~@/assets/images/arrow-pdf.svg);
            background-position: center center;
            background-repeat: no-repeat;
            display: inline-block;
            margin-right: 18px;
            border: 1px solid transparent;
            transition: all .3s;
          }
          &:hover {
            text-decoration: underline;
            &:before {
              background-position: center 16px;
              border-color: #fa6a02;
            }
          }
        }
      }
    }
  }
  @media screen and(max-width: 1366px){
    .apartment-content {
      .right-info,
      .apartment-floorplan {
        width: 50%;
      }
    }
  }
  @media screen and(max-width: 1024px) {
    .apartment-content {
      flex-direction: column-reverse;
      .apartment-floorplan,
      .right-info {
        width: 100%;
        .sidebar {
          padding-top: 20px;
          padding-left: 0;
        }
      }
    }
  }
  @media screen and(max-width: 768px) {
    padding: 0 25px;
    .apartment-header {
      flex-direction: column;
      padding: 0;
      margin: 0 0 30px 0;
      .left {
        margin: 0 0 30px 0;
        width: 100%;
        .sqm {
          color: #2c2c2c;
          font-size: 14px;
          font-weight: 700;
          line-height: 25px;
        }
      }
      .right {
        margin: 0 0 20px 0;
        >div {
          padding: 0;
        }
        >div:last-of-type {
          padding-left: 24px;
        }
        .price {
          color: #000;
          font-size: 20px;
          font-weight: 600;
        }
      }
      .title {
        h1 {
          color: #2c2c2c;
          font-size: 20px;
          font-weight: 700;
          line-height: 25px;
        }
      }
    }
    .apartment-content {
      flex-direction: column-reverse;
      .sidebar {
        margin-top: 40px;
        padding-left: 0;
        min-width: inherit;
        h3 {
          color: #2c2c2c;
          font-size: 17px;
          font-weight: 700;
          line-height: 24px;
          margin-bottom: 20px;
        }
        ul {
          margin-bottom: 20px;
        }
        .btn {
          width: 100%;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          box-sizing: border-box;
          padding: 25px 20px;
          margin: 30px 0;
        }
        .status-mobile {
          .text {
            color: #8d8d8d;
            font-family: "Fira Sans";
            font-size: 11px;
            font-weight: 500;
            text-transform: uppercase;
            margin-bottom: 5px;
          }
          .status {
            color: #22a314;
            font-size: 17px;
            font-weight: 600;
            text-transform: none;
          }
        }
        .buttons {
          border-top: 1px solid rgba(#979797, .37);
          margin-top: 30px;
          padding: 30px 0;
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          .btn {
            width: 100%;
            background-color: #eee;
            border-color: #eee;
            color: #000;
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            text-decoration: none;
            margin: 10px 0;
          }
        }
      }
    }
  }
}
.apartment-inner {
  .status {
    color: #8d8d8d;
    font-family: "Fira Sans";
    font-size: 11px;
    font-weight: 500;
    text-transform: uppercase;
    .sold, .available, .unavailable {
      font-size: 20px;
      font-weight: 600;
    }
    .available {
      color: #22a314;
    }
    .unavailable {
      color: red;
    }
  }
  @media screen and (max-width: 768px ) {
    margin-top: 90px;
  }
}
.left-sidebar {
  width: 195px;
  border-right: 1px solid #e4e4e4;
  background: #f8f8f8;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding-left: 25px;
  padding-right: 25px;
  box-sizing: border-box;
  padding-bottom: 20px;
  padding-top: 20px;
  .router-link-active {
    margin: 0px auto 10px auto;
    display: block;
    text-align: center;
  }
  .back-btn {
    color: #000;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    text-decoration: none;
    background-color: #eeeeee;
    display: block;
    padding: 20px 10px;
    text-align: left;
    cursor: pointer;
    margin-top: 10px;
    &:before {
      content: '';
      width: 19px;
      height: 12px;
      background: url(~@/assets/images/back-arrow-gray.svg) no-repeat center;
      display: inline-block;
      transform: rotate(90deg);
    }
  }
  .floor-plan {
    margin-top: auto;
    margin: auto -25px 0 -25px;
    .text {
      padding-left: 25px;
      color: #8d8d8d;
      font-family: "Fira Sans";
      font-size: 11px;
      font-weight: 500;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
    .svg-box {
      width: 100%;
      position: relative;
      img {
        max-width: 100%;
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
      img {
        display: block;
      }
      g.active path {
        opacity: .7;
      }
    }
  }
  .available-from {
    text-align: left;
    width: 100%;
    margin: auto;
    .sold {
      color: #e22f2f;
    }
    .reserved {
      color: #fa6a02;
    }
    .available {
      color: #22a314;
    }
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
      box-shadow: none;
      background-color: #fff;
      background-image: url(~@/assets/images/down-arrow.svg);
      background-repeat: no-repeat;
      background-position: 96% center;
      background-size: 13px 13px;
      appearance: none;
      border-radius: 0;
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
</style>
