<template>
  <div class="building-listing-mobile">
    <h1 class="title">{{pageTitle}}</h1>
    <div class="building-box" v-for="building in buildings" :key="building.id" >
      <div class="img-box"><img :src="building.bg" alt=""></div>
      <div class="info">
        <h2 class="title"><a :href="building.link"><span>{{building.id}}. </span>{{ building.title }}</a></h2>
      </div>
    </div>
    <div class="outher-buildings">
      <div class="buttons">
        <router-link :to="'/' + lang + '/building-sort'">{{ $t('future_projects') }}</router-link>
        <router-link :to="'/' + lang + '/building-sort'">{{ $t('completed_projects') }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'futurebuildings-mobile',
  props: ['pageTitle'],
  data () {
    return {
      buildingsRoute: null
    }
  },
  computed: {
    lang () {
      return this.$i18n.locale
    },
    ...mapState({
      buildings: state => state.buildings.all
    })
  }
}
</script>

<style lang="scss" scroped>
.active-component {
}
.outher-buildings {
  .buttons {
    display: flex;
    flex-direction: column;
    a {
      color: #484b47;
      font-family: "Fira Sans";
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      border: 1px solid #8d8d8d;
      display: block;
      text-decoration: none;
      text-align: center;
      padding: 15px;
      margin: 12px 0;
    }
  }
}
.building-listing-mobile {
  position: relative;
  padding: 90px 25px 25px 25px;
  .title {
    color: #fff;
    font-family: "Fira Sans";
    font-size: 18px;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 40px;
  }
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 250px;
    background-color: #232323;
    z-index: -1;
  }
  .building-box {
    .img-box {
      img {
        max-width: 100%;
      }
    }
    .info {
      background: #fff;
      padding: 20px 15px;
      margin-left: 15px;
      margin-right: 15px;
      margin-top: -50px;
      position: relative;
      z-index: 199;
      .title,.title a {
        color: #000;
        font-size: 15px;
        font-weight: 600;
        text-decoration: none;
        span {
          color: #fa6a02;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
