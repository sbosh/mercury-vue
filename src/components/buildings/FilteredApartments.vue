<template>
  <div class="filtered-apartments" v-bind:class="{ active: isFiltred }">
    <div class="left-sidebar">
      <div class="top">
        <router-link :to="'/' + lang"><img src="@/assets/images/logo-filter.svg" class="logo" alt=""></router-link>
        <div class="back-btn" @click="closed">Към сградата</div>
      </div>
      <div class="available-from"><div class="text" v-html="$t('available_apartments')"></div><span>{{ filtrApartments(priceFrom, priceTo, rooms).length }}</span> / <span>{{ count }}</span></div>
      <div class="compass"><img src="@/assets/images/compass.svg" alt=""></div>
    </div>
    <div class="apartments-listing">
      <div class="apartments-box" v-for="apartment in filtrApartments(priceFrom, priceTo, rooms)" :key="apartment.id" :class="[{ sold: apartment.status == 3 },{ reserved: apartment.status == 2 }]">
        <router-link :to="'/' + $i18n.locale + '/' + $route.params.id + '/' + $route.params.building + '/floor/' + apartment.floor_for_filters + '/1/' + apartment['slug_' + $i18n.locale]">
          <img :src="apartment.image" alt="">
        </router-link>
        <div class="info">
          <div class="title"><h3><router-link :to="'/' + $i18n.locale + '/' + $route.params.id + '/' + $route.params.building + '/floor/' + apartment.floor_for_filters + '/1/' + apartment['slug_' + $i18n.locale]">{{ apartment.rooms }}-{{ $t('rooms') }} <br>{{ $t('apartment') }}</router-link></h3></div>
          <div class="sqm">{{ apartment.total_area }} mq<sup>2</sup></div>
          <div class="price">{{ apartment.price }} <span>eur</span></div>
        </div>
      </div>
      <svg class="defs-only">
        <filter id="duotone" color-interpolation-filters="sRGB" x="0" y="0" height="100%" width="100%">
          <feColorMatrix type="matrix" values="1 0 0 0 0 -0.2 1.0 0.3 0.1 0 -0.1 0 1 0 0 0 0 0 1 0 " />
        </filter>
        <filter id="linear">
          <feColorMatrix type="matrix" values="1 -0.2 0 0 0 0 1 0 -0.1 0 0 1.2 1 0.1 0 0 0 1.7 1 0 "/>
        </filter>
      </svg>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'filtered-apartments',
  props: [ 'isFiltred', 'priceFrom', 'priceTo', 'rooms' ],
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
    closed () {
      this.$emit('clicked', false)
    }
  }
}
</script>

<style scoped lang="scss">
.left-sidebar {
  width: 195px;
  border-right: 1px solid #979797;
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
    padding: 20px 15px;
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
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 100px 65px;
    box-sizing: border-box;
    .apartments-box {
      flex: 1 0 50%;
      display: flex;
      padding-bottom: 50px;
      margin-bottom: 40px;
      img {
        max-width: 100%;
      }
      &.sold {
        img {
          filter:  url(#duotone);
        }
        .info {
          opacity: .2;
        }
      }
      &.reserved {
        img {
          filter:  url(#linear);
        }
      }
      &:nth-child(even) {
        padding-top: 50px;
        padding-bottom: 0;
      }
      .info {
        padding: 15px 35px 0 35px;
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
        .price {
          color: #000;
          font-size: 19px;
          font-weight: 600;
          span {
            font-weight: 300;
          }
        }
      }
    }
  }
  &.active {
    transform: translateX(0);
  }
}
</style>
