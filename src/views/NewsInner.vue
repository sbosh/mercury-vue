<template>
  <div class="main-content">
    <mq-layout mq="md+" class="black-nav"><navinner-component navigation="newsBreadcrumbs"/></mq-layout>
    <div class="news-inner-article">
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
            <p v-html="article['text_' + $i18n.locale]"></p>
            <div class="follow-us">
              <div class="tex">{{ $t('share_text') }}:</div>
              <social-sharing
                url="window.location.href"
                title="test title"
                description="test description"
                twitter-user="Mercury99"
                inline-template>
                <div>
                  <network network="facebook"><i class="fb"></i></network>
                  <network network="twitter"><i class="tw"></i></network>
                </div>
              </social-sharing>
            </div>
          </div>
        </article>
        <div class="related-news">
          <h3>{{ $t('related_news') }}</h3>
          <div class="news-swiper">
            <news-listing-swiper :articles="swiperArticles.filter(a => a.id !== article.id)" />
          </div>
        </div>
      </div>
    </div>
    <footer-component />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import NavinnerComponent from '@/components/layout/NavinnerComponent'
import NewsListingSwiper from '@/components/news/NewsListingSwiper'
import FooterComponent from '@/components/layout/FooterComponent.vue'
export default {
  name: 'news-inner',
  components: {
    'navinner-component': NavinnerComponent,
    'news-listing-swiper': NewsListingSwiper,
    'footer-component': FooterComponent
  },
  data () {
    return {
      url: window.location.href
    }
  },
  metaInfo () {
    return {
      title: this.article ? this.article['seo_title_' + this.$i18n.locale] : ''
    }
  },
  created () {
    this.$store.commit('startFetching')
    this.$store.dispatch('fetchArticle', this.$route.params.id).then(() => {
      this.$store.dispatch('fetchArticles').then(() => {
        this.$store.commit('stopFetching')
      })
    })
  },
  computed: {
    ...mapGetters({
      swiperArticles: 'getSwiperArticles'
    }),
    ...mapState({
      articles: state => state.articles.all,
      article: state => state.articles.article
    })
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
  .follow-us {
    display: flex;
    margin-top: 50px;
    .text {
      font-family: 'Montserrat';
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
    }
    >div {
      display: flex;
      align-items: center;
      background: #fff;
      padding: 20px;
      span {
        width: 20px;
        height: 20px;
        margin: 5px;
        cursor: pointer;
        margin: 5px 15px;
      }
      .fb {
        display: block;
        width: 20px;
        height: 20px;
        background-image: url('~@/assets/images/facebook-logo.svg');
        background-size: 20px;
        background-repeat: no-repeat;
        background-position: center center;
      }
      .tw {
        display: block;
        width: 20px;
        height: 20px;
        background-image: url('~@/assets/images/twitter-logo.svg');
        background-size: 20px;
        background-repeat: no-repeat;
        background-position: center center;
      }
    }
  }
  .info-box {
    ul li {
      margin-bottom: 8px;
      color: #363636;
      font-size: 17px;
      line-height: 23px;
    }
    ul li,
    p {
      color: #363636;
      font-size: 17px;
      line-height: 23px;
      a {
        color: #000;
      }
    }
    h2, h3 ,h4 ,h5 ,h6 {
      font-family: Montserrat;
      color: #2c2c2c;
      margin: 10px 0 15px 0;
    }
    img {
      max-width: 100%;
      height: auto !important;
      display: block;
      margin: 10px 0;
    }
  }
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
        &:hover {
          color: #fa6902;
        }
      }
    }
    .swiper-pagination {
      .swiper-pagination-bullet {
      }
      .swiper-pagination-bullet-active {
      }
    }
  }
  @media screen and(max-width: 1280px) {
    .news-article {
      padding-right: 20px;
      .info-box {
        padding-right: 20px;
      }
    }
  }
  @media screen and(max-width: 768px) {
    padding: 30px 210px 25px 25px;
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
    .info-box {
      iframe {
        height: 300px !important;
      }
    }
    .news-article {
      padding-right: 0;
      .info-box {
        padding-left: 0;
        padding-right: 0;
        &:after {
          display: none;
        }
        ol, ul {
          padding-left: 20px;
        }
        ol li,
        ul li,
        p {
          color: #383838;
          font-size: 16px;
          font-weight: 400;
          line-height: 28px;
          text-align: justify;
        }
      }
    }
  }
  @media screen and(max-width: 600px) {
    padding: 100px 25px 25px;
  }
}
</style>
