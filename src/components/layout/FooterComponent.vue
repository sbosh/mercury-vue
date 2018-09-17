<template>
  <footer>
    <div class="logo"><a href=""><img src="@/assets/images/logo-white-text.svg" alt=""></a></div>
    <mq-layout mq="md+">
      <nav>
        <ul class="footer-top-nav">
          <li><a href="">Настоящи проекти</a></li>
          <li><a href="">Завършени проекти</a></li>
          <li><a href="">Бъдещи проекти</a></li>
        </ul>
        <ul class="footer-second-nav">
          <router-link tag="li" :to="'/' + lang + '/aboutus'"><a href="">За компанията</a></router-link>
          <router-link tag="li" :to="'/' + lang + '/contacts'"><a href="">Контакти</a></router-link>
          <router-link tag="li" :to="'/' + lang + '/news'"><a href="">Новини</a></router-link>
        </ul>
      </nav>
    </mq-layout>
    <ul class="footer-bottom-nav">
      <li><a href=""><img src="@/assets/images/fb-icon.svg" class="svg" alt=""></a></li>
      <li><a href=""><img src="@/assets/images/yt-icon.svg" class="svg" alt=""></a></li>
      <li><a href=""><img src="@/assets/images/ln-icon.svg" class="svg" alt=""></a></li>
    </ul>
    <div class="all-rights">Всички права запазени @ Mercury99</div>
    <div class="created-by"><a href="mailto:imigix2018@gmail.com">Created by Imigix</a></div>
  </footer>
</template>

<script>
import axios from 'axios'
export default {
  name: 'footer-component',
  computed: {
    lang () {
      return this.$i18n.locale
    }
  },
  mounted () {
    this.convertSVG()
  },
  methods: {
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
  footer {
    background-color: #232323;
    padding: 80px 0;
    position: relative;
    .logo {
      margin: 0 auto 60px auto;
      text-align: center;
      img {
        max-width: 100px;
      }
    }
    nav {
      border-bottom: 1px solid rgba(#979797, .37);
      max-width: 890px;
      margin: 0 auto 45px auto;
      ul {
        padding: 0;
        margin: 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: row;
        li {
          list-style: none;
          width: 33.33%;
          text-align: center;
          a {
            text-decoration: none;
            padding: 20px;
            display: block;
          }
        }
      }
    }//nav
    .footer-top-nav {
      margin-bottom: 20px;
      li {
        a {
          color: #fff;
          font-size: 20px;
          font-weight: 600;
        }
      }
    }
    .footer-second-nav {
      margin-bottom: 20px;
      li {
        a {
          color: #8d8d8d;
          font-size: 16px;
          font-weight: 500;
        }
      }
    }//second-footer-nav
    .footer-bottom-nav {
      margin: 0 auto 20px auto;
      display: table;
      padding: 0;
      li {
        display: inline-block;
        list-style: none;
        margin: 0 7px;
        a {
          width: 55px;
          height: 55px;
          border: 1px solid #979797;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          transition: all .3s;
          svg {
           transition: all .3s;
          }
          &:hover {
            border-color: #ffffff;
            background: #ffffff;
            svg path,
            svg g use {
              fill: #2c2c2c;
            }
          }
        }
      }
    }//footer-bottom-nav
    .all-rights {
      color: rgba(#fff, .55);
      font-size: 12px;
      font-weight: 400;
      margin-left: auto;
      margin-right: auto;
      display: table;
    }
    .created-by{
      position: absolute;
      left: -60px;
      top: 190px;
      transform: rotate(-90deg);
      a {
        display: block;
        color: #fff;
        font-size: 12px;
        text-decoration: none;
        font-weight: 700;
        &:after {
          content: '';
          width: 110px;
          height: 1px;
          background: rgba(#979797, .37);
          display: inline-block;
          margin: 8px 0 0 5px;
          float: right;
          transition: all .3s;
        }
      }
    }
  }
</style>
