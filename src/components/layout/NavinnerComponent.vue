<template>
  <nav class="nav-inner">
    <nav>
      <router-link :to="'/' + lang"><img src="@/assets/images/logo-flat.png" class="logo" alt=""></router-link>
      <div class="header-title"><h1 class="title">{{ navTitle }}</h1></div>
      <inner-building-nav v-if="navigation === 'buildingNav'" />
      <inner-news-nav v-if="navigation === 'newsNav'" />
      <inner-news-breadcrumbs v-if="navigation === 'newsBreadcrumbs'" />
      <div class="back-btn" @click="routeBack()">Назад</div>
    </nav>
  </nav>
</template>

<script>
import InnerBuildingNav from '@/components/navigations/InnerBuildingNav'
import InnerNewsNav from '@/components/navigations/InnerNewsNav'
import InnerNewsBreadcrumbs from '@/components/navigations/InnerNewsBreadcrumbs.vue'
export default {
  name: 'navinner-component',
  props: [
    'navigation',
    'navTitle'
  ],
  components: {
    'inner-building-nav': InnerBuildingNav,
    'inner-news-nav': InnerNewsNav,
    'inner-news-breadcrumbs': InnerNewsBreadcrumbs
  },
  computed: {
    lang () {
      return this.$i18n.locale
    }
  },
  methods: {
    routeBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
  .nav-inner {
    position: absolute;
    top: 0;
    left: 0;
    right: 195px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
      margin: 30px 0 0 40px;
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
        font-weight: 700;
        text-transform: uppercase;
      }
    }

    .back-btn {
      color: #8d8d8d;
      font-size: 11px;
      font-weight: 700;
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
          font-weight: 700;
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
  }
</style>
