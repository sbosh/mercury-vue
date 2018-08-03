<template>
  <header v-bind:class="{ active: isActive }">
    <nav>
      <div class="main-navigation">
        <div class="content">
          <div class="cols">
            <div class="col">
              <img src="@/assets/images/logo-nav.png" alt="">
            </div>
            <div class="col">
              <h3><a href="">Настоящи проекти</a></h3>
              <ul>
                <router-link :to="'/' + lang">Home</router-link>
                <router-link :to="'/' + lang + '/about'">About</router-link>
                <router-link :to="'/' + lang + '/contacts'">Contacts</router-link>
              </ul>
              <h3><a href="">Завършени проекти</a></h3>
              <h3><a href="">Бъдещи проекти</a></h3>
              <h3><a href="">Новини</a></h3>
            </div>
            <div class="col">
              <h3><a href="">Контакти</a></h3>
              <h3><a href="">За компанията</a></h3>
            </div>
          </div>
          <ul class="lng">
            <li v-if="lang === 'bg'" ><a href="#!" @click="changeLang('en', $event)">en</a></li>
            <li v-else><a href="#!" @click="changeLang('bg', $event)">bg</a></li>
          </ul>
        </div>
      </div>
      <div class="tel">
        08982212412
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
    .main-navigation {
      background: rgba(#000, .82);
      position: fixed;
      top: 0;
      bottom: 0;
      right: 0;
      left: 100%;
      transition: all .9s;
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
      height: 100%;

      .content {
        display: flex;
        flex-direction: column;
        width: 0;
        background-color: #232323;
        height: 100%;
        transition: all 1.2s;

        .cols {
          display: flex;
          flex-direction: row;
        }

        .lng {
          margin-top: auto;
        }

        ul {
          margin: 0;
          padding: 0;
          list-style: none;
        }
      }

      .title {

      }
    }//main-navigation
    &.active {
      .main-navigation {
        left: 0;
        right: 0;

        .content {
          width: 85%;
        }
      }
    }
  }
</style>
