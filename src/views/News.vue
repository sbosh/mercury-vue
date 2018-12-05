<template>
  <div class="main-content" v-if="news">
    <mq-layout mq="md+" class="black-nav"><navinner-component :navTitle="news['title_' + $i18n.locale]" /></mq-layout>
    <mq-layout mq="sm" class="mobile-header"><h1 class="title">{{ $t('news') }}</h1></mq-layout>
    <div class="all-news">
      <div class="container">
        <news-listing :articles="articles" />
      </div>
    </div>
    <footer-component />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NavinnerComponent from '@/components/layout/NavinnerComponent'
import NewsListing from '@/components/news/NewsListing'
import FooterComponent from '@/components/layout/FooterComponent.vue'
export default {
  name: 'news',
  components: {
    'navinner-component': NavinnerComponent,
    'news-listing': NewsListing,
    'footer-component': FooterComponent
  },
  metaInfo () {
    return {
      title: this.news ? this.news['seo_title_' + this.$i18n.locale] : ''
    }
  },
  computed: {
    ...mapState({
      articles: state => state.articles.all,
      news: state => state.pages.news
    })
  },
  mounted () {
    let animateBox = document.getElementsByClassName('animate-box')
    window.addEventListener('scroll', function () {
      for (let index = 0; index < animateBox.length; index++) {
        let windowBottom = animateBox[index].getBoundingClientRect().bottom
        if (windowBottom - window.innerHeight <= 250) {
          animateBox[index].classList.add('visible')
        }
      }
    })
  },
  created () {
    this.$store.dispatch('fetchNewsPage')
    this.$store.dispatch('fetchArticles')
  }
}
</script>

<style lang="scss">
.active-component {
  .all-news {
    .news-listing {
      .news-article:first-of-type {
        .img-box:before,
        .img-box img {
          transform: translateX(0);
          opacity: 1;
        }
      }
    }
  }
}
.all-news {
  position: relative;
  padding-right: 195px;
  padding-top: 200px;
  .caption {
    margin-bottom: 50px;
    .title:after {
      border-color: #fa6902;
    }
  }
  &:before {
    content: '';
    position: absolute;
    z-index: 0;
    left: 0;
    right: 0;
    top: 0;
    height: 450px;
    background-color: #232323;
  }
  .container {
    max-width: 1100px;
    width: 100%;
    margin: 0 auto;
    padding-left: 20px;
    padding-right: 20px;
  }
  .news-article {
    margin-bottom: 70px;
    .img-box {
      &:hover {
        img {
          transform: translateX(0) scale(1.1) !important;
        }
      }
    }
    &:first-child {
      .date {
        color: #fff;
      }
    }
    .date {
      color: #2c2c2c;
    }
    .article-title,
    .article-title a {
      color: #2c2c2c;
      font-weight: 700;
    }
    p {
      font-size: 17px;
    }
  }
  @media screen and(max-width: 768px) {
    padding: 30px 205px 25px 25px;
    &:before {
      height: 250px;
    }
    .container {
      padding: 0;
    }
    .news-article {
      p {
        font-size: 16px;
      }
      .date {
        color: #fff;
      }
    }
  }
  @media screen and(max-width: 600px) {
    padding: 0 25px 25px;
    margin-top: -1px;
    &:before {
      height: 50px;
    }
  }
}
</style>
