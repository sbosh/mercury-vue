<template>
  <header v-bind:class="{ active: isActive }">
    <nav>
      <div class="main-navigation">
        <div class="content">
          <div class="cols">
            <div class="col">
              <router-link tag="a" :to="'/' + lang"><img src="@/assets/images/logo-nav.png" alt=""></router-link>
            </div>
            <div class="col">
              <h3 class="margin-bottom-0"><a href="">Настоящи проекти</a></h3>
              <ul>
                <li><a href="">Комплекс Бижу</a><router-link :to="'/' + lang">Home</router-link></li>
                <li><a href="">Флора Бийч Резорт</a></li>
                <li><a href="">Комплекс Меркурий Плаза</a></li>
                <li><a href="">Комплекс Елеганс</a></li>
              </ul>
              <h3><a href="">Завършени проекти</a></h3>
              <h3><a href="">Бъдещи проекти</a></h3>
              <h3><a href="">Новини</a></h3>
            </div>
            <div class="col">
              <h3><router-link :to="'/' + lang + '/contacts'">Contacts</router-link></h3>
              <h3 class="margin-bottom-0"><router-link :to="'/' + lang + '/about'">{{ $t('about_company') }}</router-link></h3>
              <ul>
                <li><router-link :to="'/' + lang + '/about'">За нас</router-link></li>
                <li><a href="">Услуги</a></li>
                <li><a href="">История</a></li>
              </ul>
            </div>
          </div>
          <ul class="lng">
            <li v-if="lang === 'bg'" ><a href="#!" @click="changeLang('en', $event)">en</a></li>
            <li v-else><a href="#!" @click="changeLang('bg', $event)">bg</a></li>
          </ul>
        </div>
      </div>
      <div class="tel">
        <a href="tel+359884626391" class="tel-box">
          <div class="icon"><img src="@/assets/images/phone-icon.svg" alt=""></div>
          <div class="text">Свържете се с нас</div>
          <div class="phone">+359 884 626 391</div>
        </a>
      </div>
      <button class="toggle-header"
        @click="isActive = !isActive"
        v-bind:class="{ active: isActive }">
        <div class="button">
          <span></span>
          <span></span>
        </div>
        <span>Меню</span>
      </button>
      <ul class="social">
        <li><a href=""><img src="@/assets/images/fb-icon.svg" alt=""></a></li>
        <li><a href=""><img src="@/assets/images/yt-icon.svg" alt=""></a></li>
        <li><a href=""><img src="@/assets/images/ln-icon.svg" alt=""></a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { loadLanguageAsync } from '@/setup/i18n'
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
    }
  },
  mounted () {
    let $this = this
    let deleteLink = document.querySelectorAll('a')
    for (let i = 0; i < deleteLink.length; i++) {
      deleteLink[i].addEventListener('click', function () {
        $this.isActive = false
      })
    }
  },
  methods: {
    changeLang (lang, event) {
      event.preventDefault()
      let $this = this
      loadLanguageAsync(lang).then(function (lang) {
        $this.$router.push({ name: $this.$router.history.current.name, params: { lang } })
      })
    }
  }
}
</script>

<style lang="scss">
  header {
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 9999;
    background: #fff;

    .main-navigation {
      background: rgba(#000, .82);
      position: fixed;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      height: 100%;
      transform: translateX(100%);
      transition: all 1.3s;
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;

      .content {
        display: flex;
        flex-direction: column;
        background-color: #232323;
        height: 100%;
        width: 85%;
        transform: translateX(50%);
        transition: all 2.4s;

        h3, h3 a {
          color: #fff;
          font-size: 24px;
          font-weight: 700;
          line-height: 35px;
          text-decoration: none;
        }

        h3 {
          margin-bottom: 43px;
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
            transition: all 1.9s;
          }
          &:nth-child(2){
            transform: translateX(450px);
            transition: all 2.9s;
          }
          &:nth-child(3){
            transform: translateX(600px);
            transition: all 3.9s;
            border: none;
          }
        }

        .lng {
          margin-top: auto;
        }

        ul {
          margin: 13px 0 30px 0;
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
    .tel {
      .tel-box {
        text-decoration: none;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        transition: all .3s;
        color: #fff;
        padding: 30px;

        &:hover {
          background: #fff;
          color: #000;
          .icon {
            -webkit-animation: ring 1s infinite;
            -webkit-animation-iteration-count:infinite;
          }
        }
      }
      .icon {
        margin-left: auto;
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
      color: #000;
      font-family: Montserrat;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;

      .button {
        width: 71px;
        height: 71px;
        background-color: #f8f8f8;
        border-radius: 50%;
        position: relative;
        margin-bottom: 12px;

        span {
          display: block;
          width: 27px;
          height: 2px;
          background-color: #000000;
          position: absolute;
          left: 50%;
          margin-left: -14px;

          &:nth-child(1){
            top: 30px;
          }
          &:nth-child(2){
            top: 40px;
          }
        }
      }
    }//toggle-header
    ul.social {
      padding: 0;
      margin: 0;
      text-align: center;

      li {
        list-style: none;
        dispaly: inline-block;

        a {
          display: block;
          padding: 17px;
        }
      }
    }
    &.active {
      .main-navigation {
        transform: translateX(0);
        .content {
          animation: nav-animation 2.8s forwards;
        }

        .col {
          opacity: 1;
          &:nth-child(1){
            animation: col3-animation 1.8s forwards;
          }
          &:nth-child(2){
            animation: col3-animation 2.8s forwards;
          }
          &:nth-child(3){
            animation: col3-animation 3.8s forwards;
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
