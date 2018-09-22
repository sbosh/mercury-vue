<template>
  <div class="main-content">
    <div class="news-inner-article">
      <navinner-component navigation="newsBreadcrumbs"/>
      <div class="container" v-if="article">
        <div class="caption">
          <div class="box-title">
            <h2 class="title">{{ article['title_' + $i18n.locale] }}</h2>
          </div>
        </div>
        <article class="news-article news-article-content animate-box">
          <div class="date">{{ article.date }}</div>
          <div class="img-box">
            <img :src="article.image" alt="">
          </div>
          <div class="info-box">
            <p v-html="article['annonce_' + $i18n.locale]"></p>
          </div>
        </article>
        <div class="related-news">
          <h3>Свързани новини</h3>
          <div class="news-swiper">
            <news-listing-swiper :articles="articles" />
          </div>
        </div>
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
  name: 'article-inner',
  components: {
    'navinner-component': NavinnerComponent,
    'news-listing-swiper': NewsListingSwiper,
    'footer-component': FooterComponent
  },
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
  computed: {
    ...mapState({
      articles: state => state.articles.all
    }),
    article: function () {
      return this.$store.getters.getArticle(Number(this.$route.params.id), this.$route.params.slug)
    }
  }
}
</script>

<style lang="scss">
.active-component {
  .news-article-content {
    .img-box img,
    .img-box:before{
      transform: translate(0);
      opacity: 1;
      visibility: visible;
    }
  }
}
.news-inner-article {
  padding-top: 190px;
  position: relative;
  padding-right: 195px;
  .nav-inner .header-title {
    margin: 0;
  }
  .container {
    max-width: 1100px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding-left: 20px;
    padding-right: 20px;
  }
  &:before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 591px;
    background-color: #232323;
  }
  .news-article {
    margin-bottom: 100px;
  }
  .caption {
    margin-bottom: 60px;
    padding-left: 50px;
    .title-box {
      .title {
        color: #fff;
        font-size: 42px;
        font-weight: 700;
        line-height: 57px;
        &:before {
          height: 1px;
        }
        &:after {
          border-color: fa6a02;
        }
      }
    }
  }
  .related-news {
    margin-bottom: 100px;
    h3 {
      color: #2c2c2c;
      font-size: 26px;
      font-weight: 700;
      line-height: 57px;
      margin-bottom: 30px;
    }
    .news-article {
      margin-bottom: 0;
      .date {
        color: #2c2c2c;
      }
      .img-box {
        margin-bottom: 30px;
      }
      .article-title a,
      .article-title {
        color: #2c2c2c;
        line-height: 26px;
        margin-bottom: 10px;
      }
    }
    .swiper-pagination {
      .swiper-pagination-bullet {
        background-color: rgba(#232323, .5);
      }
      .swiper-pagination-bullet-active {
        background-color: rgba(#232323, 1);
      }
    }
  }
  @media screen and(max-width: 768px) {
    padding: 90px 25px 25px;
    &:before {
      height: 250px;
    }
    .caption {
      padding: 0;
      margin-bottom: 25px;
      .title {
        font-size: 24px;
        line-height: 26px;
      }
    }
    .container {
      padding: 0;
    }
    .headroom .nav-inner .back-btn {
      display: none;
    }
    .related-news {
      .news-article {
        .date {
          color: #fff;
        }
      }
    }
  }
}
</style>
