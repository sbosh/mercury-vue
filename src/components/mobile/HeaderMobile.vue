<template>
  <header :class="[{ active: isActive }, { white: $route.name === 'building-inner-floor' || $route.name === 'apartment' }]" class="header-mobile">
    <router-link tag="a" :to="'/' + lang" class="main-nav-logo">
      <img src="@/assets/images/mercury-logo-mobile.svg" class="svg" alt="">
    </router-link>
    <ul class="lng">
      <li v-if="lang === 'bg'" ><a href="#!" @click="changeLang('en', $event)">en</a></li>
      <li v-else><a href="#!" @click="changeLang('bg', $event)">bg</a></li>
    </ul>
    <button class="toggle-header"
      @click="isActive = !isActive"
      v-bind:class="{ active: isActive }">
      <div class="button">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </button>
    <div class="tel">
      <a :href="$t('tel_href')" class="tel-box"><img src="@/assets/images/phone-icon.svg" class="svg" alt=""></a>
    </div>
    <nav class="main-nav">
      <div class="main-navigation">
        <div class="content">
          <div class="cols">
            <div class="col">
            </div>
            <div class="col">
              <h3 class="margin-bottom-0"><router-link :to="'/' + lang + '/current-buildings'">{{ $t('current_projects') }}</router-link></h3>
              <ul>
                <li v-for="building in current" :key="building.id">
                  <router-link v-if="building.status == 1 && building.use_svg == 1" :to="'/' + lang + '/' + building.id + '/' + building['slug_' + $i18n.locale] + '/view'">{{ building['title_' + $i18n.locale] }}</router-link>
                  <router-link v-else :to="'/' + lang + '/' + building.id + '/' + building['slug_' + $i18n.locale]">{{ building['title_' + $i18n.locale] }}</router-link>
                </li>
              </ul>
              <h3><router-link :to="'/' + lang + '/finished-buildings'">{{ $t('completed_projects') }}</router-link></h3>
              <h3><router-link :to="'/' + lang + '/future-buildings'">{{ $t('future_projects') }}</router-link></h3>
              <h3><a href="http://mercury99.com/" target="_blank">{{ $t('vacant_property') }}</a></h3>
              <h3><router-link :to="'/' + lang + '/news'">{{ $t('news') }}</router-link></h3>
            </div>
            <div class="col">
              <h3><router-link :to="'/' + lang + '/contacts'">{{ $t('contacts') }}</router-link></h3>
              <h3 class="margin-bottom-0"><router-link :to="'/' + lang + '/about'">{{ $t('about_company') }}</router-link></h3>
              <div class="follow-us">
                <div class="text">{{ $t('follow_us') }}</div>
                <ul>
                  <li><a href="https://www.facebook.com/Mercury99Ltd/" target="_blank"><img src="@/assets/images/fb-icon.svg" class="svg" alt=""></a></li>
                  <!-- <li><a href=""><img src="@/assets/images/yt-icon.svg" class="svg" alt=""></a></li>
                  <li><a href=""><img src="@/assets/images/ln-icon.svg" class="svg" alt=""></a></li> -->
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import { loadLanguageAsync } from '@/setup/i18n'
import axios from 'axios'
export default {
  name: 'header-mobile',
  data: function () {
    return {
      isActive: false
    }
  },
  computed: {
    lang () {
      return this.$i18n.locale
    },
    ...mapState({
      current: state => state.buildings.current
    })
  },
  created () {
    this.$store.cache.dispatch('fetchCurrentBuildings')
  },
  mounted () {
    this.convertSVG()
  },
  watch: {
    '$route' (to, from) {
      this.isActive = false
      if (to.name === 'home' || to.name === 'current-buildings') {
        this.$el.querySelector('.main-nav').classList.add('home-header')
      } else {
        this.$el.querySelector('.main-nav').classList.remove('home-header')
      }
    }
  },
  methods: {
    changeLang (lang, event) {
      event.preventDefault()
      let $this = this
      loadLanguageAsync(lang).then(function (lang) {
        $this.$router.push({ name: $this.$router.history.current.name, params: { lang } })
      })
    },
    convertSVG () {
      document.querySelectorAll('img.svg').forEach((el) => {
        const imgID = el.getAttribute('id')
        const imgClass = el.getAttribute('class')
        const imgURL = el.getAttribute('src')
        axios.get(imgURL).then((data) => {
          const parser = new DOMParser()
          const xmlDoc = parser.parseFromString(data.data, 'text/html')
          let svg = xmlDoc.querySelector('svg')
          if (typeof imgID !== 'undefined') {
            svg.setAttribute('id', imgID)
          }
          if (typeof imgClass !== 'undefined') {
            svg.setAttribute('class', imgClass + ' replaced-svg')
          }
          svg.removeAttribute('xmlns:a')
          el.parentNode.replaceChild(svg, el)
        })
      })
    }
  }
}
</script>

