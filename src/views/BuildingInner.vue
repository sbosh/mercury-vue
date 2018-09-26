<template>
  <div class="main-content" v-if="building">
    <mq-layout mq="md+"><navinner-component navigation="buildingNav" :navTitle="building['title_' + $i18n.locale]" /></mq-layout>
    <div class="inner-building">
      <div class="inner-building-header">
        <mq-layout mq="sm"><h1 class="page-title">{{ building['title_' + $i18n.locale] }}</h1></mq-layout>
        <div class="main-img"><img :src="building.image" alt=""></div>
        <div v-if="building.status == 1" class="btn-box"><router-link :to="'/' + lang + '/building-view/' + building['slug_' + $i18n.locale]" class="btn">ВИЖ СХЕМАТА на блока</router-link></div>
      </div>
      <div class="caption" id="about">
        <div class="title-box">
          <h2 class="title">За <br> сградата</h2>
        </div>
        <div class="text" v-html="building['text_' + $i18n.locale]"></div>
      </div>
      <div class="about-complex">
        <div class="box-row">
          <div class="box">
            <div class="title">Име на комплекса</div>
            <div class="text">{{ building['title_' + $i18n.locale] }}</div>
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
      <div class="gallery-building" id="gallery">
        <swiper :options="swiperOption">
          <swiper-slide><img src="@/assets/images/gallery01.jpg" alt=""><div class="progress-bar"></div></swiper-slide>
          <swiper-slide><img src="@/assets/images/gallery02.jpg" alt=""><div class="progress-bar"></div></swiper-slide>
          <swiper-slide><img src="@/assets/images/gallery01.jpg" alt=""><div class="progress-bar"></div></swiper-slide>
        </swiper>
      </div>
      <div class="location" id="location">
        <div class="caption">
          <div class="title-box">
            <h2 class="title">За<br> локацията</h2>
          </div>
        </div>
        <div class="box-row">
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
      </div>
      <div class="map">
        <div class="img-box">
          <a href="" class="btn">бул. „Александър Малинов“ <span>ЗАВЕДИ МЕ НА АДРЕСА</span></a>
          <img src="@/assets/images/map.jpg" alt="">
          <div class="btn-box"><a href="" class="btn">Виж картата</a></div>
        </div>
      </div>
      <div class="news-inner" id="news">
        <div class="title">Новини</div>
        <div class="news-swiper">
          <news-listing-swiper :articles="articles" />
        </div>
      </div>
      <div class="next-building">
        <div class="text">Следваща сграда</div>
        <h2 class="title"><a href="">Комплекс Меркурий Плаза</a></h2>
        <div class="img-box"><a href=""><img src="@/assets/images/next-building.jpg" alt=""></a></div>
      </div>
    </div>
    <footer-component />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NavinnerComponent from '@/components/layout/NavinnerComponent'
import NewsListingSwiper from '@/components/news/NewsListingSwiper'
import FooterComponent from '@/components/layout/FooterComponent.vue'
export default {
  name: 'building-inner',
  components: {
    'navinner-component': NavinnerComponent,
    'news-listing-swiper': NewsListingSwiper,
    'footer-component': FooterComponent
  },
  data () {
    return {
      title: 'Комплекс Бижу',
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
  },
  computed: {
    lang () {
      return this.$i18n.locale
    },
    ...mapState({
      articles: state => state.articles.all
    }),
    building () {
      return this.$store.getters.getBuilding(this.$route.params.building)
    }
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
    font-weight: 700;
    text-transform: uppercase;
  }
  .title,
  .title a {
    color: #2c2c2c;
    font-family: "Exo 2";
    font-size: 50px;
    font-weight: 700;
    text-transform: uppercase;
    text-decoration: none;
  }
  .img-box {
    display: flex;
    justify-content: flex-end;
    margin-top: 55px;

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
  .title {
    color: #fff;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 80px;
  }
  @media screen and(max-width: 767px) {
    padding: 25px;
    .title {
      margin-bottom: 40px;
      color: #fff;
      font-size: 15px;
      font-weight: 700;
    }
  }
}
.map {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 100px;
  .img-box {
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
      &:before {
        content: '';
        width: 17px;
        height: 22px;
        float: left;
        margin: 0 10px 0 0;
        border: none;
        background: url('~@/assets/images/location-pin.svg') no-repeat center;
      }
      span {
        float: right;
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
    .img-box {
      > .btn {
        font-size: 12px;
        &:before {
          margin-top: -2px;
        }
        span {
          margin-top: 25px;
          display: block;
          float: none;
          color: #8d8d8d;
          font-size: 10px;
          font-weight: 700;
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
}//map
.location {
  padding-top: 100px;
  padding-bottom: 100px;
  .caption {
    margin-bottom: 100px;
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
  }
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
        .info {
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
  @media screen and(max-width: 768px) {
    .swiper-container {
      padding-right: 60px;
    }
    .swiper-slide {
      width: 100%;
      .progress-bar {
        right: 25px;
        bottom: 25px;
        left: 25px;
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
    align-items: stretch;
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
          font-weight: 700;
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
    p {
      column-count: 2;
      max-width: 800px;
      margin: 60px auto 10px auto;
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
  .btn-box {
    margin-top: -40px;
    float: right;
    .btn {
      background-color: #fa6a02;
      border-color: #fa6a02;
      margin-right: 90px;
    }
  }
  .main-img img {
    max-width: 100%;
    display: block;
  }
  @media screen and(max-width: 768px) {
    padding: 0 0 0 25px;
    margin-bottom: 40px;
    .page-title {
      padding: 90px 0 30px 0;
      color: #fff;
      font-family: "Exo 2";
      font-size: 18px;
      font-weight: 700;
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
    padding: 0;
    .caption {
      .title-box {
        padding-left: 40px;
        .title {
          color: #2c2c2c;
          font-size: 20px;
          font-weight: 700;
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
          font-size: 13px;
          font-weight: 400;
          line-height: 23px;
          margin: 0;
        }
      }
    }
  }
}
</style>
