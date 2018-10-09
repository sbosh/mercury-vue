<template>
  <div class="floor-plan">
    <mq-layout mq="md+" class="left-sidebar">
      <div class="top">
        <router-link :to="'/' + lang"><img src="@/assets/images/logo-filter.svg" class="logo" alt=""></router-link>
        <router-link :to="'/' + lang + '/' + this.$route.params.id + '/' + this.$route.params.building + '/' + 'view'" class="back-btn">{{ $t('back_building') }}</router-link>
      </div>
      <div class="available-from">
        <div class="text" v-html="$t('available_apartments')"></div><span>3</span> / <span>7</span>
        <div class="input-group">
          <label for="">{{ $t('selected_block') }}:</label>
          <select name="" id="">
            <option value="Вход А">{{ $t('block') }} А</option>
          </select>
        </div>
      </div>
      <div class="compass"><img src="@/assets/images/compass.svg" alt=""></div>
    </mq-layout>
    <mq-layout mq="sm" class="floor-info-mobile">
      <div class="available-from">
        <div class="input-group">
          <label for="">{{ $t('selected_block') }}:</label>
          <select name="" id="">
            <option value="Вход А">{{ $t('block') }} А</option>
          </select>
        </div>
        <div class="right"><div class="text" v-html="$t('available_apartments')"></div><span>3</span> / <span>7</span></div>
      </div>
    </mq-layout>
    <div class="floor-info">
      <swiper ref="mySwiper" :options="swiperOptions()">
        <swiper-slide v-for="floor in floors" :key="floor.id">
          <div class="img-box">
            <img :src="floor.image" alt="">
          </div>
        </swiper-slide>
      </swiper>
      <div class="swiper-pagination"></div>
    </div>
    <mq-layout mq="sm" class="buttons-mobile">
      <a href="" class="btn">{{ $t('back_building') }}</a>
    </mq-layout>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'building-floor',
  computed: {
    lang () {
      return this.$i18n.locale
    },
    ...mapGetters({
      floors: 'getFloors'
    }),
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted () {
    console.log(Number(this.$route.params.slug) - 1)
    this.swiper.slideTo(Number(this.$route.params.slug) - 1)
    this.swiper.on('slideChange', this.handleSlideChange)
  },
  methods: {
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
    handleSlideChange () {
      this.$router.push({ name: 'building-floor', params: { slug: this.swiper.activeIndex + 1 } })
    }
  }
}
</script>

<style lang="scss">
.floor-info {
  height: 100vh;
  text-align: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
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
    padding: 25px;
    display: block;
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
    .swiper-pagination.swiper-pagination-bullets {
      position: relative;
      right: inherit;
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
