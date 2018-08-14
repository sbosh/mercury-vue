<template>
  <nav class="nav-inner">
    <nav>
      <router-link :to="'/' + lang"><img src="@/assets/images/logo-flat.png" class="logo" alt=""></router-link>
      <div class="header-title"><h1 class="title">Комплекс Бижу</h1></div>
      <ul>
        <li><a href="">За сградата</a></li>
        <li><a href="">Локация</a></li>
        <li><a href="">Галерия</a></li>
        <li><a href="">Новини</a></li>
      </ul>
      <div class="back-btn" @click="routeBack()">Назад</div>
    </nav>
  </nav>
</template>

<script>
export default {
  name: 'navinner-component',
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
      li {
        list-style: none;
        a {
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          text-decoration: none;
          padding: 15px;
        }
      }
    }
  }
</style>
