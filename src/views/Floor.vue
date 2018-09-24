<template>
  <div class="floor-plan">
    <mq-layout mq="md+" class="left-sidebar">
      <div class="top">
        <router-link :to="'/' + lang"><img src="@/assets/images/logo-filter.svg" class="logo" alt=""></router-link>
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
    </mq-layout>
    <mq-layout mq="sm" class="floor-info-mobile">
      <div class="available-from">
        <div class="input-group">
          <label for="">Избран вход:</label>
          <select name="" id="">
            <option value="Вход А">Вход А</option>
            <option value="Вход А">Вход Б</option>
            <option value="Вход А">Вход В</option>
          </select>
        </div>
        <div class="right"><div class="text">Налични апартаменти</div><span>3</span> / <span>7</span></div>
      </div>
    </mq-layout>
    <div class="floor-info">
      <swiper :options="swiperOptions">
        <swiper-slide v-for="floor in floors" :key="floor.id">
          <div class="img-box"><img :src="floor.image" alt=""></div>
        </swiper-slide>
      </swiper>
      <div class="floor-paggination"></div>
    </div>
    <mq-layout mq="sm" class="buttons-mobile">
      <a href="" class="btn">Към сградата</a>
    </mq-layout>
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
            return `<div class="${className}"><span>${index + 1}<div class="text">етаж</div></span></div>`
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
    padding-right: 100px;
    visibility: hidden;
    opacity: 0;
    transition: all .3s;
    svg {
      width: 100%;
      height: 100%;
    }
    svg polygon:hover {
      opacity: .3;
      fill: #fa6a02;
    }
    img,
    svg {
      max-width: 80vw;
      max-height: 80vh;
      height: auto;
      display: block;
      margin: auto;
    }
  }
  .swiper-slide-active {
    .img-box {
      visibility: visible;
      opacity: 1;
    }
  }
  @media screen and(max-width: 768px) {
    padding: 25px;
    flex-direction: column;
    height: auto;
    .img-box {
      padding-right: 0;
      margin-bottom: 30px;
      img,
      svg {
        max-width: 100%;
        max-height: 100%;
        height: auto;
        display: block;
        margin: auto;
      }
    }
  }
}
.floor-paggination {
  position: absolute;
  bottom: 0;
  right: 100px;
  z-index: 999;
  text-align: center;
  margin: auto !important;
  transform: rotate(90deg) translateX(-50%);
  padding: 30px 0 0 0;
  .swiper-pagination-bullet {
    color: #000;
    font-size: 48px;
    font-weight: 700;
    text-transform: uppercase;
    width: 86px;
    height: 100px;
    line-height: 86px;
    padding: 0;
    margin: 0;
    border-radius: 0;
    background-color: transparent;
    outline: none;
    border: 1px solid transparent;
    oveflow: visible;
    span {
      transform: rotate(-90deg);
      display: block;
      position: absolute;
      left: -7px;
      right: -7px;
      top: 7px;
      bottom: 7px;
      .text {
        position: absolute;
        right: -30px;
        transform: rotate(90deg);
        color: #8d8d8d;
        font-family: "Fira Sans";
        font-size: 11px;
        font-weight: 500;
        text-transform: uppercase;
        opacity: 0;
        transition: all .8s;
      }
    }
    &.swiper-pagination-bullet-active {
      color: #fa6a02;
      border-color: #fa6a02;
      span {
        .text {
          opacity: 1;
          top: 0;
        }
      }
    }
  }
  @media screen and(max-width: 768px) {
    transform: rotate(0) translate(0);
    position: relative;
    bottom: inherit;
    right: inherit;
    margin: inherit !important;
    .swiper-pagination-bullet {
      width: 100px;
      height: 86px;
      span {
        transform: rotate(0);
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        .text {
          transform: rotate(0) translateX(-50%);
          right: inherit;
          left: 50%;
          line-height: 24px;
        }
      }
      &.swiper-pagination-bullet-active {
        span {
          .text {
            top: -30px;
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
  transform: translateX(-195px);
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
    transform: translateX(0);
    .compass {
      animation: rotate-animation 1.3s linear;
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
