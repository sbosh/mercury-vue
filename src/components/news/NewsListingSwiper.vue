<template>
  <div class="news-swiper">
    <swiper ref="newsListingSwiper" :options="swiperOption">
      <swiper-slide v-for="article in articles" :key="article.id" >
        <news-listing-item
          :id="article.id"
          :title="article['title_' + $i18n.locale]"
          :description="article['annonce_' + $i18n.locale]"
          :image="article.image"
          :link="article['slug_' + $i18n.locale]"
          :date="article.date" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import NewsListingItem from './NewsListingItem'
export default {
  name: 'news-listing-swiper',
  components: {
    'news-listing-item': NewsListingItem
  },
  props: ['articles'],
  data () {
    return {
      swiperOption: {
        speed: 500,
        slidesPerView: 2,
        spaceBetween: 100,
        watchSlidesVisibility: true,
        init: false,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        breakpoints: {
          1280: {
            slidesPerView: 2,
            spaceBetween: 40
          },
          992: {
            slidesPerView: 1,
            spaceBetween: 0
          }
        }
      }
    }
  },
  mounted () {
    this.$refs.newsListingSwiper.swiper.init()
    this.$refs.newsListingSwiper.swiper.update()
  }
}
</script>

<style lang="scss">
.news-swiper {
  position: relative;
  .swiper-container {
    padding-bottom: 70px;
  }
  .swiper-pagination {
    text-align: left;
    .swiper-pagination-bullet {
      opacity: 1;
      padding: 10px 0;
      border-radius: 0;
      width: auto;
      height: auto;
      background-color: transparent;
      &:before {
        content: '';
        width: 30px;
        height: 4px;
        display: block;
        background-color: rgba(35, 35, 35, 0.5);
      }
    }
    .swiper-pagination-bullet-active {
      &:before {
        background-color: rgb(35, 35, 35);
      }
    }
  }
}
.swiper-slide-visible {
  .news-article {
    .img-box {
      img,
      &:before {
        transform: translateX(0);
        opacity: 1;
      }
    }
  }
}
.news-article {
  position: relative;
  padding-left: 40px;
  .date {
    position: absolute;
    left: 0;
    top: 0;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    writing-mode: tb-rl;
    transform: rotate(-180deg);
  }
  .img-box {
    margin-bottom: 40px;
    position: relative;
    overflow: hidden;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0, .6);
      transform: translateX(-100%);
      transition: all .6s;
    }
    img {
      max-width: 100%;
      width: 100%;
      height: auto;
      display: block;
      transform: translateX(-150%);
      transition-delay: .2s;
      transition-duration: .6s;
      transition-property: all;
      opacity: 0;
    }
    .category {
      position: absolute;
      right: 0;
      bottom: 0;
      background: #fa6a02;
      padding: 16px 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      max-width: 230px;
      .icon {
        border: 1px solid #fff;
        width: 52px;
        height: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        img {
          max-width: 65%;
          margin: auto;
          display: block;
        }
      }
      .text {
        color: #fff;
        font-size: 14px;
        font-weight: 500;
        line-height: 21px;
      }
    }
  }
  .info-box {
    position: relative;
    padding-left: 50px;
    &:after {
      content: '';
      width: 1px;
      height: 131px;
      background: #979797;
      position: absolute;
      bottom: 100%;
      left: 25px;
      margin-bottom: -30px;
    }
  }
  .article-title a,
  .article-title {
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    line-height: 23px;
    text-decoration: none;
    margin-bottom: 12px;
  }
  p {
    color: #8d8d8d;
    font-family: "Fira Sans";
    font-size: 15px;
    font-weight: 400;
    line-height: 23px;
    margin: 0 0 15px 0;
  }
  .link {
    a {
      color: #8d8d8d;
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      text-decoration: none;
      position: relative;
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
  &.visible {
    .img-box {
      img,
      &:before {
        transform: translateX(0);
        opacity: 1;
      }
    }
  }
  @media screen and(max-width: 768px) {
    padding: 0;
    .date {
      transform: rotate(0);
      writing-mode: inherit;
      z-index: 99;
      background: rgba(0,0,0, .5);
      font-size: 11px;
      padding: 5px 10px;
      color: #fff;
    }
    .info-box {
      padding-left: 25px;
      &:after {
        left: 10px;
      }
    }
    .article-title, .article-title a {
      font-size: 18px;
      line-height: 20px;
    }
    p {
      font-size: 16px;
    }
    .img-box {
      margin-bottom: 10px;
      .category {
        display: none;
      }
    }
  }
}
</style>
