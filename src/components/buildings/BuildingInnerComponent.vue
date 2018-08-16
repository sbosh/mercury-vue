<template>
<div class="inner-building">
  <navinner-component/>
  <div class="inner-building-header">
    <div class="animate-box">
      <img src="@/assets/images/building01.jpg" class="img" alt="">
    </div>
    <div class="btn-box"><a href="" class="btn">ВИЖ СХЕМАТА на блока</a></div>
  </div>
  <div class="caption">
    <div class="title-box">
      <h2 class="title">За<br> сградата</h2>
    </div>
    <div class="text">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos distinctio rerum explicabo dolore cupiditate laudantium? In illo, veniam fuga nam, amet sunt incidunt excepturi rerum rem et aperiam, error ea.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis architecto voluptatem nihil fugit debitis repellendus, molestiae, perferendis adipisci ex, hic voluptate possimus quasi? Excepturi, consequuntur reiciendis obcaecati neque, veniam nostrum!</p>
    </div>
  </div>
  <div class="about-complex">
    <div class="box-row">
      <div class="box">
        <div class="title">Име на комплекса</div>
        <div class="text">Комплекс бижу</div>
      </div>
      <div class="box">
        <div class="title">Етажи на сградата</div>
        <div class="text">6</div>
      </div>
      <div class="box">
        <div class="title">Брой апартаменти</div>
        <div class="text">87</div>
      </div>
      <div class="box">
        <div class="title">Свободни апартаменти</div>
        <div class="text">32</div>
      </div>
      <div class="box">
        <div class="title">Година на завършване</div>
        <div class="text">2019</div>
      </div>
    </div>
  </div>
  <div class="gallery-building">
    <swiper :options="swiperOption">
      <swiper-slide><img src="@/assets/images/gallery01.jpg" alt=""><div class="progress-bar"></div></swiper-slide>
      <swiper-slide><img src="@/assets/images/gallery01.jpg" alt=""><div class="progress-bar"></div></swiper-slide>
      <swiper-slide><img src="@/assets/images/gallery01.jpg" alt=""><div class="progress-bar"></div></swiper-slide>
    </swiper>
  </div>
  <div class="caption">
    <div class="title-box">
      <h2 class="title">За<br> локацията</h2>
    </div>
  </div>
  <div class="location">
    <div class="box">
      <div class="info">
        <div class="icon"><img src="@/assets/images/location01.png" alt=""></div>
        <div class="text">18 минути от центъра</div>
      </div>
    </div>
    <div class="box">
      <div class="info">
        <div class="icon"><img src="@/assets/images/location02.png" alt=""></div>
        <div class="text">6 супермаркета в близост</div>
      </div>
    </div>
    <div class="box">
      <div class="info">
        <div class="icon"><img src="@/assets/images/location03.png" alt=""></div>
        <div class="text">100 метра от метростанция</div>
      </div>
    </div>
    <div class="box">
      <div class="info">
        <div class="icon"><img src="@/assets/images/location04.png" alt=""></div>
        <div class="text">2 училища в района</div>
      </div>
    </div>
  </div>
  <div class="map">
    <div class="img-box">
      <img src="@/assets/images/map.jpg" alt="">
    </div>
  </div>
</div>
</template>

<script>
import NavinnerComponent from '@/components/layout/NavinnerComponent'
export default {
  name: 'building-inner',
  components: { NavinnerComponent },
  data () {
    return {
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 15,
        speed: 1000,
        loop: true,
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
        }
      }
    }
  },
  mounted () {
    let $this = this
    setTimeout(function () {
      $this.$el.classList.add('active')
    }, 1000)
    let animateBox = document.getElementsByClassName('animate-box')
    window.addEventListener('scroll', function () {
      for (let index = 0; index < animateBox.length; index++) {
        let windowBottom = animateBox[index].getBoundingClientRect().bottom
        if (windowBottom - window.innerHeight <= 0) {
          animateBox[index].classList.add('visible')
        }
      }
    })
  }
}
</script>

<style lang="scss">
.location {
  display: flex;
  justify-content: center;
  align-items: baseline;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 1000px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  .box {
    flex: 1 0 50%;
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
  }
}
.gallery-building {
  .swiper-slide {
    width: auto;
    img {
      display: block;
      max-width: 100%;
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
    .progress-bar {
      visibility: visible;
      opacity: 1;
      transform: translateY(0);
      &:after {
        animation: progress-animation 7s forwards;
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
.about-complex {
  padding: 0 90px;
  margin-top: 100px;
  margin-bottom: 100px;
  .box-row {
    display: flex;
    justify-content: space-around;
    align-items: baseline;
    .box {
      padding: 0 10px;
      border-right: 1px solid #dfdfdf;
      width: 100%;
      &:first-child {
        .text {
          color: #4a4a4a;
          font-family: "Exo 2";
          font-size: 27px;
          font-weight: 700;
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
        font-weight: 700;
      }
    }
  }
}
.caption {
  .text {
    padding-left: 195px;
    p {
      column-count: 2;
      max-width: 800px;
      margin: 0 auto;
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
.animate-box {
  display: block;
  visibility: hidden;
  opacity: 0;
  transition: all .3s;
  transform: translateX(100px);
  img {
    display: block;
  }
  &.visible {
    visibility: visible;
    opacity: 1;
    transform: translateX(0);
  }
}
.inner-building-header {
  transition: all 1.4s;
  background-color: #232323;
  padding: 130px 0 0 195px;
  margin-bottom: 140px;
  .btn-box {
    margin-top: -40px;
    float: right;
    .btn {
      background-color: #fa6a02;
      border-color: #fa6a02;
      margin-right: 90px;
    }
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
}
</style>