<style lang="scss">
.header-mobile {
  position: absolute;
  right: 0;
  top: 0;
  left: 25px;
  padding: 10px 25px 10px 0;
  z-index: 99998;
  transition-delay: .5s;
  transition-duration: .7s;
  transition-property: all;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
  border-bottom: 2px solid rgba(255,255,255, .2);
  .tel {
    z-index: 150;
    position: relative;
    .tel-box {
      width: 38px;
      height: 38px;
      background-color: #fa6a02;
      display: block;
      border-radius: 50%;
      .svg {
        position: absolute;
        top: 10px;
        left: 10px;
        -webkit-animation: ring 1.5s 4;
        path {
          fill: #fff;
        }
      }
    }
  }
  .main-nav-logo {
    display: block;
    margin-bottom: -10px;
    img {
      max-width: 125px;
    }
  }
  .toggle-header {
    box-shadow: none;
    border: none;
    outline: none;
    background: transparent;
    color: #fff;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    z-index: 150;
    border-right: 1px solid rgba(255,255,255, .2);
    margin-left: 10px;
    margin-right: 20px;
    padding: 0;
    .button {
      width: 46px;
      height: 24px;
      position: relative;
      span {
        display: block;
        width: 23px;
        height: 2px;
        background-color: #fff;
        position: absolute;
        left: 50%;
        margin-left: -14px;
        transition: all .3s;
        &:nth-child(1){
          top: 2px;
        }
        &:nth-child(2){
          top: 11px;
        }
        &:nth-child(3){
          top: 21px;
          width: 17px;
          right: 50%;
          left: inherit;
          margin: 0 -9px 0 0;
        }
      }
    }
    &.active {
      .button {
        span:nth-child(1) {
          top: 12px;
          transform: rotate(45deg);
        }
        span:nth-child(2) {
          transform: rotate(-45deg);
          top: 12px;
        }
        span:nth-child(3) {
          visibility: hidden;
          opacity: 0;
          transform: scale(0);
        }
      }
      span {
        color: #fff !important;
      }
    }
  }/*toggle-header*/
  .lng {
    margin-left: auto;
    visibility: hidden;
    opacity: 0;
    position: relative;
    z-index: 150;
    transform: translate(-50px);
    transition: all .3s;
    li {
      margin: 0;
      padding: 0;
      list-style: none;
      a {
        color: #fff;
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        border-bottom: 2px solid #fa6a02;
        padding: 5px;
        text-decoration: none;
        margin-top: -3px;
      }
      &.imigix {
        margin-left: auto;
        color: #fff;
        font-size: 12px;
        font-weight: 600;
      }
    }
  }
  .main-navigation {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    transform: translateX(100%);
    transition: all .7s;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    z-index: 100;
    &:before {
      content:'';
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(0,0,0, .8);
      left: 0;
    }
    .content {
      display: flex;
      flex-direction: column;
      background-color: #232323;
      height: 100%;
      width: 100%;
      transform: translateX(50%);
      transition: all 1.1s;
      h3, h3 a {
        color: #fff;
        font-size: 17px;
        font-weight: 600;
        line-height: 35px;
        text-decoration: none;
      }
      h3 {
        margin-bottom: 0;
      }
      .margin-bottom-0 {
        margin-bottom: 0;
      }
      h3 a {
        display: inline-block;
        &:after {
          content: '';
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 4px 0 4px 5px;
          border-color: transparent transparent transparent #fa6a02;
          float: right;
          display: inline-block;
          margin: 15px 0 0 10px;
        }
      }
      .cols {
        display: flex;
        flex-direction: column;
        padding: 60px 25px 20px 25px;
      }
      .col {
        opacity: 0;
        padding: 0;
        &:nth-child(1){
          /*transform: translateX(250px);*/
          transition: all .9s;
        }
        &:nth-child(2){
          /*transform: translateX(450px);*/
          transition: all 1.3s;
        }
        &:nth-child(3){
          /*transform: translateX(600px);*/
          transition: all 1.7s;
          border: none;
        }
      }
      .follow-us {
        margin: 30px 0 0;
        padding-top: 15px;
        border-top: 1px solid rgba(#979797, .37);
        .text {
          color: #fff;
          font-size: 9px;
          font-weight: 600;
          text-transform: uppercase;
          margin-bottom:  15px;
        }
        ul {
          margin: 0;
        }
        li {
          display: inline-block;
          margin: 0 15px 0 0;
          &:last-child {
            margin-right: 0;
          }
          a {
            border: 1px solid #fff;
            border-radius: 50%;
            width: 45px;
            height: 45px;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all .3s;
            svg,
            img {
              display: block;
              margin: auto;
              transition: all .3s;
            }
          }
        }
      }
      ul {
        margin: 0 0 10px 0;
        padding: 0;
        list-style: none;
        li {
          display: block;
          margin-bottom: 16px;
          a {
            color: #8d8d8d;
            font-family: 'Fira Sans', sans-serif;
            font-size: 14px;
            font-weight: 400;
            text-decoration: none;
          }
        }
      }
    }
  }//main-navigation
  nav {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  &.active {
    position: fixed;
    .main-nav-logo {
      position: relative;
      z-index: 999;
    }
    .lng {
      transform: translate(0);
      opacity: 1;
      visibility: visible;
    }
    .main-navigation {
      transform: translateX(0);
      .content {
        animation: nav-animation 1s forwards;
      }
      .col {
        opacity: 1;
        // &:nth-child(1){
        //   animation: col3-animation .3s forwards;
        // }
        // &:nth-child(2){
        //   animation: col3-animation .8s forwards;
        // }
        // &:nth-child(3){
        //   animation: col3-animation 1.3s forwards;
        // }
      }
    }
  }
  .main-nav-logo {
    svg path,
    svg polygon,
    svg g mask,
    svg g,
    svg g g,
    svg g path, {
      fill: #fff !important;
    }
  }
  &.white {
    background: #fff;
    left: 0;
    padding-left: 25px;
    .main-nav-logo {
      svg {
        path {
          fill: #000 !important;
        }
        g g:nth-child(2) path {
          fill: #b1b1b1 !important;
        }
      }
    }
    .toggle-header {
      border-right: 1px solid #000;
      .button {
        span {
          background-color: #000;
        }
      }
    }
    &.active {
      .main-nav-logo {
        svg {
          path {
            fill: #fff !important;
          }
          g g:nth-child(2) path {
            fill: #fff !important;
          }
        }
      }
      .toggle-header {
        border-right: 1px solid #fff;
        .button {
          span {
            background-color: #fff;
          }
        }
      }
    }
  }
}
@-webkit-keyframes ring {
  0% {
  }
  10% {
    transform:rotate(5deg);
  }
  20% {
    transform:rotate(-5deg);
  }
  30% {
    transform:rotate(5deg);
  }
   40% {
    transform:rotate(-5deg);
  }
  50% {
    transform:rotate(5deg);
  }
   60% {
    transform:rotate(-5deg);
  }
  70% {
    transform:rotate(5deg);
  }
  80% {
    transform:rotate(-5deg);
  }
  90% {
    transform:rotate(5deg);
  }
   100% {
    transform:rotate(-5deg);
  }
}
@keyframes nav-animation {
  0% {transform: translateX(50%)}
  100% {transform: translateX(0)}
}
@keyframes col1-animation {
  0% {transform: translateX(250px); opacity: 0;}
  50% {transform: translateX(1100); opacity: 0;}
  100% {transform: translateX(0); opacity: 1;}
}
@keyframes col2-animation {
  0% {transform: translateX(450px); opacity: 0;}
  50% {transform: translateX(100); opacity: 0;}
  100% {transform: translateX(0); opacity: 1;}
}
@keyframes col3-animation {
  0% {transform: translateX(650px); opacity: 0;}
  50% {transform: translateX(100); opacity: 0;}
  100% {transform: translateX(0); opacity: 1;}
}
</style>
