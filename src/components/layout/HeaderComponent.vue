<template>
  <header v-bind:class="{ active: isActive }" class="header">
    <nav class="main-nav">
      <div class="main-navigation">
        <div class="content">
          <div class="cols">
            <div class="col">
              <router-link tag="a" :to="'/' + lang" class="main-nav-logo"><img src="@/assets/images/logo-nav.png" alt=""></router-link>
            </div>
            <div class="col">
              <h3 class="margin-bottom-0"><router-link :to="'/' + lang + '/current-buildings'">{{ $t('current_projects') }}</router-link></h3>
              <ul class="ul">
                <li v-for="building in current" :key="building.id">
                  <router-link v-if="building.status == 1 && building.use_svg == 1" :to="'/' + lang + '/' + building.id + '/' + building['slug_' + $i18n.locale] + '/view'">{{ building['title_' + $i18n.locale] }}</router-link>
                  <router-link v-else :to="'/' + lang + '/' + building.id + '/' + building['slug_' + $i18n.locale]">{{ building['title_' + $i18n.locale] }}</router-link>
                </li>
              </ul>
              <h3><router-link :to="'/' + lang + '/finished-buildings'">{{ $t('completed_projects') }}</router-link></h3>
              <h3><router-link :to="'/' + lang + '/future-buildings'">{{ $t('future_projects') }}</router-link></h3>
              <h3><a href="http://mercury99.com/" target="_blank">{{ $t('vacant_property') }}</a></h3>
            </div>
            <div class="col">
              <h3><router-link :to="'/' + lang + '/about'">{{ $t('about_company') }}</router-link></h3>
              <h3><router-link :to="'/' + lang + '/news'">{{ $t('news') }}</router-link></h3>
              <h3 class="margin-bottom-0"><router-link :to="'/' + lang + '/contacts'">{{ $t('contacts') }}</router-link></h3>
              <br>
              <!-- <ul>
                <li><router-link :to="'/' + lang + '/about#company'">{{ $t('about_us') }}</router-link></li>
                <li><router-link :to="'/' + lang + '/about#services'">{{ $t('services') }}</router-link></li>
                <li><router-link :to="'/' + lang + '/about#history'">{{ $t('history') }}</router-link></li>
              </ul> -->
              <div class="tel">
                <a :href="$t('tel_href')" class="tel-box">
                  <div class="icon"><img src="@/assets/images/phone-icon.svg" class="svg" alt=""></div>
                  <div class="text">{{ $t('contact_us_now') }}</div>
                  <div class="phone">{{ $t('tel_phone') }}</div>
                </a>
              </div>
              <div class="follow-us">
                <div class="text">{{ $t('follow_us') }}</div>
                <ul>
                  <li><a href="https://www.facebook.com/Mercury99Ltd/" target="_blank"><img src="@/assets/images/fb-icon.svg" class="svg" alt=""></a></li>
<!--                   <li><a href=""><img src="@/assets/images/yt-icon.svg" class="svg" alt=""></a></li>
                  <li><a href=""><img src="@/assets/images/ln-icon.svg" class="svg" alt=""></a></li> -->
                </ul>
              </div>
            </div>
          </div>
          <ul class="created-by">
            <li class="imigix">Created by <a href="https://grindwebstudio.com" target="_blank">Grind Web Studio</a></li>
          </ul>
        </div>
      </div>
      <div class="tel">
        <a :href="$t('tel_href')" class="tel-box">
          <div class="icon"><img src="@/assets/images/phone-icon.svg" class="svg" alt=""></div>
          <div class="text">{{ $t('contact_us_now') }}</div>
          <div class="phone">{{ $t('tel_phone') }}</div>
        </a>
      </div>
      <button class="toggle-header"
        @click="isActive = !isActive"
        v-bind:class="{ active: isActive }">
        <div class="button">
          <span></span>
          <span></span>
        </div>
        <span>{{ $t('menu') }}</span>
      </button>
      <ul class="social">
        <li><a href="https://www.facebook.com/Mercury99Ltd/" target="_blank"><img src="@/assets/images/fb-icon.svg" class="svg" alt=""></a></li>
<!--         <li><a href=""><img src="@/assets/images/yt-icon.svg" class="svg" alt=""></a></li>
        <li><a href=""><img src="@/assets/images/ln-icon.svg" class="svg" alt=""></a></li> -->
      </ul>
      <ul class="lng">
        <li v-if="lang === 'bg'" ><a href="" @click="changeLang('en', $event)">en</a></li>
        <li v-else><a href="" @click="changeLang('bg', $event)">bg</a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import { loadLanguageAsync } from '@/setup/i18n'
