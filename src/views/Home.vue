<template>
  <div class="main-content">
    <transition name="fade" v-if="loading">
      <preloader-component />
    </transition>
    <div v-else>
      <nav-component />
      <buildings-carousel :home="true" />
      <div class="home-slider">
        <div class="line"></div>
        <div class="caption">
          <div class="title-box">
            <h2 class="title" ><router-link :to="'/' + lang + '/current-buildings'" v-html="$t('home_announce')"></router-link></h2>
          </div>
          <div class="btn-box">
            <router-link :to="'/' + lang + '/current-buildings'" class="btn"><div class="btn-overlay"></div>{{ $t('our_projects') }}</router-link>
          </div>
        </div>
      </div>
    </div>
    <mq-layout mq="md+">
      <div class="news-box" v-for="article in articles" :key="article.id" v-if="article.show_in_homepage == 1">
        <article class="news">
          <h3><router-link :to="'/' + $i18n.locale + '/article/' + article.id + '/' + article['slug_' + $i18n.locale]"><span class="icon"></span>{{ article['title_' + $i18n.locale] }}<span class="text">{{ $t('read_more') }}</span></router-link></h3>
        </article>
      </div>
    </mq-layout>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NavComponent from '@/components/layout/NavComponent'
import BuildingsCarousel from '@/components/buildings/BuildingsCarousel'
import PreloaderComponent from '@/components/preloader/PreloaderComponent'
export default {
  name: 'home',
  components: {
    'nav-component': NavComponent,
    'preloader-component': PreloaderComponent,
    'buildings-carousel': BuildingsCarousel
  },
  metaInfo () {
    return {
      title: this.home ? this.home['seo_title_' + this.$i18n.locale] : ''
    }
  },
  data: function () {
    return {
      homeRoute: null,
      loading: false
    }
  },
  computed: {
    ...mapState({
      home: state => state.pages.home,
      articles: state => state.articles.all
    }),
    lang () {
      return this.$i18n.locale
    }
  },
  created () {
    this.loading = true
    this.$store.cache.dispatch('fetchCurrentBuildings').then(() => {
      this.loading = false
    })
  }
}
</script>

<style lang="scss">
.news-box {
  position: absolute;
  left: 35px;
  right: 50%;
  bottom: 0;
  background: #fff;
  z-index: 9999;
  .news {
    a {
      padding: 32px 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #4a4a4a;
      text-decoration: none;
      font-family: 'Fira Sans', sans-serif;
      font-size: 14px;
      font-weight: 400;
      transition: all .3s;

      .icon {
        width: 31px;
        height: 26px;
        display: inline-block;
        background: url(../assets/images/news-icon.svg) no-repeat center;
        float: left;
        margin-right: 15px;
      }

      .text {
        color: #8d8d8d;
        font-family: Montserrat;
        font-size: 10px;
        height: 40px;
        line-height: 40px;
        font-weight: 700;
        text-transform: uppercase;
        border-left: 1px solid #dfdfdf;
        padding-left: 18px;
        margin-left: auto;
        display: block;

        &:before {
          content: '';
          display: inline-block;
          float: right;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 4px 0 4px 5px;
          border-color: transparent transparent transparent #fa6a02;
          margin-top: 14px;
          margin-left: 10px;
          transition: all .3s;
        }
      }
      &:hover {
        background: #f7f7f7;
      }
    }
  }
}
.line {
  background-color: rgba(#979797, .37);
  width: 1px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-100%, -100%);
  transition: all 1.8s;
  @media screen and(max-width: 768px) {
    display: none;
  }
}
.active-component {
  .line {
    transform: translate(-100%, 0);
  }
}
@media screen and(max-width: 768px){
  .home-slider {
    .caption {
      .title-box {
        padding-left: 20px;
        .title {
          font-size: 26px;
          line-height: 34px;
        }
      }
      .btn-box {
        margin-left: 20px;
      }
    }
  }
}
</style>
