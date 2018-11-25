<template>
  <div class="filtered-apartments" v-bind:class="{ active: isFiltred }">
    <div class="left-sidebar">
      <div class="top">
        <router-link :to="'/' + lang"><img src="@/assets/images/logo-filter.svg" class="logo" alt=""></router-link>
        <div class="back-btn" @click="closed">{{ $t('back_building') }}</div>
      </div>
      <div class="available-from"><div class="text" v-html="$t('available_apartments')"></div><span>{{ filtrApartments(priceFrom, priceTo, rooms, available).length }}</span> / <span>{{ count }}</span></div>
      <div class="compass">
        <img src="@/assets/images/compass.svg" :style="{ transform: 'rotate(-' + degrees +'deg)' }" alt="">
      </div>
    </div>
    <div class="apartments-listing">
      <div @mouseenter="hoverFilteredApartment(apartment.degrees)" class="apartments-box" v-if="apartment['slug_' + $i18n.locale] !== 'zavedenie'" v-for="apartment in filtrApartments(priceFrom, priceTo, rooms, available)" :key="apartment.id" :class="[{ sold: apartment.status == 3 },{ reserved: apartment.status == 2 }]">
        <router-link :to="'/' + $i18n.locale + '/' + $route.params.id + '/' + $route.params.building + '/floor/' + apartment.floor['slug_' + $i18n.locale] + '/' + apartment.entrance['slug_' + $i18n.locale] + '/' + apartment['slug_' + $i18n.locale]">
          <img :src="apartment.image" alt="">
          <div v-if="apartment.status == 2" class="status reserved">
            {{ $t('reserved') }}
          </div>
          <div v-if="apartment.status == 3" class="status sold">
            {{ $t('sold') }}
          </div>
          <div v-if="apartment.status == 1" class="status available">
            {{ $t('available') }}
          </div>
        </router-link>
        <div class="info">
          <div class="maisonette" v-if="apartment.mezonet === 1">{{ $t('maisonette') }}</div>
          <div class="title"><h3><router-link :to="'/' + $i18n.locale + '/' + $route.params.id + '/' + $route.params.building + '/floor/' + apartment.floor.id + '/' + apartment.entrance['slug_' + $i18n.locale] + '/' + apartment['slug_' + $i18n.locale]">{{ apartment['title_' + $i18n.locale] }}</router-link></h3></div>
          <div class="sqm">{{ apartment.total_area }} mq<sup>2</sup></div>
          <div class="floor-entrance">
            <div class="entrance">{{ apartment.entrance['title_' + $i18n.locale] }}</div>
            <div class="floor">{{ $t('floor') }} {{ apartment.floor['title_' + $i18n.locale] }}</div>
          </div>
          <div class="price" v-if="apartment.status == 2 || apartment.status == 1">
            <div class="text">{{ $t('price') }}:</div>
            {{ apartment.price }} <span>eur</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'filtered-apartments',
  props: [ 'isFiltred', 'priceFrom', 'priceTo', 'rooms', 'available' ],
  data () {
    return {
      degrees: 100
    }
  },
  computed: {
    ...mapGetters({
      filtrApartments: 'getFiltredApartments',
      count: 'getCountApartments'
    }),
    lang () {
      return this.$i18n.locale
    }
  },
  methods: {
    hoverFilteredApartment (apartmentDegrees) {
      this.degrees = apartmentDegrees
    },
    closed () {
      this.$emit('clicked', false)
    }
  }
}
</script>

<style scoped lang="scss">
.left-sidebar {
  width: 195px;
  border-right: 1px solid #e4e4e4;
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
  .router-link-active {
    margin: 0px auto 20px auto;
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
.filtered-apartments {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 9999;
  background-color: #f8f8f8;
  transition: all .7s;
  transform: translateX(100%);
  padding: 0 195px;
  .apartments-listing {
    overflow: auto;
    height: 100vh;
    display: flex;
    align-items: stretch;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 100px 65px;
    box-sizing: border-box;
    .apartments-box {
      flex: 1 0 50%;
      max-width: 50%;
      display: flex;
      margin-bottom: 50px;
      align-items: flex-start;
      transition: all .2s;
      &:hover {
        transform: scale(.97);
      }
      img {
        max-width: 100%;
      }
      >a {
        width: 50%;
        text-decoration: none;
        position: relative;
        .status {
          font-weight: 700;
          font-size: 11px;
          margin-top: 5px;
          text-transform: uppercase;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background: #fff;
          padding: 10px 15px;
          &.sold {
            color: #e22f2f;
          }
          &.reserved {
            color: #fa6a02;
          }
          &.available {
            color: #22a314;
          }
        }
      }
      .info {
        padding: 5px 35px 0 35px;
        width: 50%;
        .title {
          color: #000;
          font-size: 20px;
          font-weight: 600;
          line-height: 25px;
          margin-bottom: 10px;
        }
        .title a {
          text-decoration: none;
          color: #000;
        }
        .sqm {
          color: #8d8d8d;
          font-size: 14px;
          font-weight: 600;
        }
        .maisonette,
        .price {
          color: #000;
          font-size: 19px;
          font-weight: 600;
          margin-top: 5px;
          span {
            font-weight: 300;
          }
          .text {
            display: block;
            font-family: "Fira Sans";
            font-size: 10px;
            text-transform: uppercase;
            color: #bbbbbb;
          }
        }
        .floor-entrance {
          display: flex;
          margin: 10px 0;
          .entrance,
          .floor {
            color: #000;
            font-size: 12px;
            font-weight: 600;
            margin-top: 5px;
            padding: 0 10px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            background: #f1f1f1;
          }
        }
        .maisonette {
          color: #fff;
          background: #fa6a02;
          padding: 10px 15px;
          font-size: 11px;
          text-transform: uppercase;
          display: inline-block;
          margin-bottom: 10px;
        }
      }
    }
  }
  &.active {
    transform: translateX(0);
  }
  @media screen and(max-width: 1366px){
    .apartments-listing {
      .apartments-box {
        .info {
          .title, .title a {
            font-size: 16px;
          }
        }
      }
    }
  }
  @media screen and(max-width: 1280px){
    .apartments-listing {
      padding-left: 30px;
      padding-right: 30px;
    }
  }
  @media screen and(max-width: 1024px){
    .apartments-listing {
      .apartments-box {
        flex: 1 0 100%;
        padding-bottom: 0;
        &:nth-child(even) {
          padding-top: 0;
        }
      }
    }
  }
  @media screen and(max-width: 768px){
    z-index: 99999;
    height: 100vh;
    padding: 0;
    .left-sidebar {
      width: 100%;
      height: 100px;
      padding: 0 25px;
      bottom: inherit;
      right: 0;
      border-right: none;
      flex-direction: row;
      .top {
        >.router-link-active {
          display: none;
        }
      }
      .available-from {
        width: auto;
        margin-left: auto;
      }
      .compass {
        display: none;
      }
    }
    .apartments-listing {
      padding: 100px 25px 25px;
      .apartments-box {
        max-width: 100%;
        flex-direction: column;
        border-bottom: 1px solid #cfcfcf;
        padding-bottom: 15px;
        >a, .info {
          width: 100%;
        }
        .info {
          padding: 0;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-items: center;
          >div {
            flex: 1 0 50%;
            box-sizing: border-box;
            margin: 10px 0 !important;
            &.sqm,&.price {
              text-align: right;
            }
            &.maisonette {
              flex: 1 0 100%;
              text-align: center;
            }
          }
        }
      }
    }
  }
}
</style>