import axios from 'axios'
export default {
  name: 'header-component',
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
.header {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 99998;
  width: 195px;
  transition-delay: .5s;
  transition-duration: 1.2s;
  transition-property: all;
  .main-nav-logo {
    img {
      max-width: 165px;
    }
  }
  nav.home-header {
    border-left: 1px solid rgba(#979797, .37);
    .lng {
      li {
        a {
          color: #fff;
        }
      }
    }
  }
  nav:not(.home-header) {
    background: #fff;
    .toggle-header {
      span {
        color: #000;
      }
    }
    ul.social {
      .svg {
        g use,
        path {
          fill: #0f0f0f;
        }
      }
    }
    .tel {
      .tel-box {
        color: #000;
        .svg {
          g use,
          path {
            fill: #0f0f0f;
          }
        }
        .text {
          color: #8d8d8d;
        }
      }
    }
  }
  .main-navigation {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    height: 100%;
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
      width: 85%;
      transform: translateX(50%);
      transition: all 1.3s;
      h3, h3 a {
        color: #fff;
        font-size: 24px;
        font-weight: 700;
        line-height: 35px;
        text-decoration: none;
      }
      h3 {
        margin-bottom: 43px;
        a {
          position: relative;
          &:before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background: #fa6a02;
            transition: all .3s;
          }
        }
        .router-link-active:before {
          width: 100%;
        }
        &:hover {
          a:before {
            width: 100%;
          }
        }
      }
      .ul {
        li {
          margin-bottom: 5px;
          a {
            transition: all .3s;
            padding: 6px 0;
            display: block;
          }
          .router-link-active {
            color: #fff;
          }
          &:hover {
            a {
              color: #fff;
            }
          }
        }
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
        flex-direction: row;
        padding: 110px 30px 50px 30px;
      }
      .col {
        opacity: 0;
        padding: 0 40px 40px;
        border-right: 1px solid rgba(#979797, .37);
        &:nth-child(1){
          transform: translateX(250px);
          transition: all 1.1s;
        }
        &:nth-child(2){
          transform: translateX(450px);
          transition: all 1.4s;
        }
        &:nth-child(3){
          transform: translateX(600px);
          transition: all 1.6s;
          border: none;
        }
      }
      .tel {
        .tel-box {
          padding: 0;
          color: #fff;
          &:before {
            display: none;
          }
          g use,
          svg {
            path {
              fill: #fff;
            }
          }
          &:hover{
            background: transparent;
            color: #fff;
            g use,
            svg {
              path {
                fill: #fff;
              }
            }
          }
          .icon {
            margin: 0 auto 10px 0;
          }
          .text {
            margin-bottom: 10px;
          }
        }
      }
      .follow-us {
        margin: 30px 0 0;
        .text {
          color: #fff;
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom:  12px;
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
            width: 55px;
            height: 55px;
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
            &:hover {
              border-color: #f96902;
              svg {
                g use,
                path {
                  fill: #f96902;
                }
              }
            }
          }
        }
      }
      ul.created-by {
        margin: auto auto 20px 20px;
        li {
          color: #fff;
          font-size: 12px;
          font-weight: 600;
          padding: 5px;
          display: block;
          text-decoration: none;
          a {
            color: #fff;
            font-size: 12px;
            font-weight: 600;
            padding: 5px;
            text-decoration: none;
          }
        }
      }
      .ul,
      ul {
        margin: 13px 0 30px 0;
        padding: 0;
        list-style: none;
        li,.box {
          display: block;
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
    @media screen and(max-width: 1024px) {
      .content {
        .cols {
          padding: 60px 20px 40px 20px;
        }
        h3, h3 a {
           font-size: 20px;
           line-height: 30px;
        }
        .col {
          padding: 0 20px 20px;
        }
      }
    }
    @media screen and(max-width: 768px) {
      .main-nav-logo img {
        max-width: 100px;
      }
      .content {
        width: 100%;
      }
    }
  }//main-navigation
  .tel {
    width: 100%;
    z-index: 50;
    position: relative;
    .tel-box {
      text-decoration: none;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      transition: all .3s;
      color: #fff;
      padding: 30px;
      position: relative;
      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        transition: all .3s;
        background: #fff;
        transform: translateY(-100%);
        z-index: -1;
      }
      &:hover {
        color: #000;
        &:before {
          transform: translateY(0);
        }
        .icon {
          -webkit-animation: ring 1s infinite;
          -webkit-animation-iteration-count:infinite;
          svg {
            g use,
            path {
              fill: #000;
            }
          }
        }
      }
    }
    .icon {
      margin-left: auto;
      svg {
        g use,
        g,
        path {
          fill: #fff;
        }
      }
    }
    .text {
      font-family: Montserrat;
      font-size: 9px;
      font-weight: 700;
      text-transform: uppercase;
    }
    .phone {
      font-size: 15px;
      font-weight: 700;
      text-transform: uppercase;
    }
  }
  nav {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .toggle-header {
    box-shadow: none;
    border: none;
    outline: none;
    background: transparent;
    cursor: pointer;
    margin: auto;
    color: #fff;
    font-family: Montserrat;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    z-index: 150;
    .button {
      width: 71px;
      height: 71px;
      background-color: #f8f8f8;
      border-radius: 50%;
      position: relative;
      margin-bottom: 12px;
      transition: all .3s;
      span {
        display: block;
        width: 27px;
        height: 2px;
        background-color: #000000;
        position: absolute;
        left: 50%;
        margin-left: -14px;
        transition: all .3s;
        &:nth-child(1){
          top: 30px;
        }
        &:nth-child(2){
          top: 40px;
        }
      }
    }
    @media screen and(min-width: 992px) {
      &:hover {
        .button {
          transform: scale(1.1);
          span {
            transform: scale(.9);
          }
        }
      }
    }
    &.active {
      .button {
        span:nth-child(1) {
          top: 35px;
          transform: rotate(45deg);
        }
        span:nth-child(2) {
          transform: rotate(-45deg);
          top: 35px;
        }
      }
      span {
        color: #fff !important;
      }
    }
  }//toggle-header
  ul.social {
    padding: 0;
    margin: 0 0 20px 0;
    text-align: center;
    li {
      list-style: none;
      dispaly: inline-block;
      transition: all .3s;
      &:hover {
        opacity: .7;
      }
      a {
        display: block;
        padding: 17px;
      }
    }
  }
  .lng {
    margin: 0 auto;
    padding: 0 0 40px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    &:before {
      content: '';
      width: 1px;
      height: 50px;
      background: #8d8d8d;
      display: inline-block;
      margin-bottom: 15px;
    }
    li {
      margin: 0;
      padding: 0;
      list-style: none;
      transition: all .3s;
      &:hover {
        opacity: .7;
      }
      a {
        color: #000;
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        border-bottom: 2px solid #fa6a02;
        padding: 5px;
        display: block;
        text-decoration: none;
      }
      &.imigix {
        margin-left: auto;
        color: #fff;
        font-size: 12px;
        font-weight: 700;
      }
    }
  }
  &.active {
    .main-navigation {
      transform: translateX(0);
      .content {
        animation: nav-animation 1s 1 forwards;
      }
      .col {
        opacity: 1;
        &:nth-child(1){
          animation: col3-animation .7s 1 forwards;
        }
        &:nth-child(2){
          animation: col3-animation 1.1s 1 forwards;
        }
        &:nth-child(3){
          animation: col3-animation 1.4s 1 forwards;
        }
      }
    }
  }
}
@-webkit-keyframes ring {
  0% {
  }
  10% {
    -webkit-transform:rotate(5deg);
    -moz-transform:rotate(5deg);
    -o-transform:rotate(5deg);
  }
  20% {
    -webkit-transform:rotate(-5deg);
    -moz-transform:rotate(-5deg);
    -o-transform:rotate(-5deg);
  }
  30% {
    -webkit-transform:rotate(5deg);
    -moz-transform:rotate(5deg);
    -o-transform:rotate(5deg);
  }
   40% {
    -webkit-transform:rotate(-5deg);
    -moz-transform:rotate(-5deg);
    -o-transform:rotate(-5deg);
  }
  50% {
    -webkit-transform:rotate(5deg);
    -moz-transform:rotate(5deg);
    -o-transform:rotate(5deg);
  }
   60% {
    -webkit-transform:rotate(-5deg);
    -moz-transform:rotate(-5deg);
    -o-transform:rotate(-5deg);
  }
  70% {
    -webkit-transform:rotate(5deg);
    -moz-transform:rotate(5deg);
    -o-transform:rotate(5deg);
  }
  80% {
    -webkit-transform:rotate(-5deg);
    -moz-transform:rotate(-5deg);
    -o-transform:rotate(-5deg);
  }
  90% {
    -webkit-transform:rotate(5deg);
    -moz-transform:rotate(5deg);
    -o-transform:rotate(5deg);
  }
   100% {
    -webkit-transform:rotate(-5deg);
    -moz-transform:rotate(-5deg);
    -o-transform:rotate(-5deg);
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
