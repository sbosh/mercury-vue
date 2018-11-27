<template>
  <div class="cookies-box" v-if="show">
    <div class="close" @click="show = !show"></div>
    <h3>{{ $t('this_site_use_cookies') }}</h3>
    <div id="agree" @click="saveCookie">{{ $t('i_agree') }}</div>
    <router-link :to="'/' + lang + '/terms'" class="read-more">{{ $t('read_more') }}</router-link>
  </div>
</template>

<script>
export default {
  name: 'cookies-box',
  data () {
    return {
      show: false
    }
  },
  mounted () {
    // eslint-disable-next-line
    setTimeout(() => this.show = true, 1000)
  },
  computed: {
    lang () {
      return this.$i18n.locale
    }
  },
  methods: {
    saveCookie () {
      this.setCookie('John', true, 60)
      this.show = false
    },
    setCookie (cname, cvalue, exdays) {
      let d = new Date()
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
      let expires = 'expires=' + d.toUTCString()
      document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
    },
    getCookie (cname) {
      var name = cname + '='
      var decodedCookie = decodeURIComponent(document.cookie)
      var ca = decodedCookie.split(';')
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i]
        while (c.charAt(0) === ' ') {
          c = c.substring(1)
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length)
        }
      }
      return ''
    }
  },
  created () {
    if (this.getCookie('John')) {
      this.show = false
    }
  }
}
</script>

<style lang="scss">
.cookies-box {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 99998;
  padding: 40px 80px 40px 40px;
  background: #333;
  color: #fff;
  .close {
    position: absolute;
    right: 20px;
    top: 20px;
    width: 15px;
    height: 15px;
    background: url('~@/assets/images/close-apms-icon.svg') no-repeat center center;
    background-size: 100%;
    cursor: pointer;
    transition: all .3s;
    &:hover {
      transform: rotate(180deg);
    }
  }
  h3 {
    padding-left: 40px;
    background: url('~@/assets/images/cookie-icon.svg') no-repeat left center;
    margin: 0 0 20px 0;
  }
  p {
    display: block;
    width: 100%;
    margin: 10px 0;
  }
  #agree {
    cursor: pointer;
    padding: 15px 20px;
    margin: 10px 10px 0 0;
    border: 1px solid #fff;
    display: inline-block;
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 600;
  }
  .read-more {
    font-size: 12px;
    text-transform: uppercase;
    color: #cfcfcf;
    text-decoration: none;
    font-weight: 600;
    padding: 15px 20px;
  }
  @media screen and(max-width:768px) {
    padding: 16px;
    left: 0;
    .close {
      right: 10px;
      top: 10px;
    }
    h3 {
      font-size: 20px;
    }
    .read-more {
      margin-top: 10px;
    }
    .read-more,
    #agree {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
