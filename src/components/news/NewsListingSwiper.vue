<template>
  <div class="news-swiper">
    <swiper :options="swiperOption">
      <swiper-slide v-for="article in articles" :key="article.id" >
        <news-listing-item
          :title="article.title"
          :description="article.description"
          :image="article.image"
          :link="article.link"
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
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
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
        border-radius: 0;
        width: 30px;
        height: 3px;
        background-color: rgba(255,255,255, .2);
        opacity: 1;
      }
      .swiper-pagination-bullet-active {
        background-color: rgba(255,255,255, 1);
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
        transition: all 1.6s;
      }
      img {
        max-width: 100%;
        width: 100%;
        height: auto;
        display: block;
        transform: translateX(-150%);
        transition-delay: .2s;
        transition-duration: 1.6s;
        transition-property: all;
        opacity: 0;
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
  }
</style>
