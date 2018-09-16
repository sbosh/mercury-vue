<template>
  <div class="history-component">
    <div class="caption">
      <div class="title-box">
        <h2 class="title">История</h2>
      </div>
    </div>
    <div class="history-slider">
      <swiper :options="swiperOption">
        <div class="swiper-nav">
          <div class="prev-el"></div>
          <div class="next-el"></div>
        </div>
        <swiper-slide>
          <div class="year">2017</div>
          <div class="img-box"><img src="@/assets/images/story1.jpg" alt=""></div>
          <div class="text">
            <p>В рамките на 3 години Mercury99 пуска в експлоатация 4 нови сгради на територията на град София с общо над 250 реализирани апартаменти в тях. До края на 2017 броят на реализираните апартаменти ще надхвърли 350.</p>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="year">2018</div>
          <div class="img-box"><img src="@/assets/images/story1.jpg" alt=""></div>
          <div class="text">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta voluptates quasi itaque molestias laboriosam id suscipit quisquam enim, aspernatur nulla. Explicabo delectus sapiente nobis deleniti, fuga eos ducimus impedit libero.</p>
          </div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  name: 'history-component',
  data () {
    return {
      swiperOption: {
        speed: 500,
        effect: 'fade',
        slidesPerView: 1,
        watchSlidesVisibility: true,
        pagination: false,
        navigation: {
          nextEl: '.next-el',
          prevEl: '.prev-el'
        }
      }
    }
  },
  mounted () {
    let navHeight = document.getElementsByClassName('year')[0].clientHeight
    let navEl = document.getElementsByClassName('swiper-nav')[0]
    navEl.style.height = `${navHeight}px`
  }
}
</script>

<style lang="scss" scoped>
.history-component {
  padding: 120px 0;
  .history-slider {
    padding: 0 280px 0 115px;
    position: relative;
    .swiper-nav {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      z-index: 999;
      display: flex;
      justify-content: center;
      align-items: center;
      .prev-el,
      .next-el {
        position: absolute;
        height: 100%;
        width: 50%;
        cursor: pointer;
      }
      .prev-el {
        left: 0;
        background: url(~@/assets/images/left-history-icon.svg) no-repeat center;
      }
      .next-el {
        right: 0;
        background: url(~@/assets/images/right-history-icon.svg) no-repeat center;
      }
    }
    .swiper-slide {
      background: #f8f8f8;
    }
    .year {
      color: #fa6a02;
      font-size: 144px;
      font-weight: 400;
      font-weight: 600;
      text-align: center;
      transform: translateY(200px);
      transition-property: all ;
      transition-delay: .3s;
      transition-duration: .5s;
      opacity: 0;
    }
    .img-box {
      img {
        width: 100%;
        transform: translateY(200px);
        transition-property: all ;
        transition-delay: .6s;
        transition-duration: .7s;
        opacity: 0;
      }
    }
    .text {
      padding: 0 90px;
      position: relative;
      transform: translateY(200px);
      transition-property: all ;
      transition-delay: 1s;
      transition-duration: .5s;
      opacity: 0;
      &::before {
        content: '';
        position: absolute;
        left: 60px;
        top: -100px;
        width: 1px;
        height: 131px;
        background: #979797;
      }
      p {
        color: #363636;
        font-family: "Fira Sans";
        font-size: 24px;
        font-weight: 400;
        line-height: 33px;
      }
    }
    .swiper-slide-active {
      .img-box img,
      .year,
      .text {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
  .caption {
    margin-bottom: 100px;
    .title-box {
      .title {
        color: #2c2c2c;
        &:before {
          background-color: #8d8d8d;
        }
        &:after {
          border-color: #fa6a02;
        }
      }
    }
  }
}
</style>
