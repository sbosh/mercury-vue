<template>
  <div class="floor-plan">
    <div class="left-sidebar">
      <div class="top">
        <router-link :to="'/' + lang"><img src="@/assets/images/logo-filter.png" class="logo" alt=""></router-link>
        <div class="back-btn">Към сградата</div>
      </div>
      <div class="available-from">
        <div class="text">Налични <br>апартаменти</div><span>3</span> / <span>7</span>
        <div class="input-group">
          <label for="">Избран вход:</label>
          <select name="" id="">
            <option value="Вход А">Вход А</option>
            <option value="Вход А">Вход Б</option>
            <option value="Вход А">Вход В</option>
          </select>
        </div>
      </div>
      <div class="compass"><img src="@/assets/images/compass.svg" alt=""></div>
    </div>
    <div class="floor-info">
      <swiper :options="swiperOptions">
        <swiper-slide v-for="floor in floors" :key="floor.id">
          <div class="img-box"><img :src="floor.florplan" alt=""></div>
          <div class="available-apartments" :data-available="floor.available"></div>
          <div class="atfloor-apartments" :data-atfloor="floor.atfloor"></div>
        </swiper-slide>
      </swiper>
      <div class="floor-paggination"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'floor',
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
          el: '.floor-paggination',
          clickable: true,
          dynamicBullets: true,
          renderBullet (index, className) {
            return `<div class="${className}"><span>${index + 1}</span></div>`
          }
        }
      }
    }
  },
  computed: {
    lang () {
      return this.$i18n.locale
    },
    ...mapGetters({
      floors: 'getFloors'
    })
  }
}
</script>

<style lang="scss">
.floor-info {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  position: relative;
  .img-box {
    margin-bottom: 50px;
  }
}
.floor-paggination {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 50px;
  z-index: 999;
  text-align: center;
  margin: auto !important;
  .swiper-pagination-bullet {
    color: #000;
    font-size: 48px;
    font-weight: 700;
    text-transform: uppercase;
    width: 100px;
    height: 86px;
    line-height: 86px;
    padding: 0;
    margin: 0;
    border-radius: 0;
    background-color: transparent;
    outline: none;
    border: 1px solid transparent;
    &.swiper-pagination-bullet-active {
      color: #fa6a02;
      border-color: #fa6a02;
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
  .router-link-active {
    margin: 40px auto;
    display: block;
    text-align: center;
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
</style>
