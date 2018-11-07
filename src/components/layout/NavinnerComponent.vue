<template>
  <headroom>
    <nav class="nav-inner">
      <mq-layout mq="md+"><router-link :to="'/' + lang" class="inner-logo"><img src="@/assets/images/logo-inner.svg" class="logo" alt=""></router-link></mq-layout>
      <div class="header-title"><h1 class="title">{{ navTitle }}</h1></div>
      <mq-layout mq="md+" class="mr-auto">
        <inner-building-nav v-if="navigation === 'buildingNav'" />
        <inner-about-nav v-if="navigation === 'aboutNav'" />
        <inner-news-nav v-if="navigation === 'newsNav'" />
        <inner-news-breadcrumbs v-if="navigation === 'newsBreadcrumbs'" />
      </mq-layout>
      <div class="btn-box" v-if="this.$route.name === 'building-inner-component' && buildingSvg"><a @click="viewScheme" class="btn">{{ $t('views_scheme') }}</a></div>
      <div class="back-btn" @click="routeBack">{{ $t('back') }}</div>
      <div class="scroll-top" @click="scrollTop"></div>
    </nav>
  </headroom>
</template>

<script>
import { headroom } from 'vue-headroom'
import InnerBuildingNav from '@/components/navigations/InnerBuildingNav'
import InnerAboutNav from '@/components/navigations/InnerAboutNav'
import InnerNewsNav from '@/components/navigations/InnerNewsNav'
import InnerNewsBreadcrumbs from '@/components/navigations/InnerNewsBreadcrumbs.vue'
export default {
  name: 'navinner-component',
  props: [
    'navigation',
    'navTitle',
    'buildingSvg'
  ],
  components: {
    'headroom': headroom,
    'inner-building-nav': InnerBuildingNav,
    'inner-news-nav': InnerNewsNav,
    'inner-news-breadcrumbs': InnerNewsBreadcrumbs,
    'inner-about-nav': InnerAboutNav
  },
  computed: {
    lang () {
      return this.$i18n.locale
    }
  },
  methods: {
    viewScheme () {
      this.$router.push({ name: 'building-view' })
    },
    routeBack () {
      if (window.fakeRouter) {
        this.$router.go(-1)
      }
    },
    scrollTop () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  },
  mounted () {
    console.log(this.$route.name)
    let anchorlinks = document.querySelectorAll('a[href^="#"]')
    for (let item of anchorlinks) {
      item.addEventListener('click', (e) => {
        let hashval = item.getAttribute('href')
        let target = document.querySelector(hashval)
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
        history.pushState(null, null, hashval)
        e.preventDefault()
      })
    }
  }
}
</script>

<style lang="scss">
.scroll-top {
  display: none;
}
.nav-inner {
  padding-right: 195px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .inner-logo {
    transition: all .3s;
    img {
      max-width: 100px;
    }
  }
  .logo {
    margin: 30px 0 0 40px;
    transition: all .3s;
  }
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  .header-title {
    margin-left: 80px;
    .title {
      color: #fff;
      font-family: 'Exo 2', sans-serif;
      font-size: 24px;
      font-weight: 600;
      text-transform: uppercase;
    }
  }
  .back-btn {
    color: #8d8d8d;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    background-image: url(~@/assets/images/back-arrow.svg);
    background-repeat: no-repeat;
    background-position: 7px center;
    display: inline-block;
    text-decoration: none;
    padding: 10px 10px 10px 20px;
    transition: all .4s;
    margin-left: auto;
    margin-right: 80px;
    cursor: pointer;
    &:hover {
      background-position: 0 center;
    }
  }
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0 auto 0 140px;
    li {
      list-style: none;
      position: relative;
      a {
        color: #fff;
        font-size: 12px;
        font-weight: 500;
        text-transform: uppercase;
        text-decoration: none;
        padding: 15px;
        display: block;
      }
      ul {
        position: absolute;
        top:-100%;
        left: 0;
        background: #fff;
        display: block;
        padding: 0;
        margin: 0;
        min-width: 220px;
        visibility: hidden;
        opacity: 0;
        transition: all .3s;
        li {
          margin: 0;
          a {
            color: #000;
            padding: 10px;
          }
        }
      }//ul
      &:hover {
        ul {
          top: 100%;
          visibility: visible;
          opacity: 1;
        }
      }
    }//li
  }//ul
  .btn-box {
    display: none;
    .btn {
      transition: all .2s;
    }
  }
  @media screen and(max-width: 1366px) {
    .header-title {
      margin-left: 40px;
    }
    ul {
      margin: 0 auto 0 80px;
    }
  }
}
.headroom--not-top {
  background-color: #232323;
  .inner-logo {
    margin-left: -140px;
    .logo {
      margin: 0;
    }
  }
  .back-btn {
    display: none;
  }
  .scroll-top {
    display: block;
    margin-right: 20px;
    color: #fff;
    cursor: pointer;
    background: url(~@/assets/images/arrow-top.svg) no-repeat center;
    width: 50px;
    height: 50px;
  }
  .nav-inner {
    .btn-box {
      display: block;
      padding: 0 0 0 20px;
      margin: 0;
      a {
        font-size: 11px;
        font-weight: 500;
        text-transform: uppercase;
        background-color: #fa6a02;
        border-color: #fa6a02;
        padding: 20px 15px;
        cursor: pointer;
        &:after,
        &:before {
          display: none;
        }
      }
    }
  }
}
.headroom--unpinned,
.headroom--not-top {
  transform: translate3d(0px, 0, 0px) !important;
}
@media screen and(max-width: 768px) {
  .headroom {
    position: relative !important;
    transform: translate3d(0px, 0px, 0px) !important;
    top: inherit !important;
    left: inherit !important;
    right: inherit !important;
    margin-bottom: 20px;
    .nav-inner {
      padding-right: 0;
      .header-title {
        margin-left: 0;
      }
      .back-btn {
        margin-right: 0;
      }
    }
  }
  .headroom--not-top .scroll-top {
    display: none;
  }
}
</style>
