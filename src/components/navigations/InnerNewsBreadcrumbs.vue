<template>
  <ul class="breadcrumbs">
    <li><router-link :to="'/' + lang + '/news'">{{ $t('news') }}</router-link></li>
    <!-- <li><router-link :to="'/' + lang + '/news'">{{ $t('news') }}</router-link></li> -->
  </ul>
</template>

<script>
export default {
  name: 'inner-news-breadcrumbs',
  computed: {
    lang () {
      return this.$i18n.locale
    }
  }
}
</script>

<style lang="scss">
  .nav-inner {
    .breadcrumbs {
      margin-left: 50px !important;
      li {
        line-height: 54px;
        &:first-child {
          a {
            color: #fff;
            font-family: "Exo 2";
            font-size: 24px;
            font-weight: 700;
            text-transform: uppercase;
          }
        }
        a {
          color: #969595;
          font-size: 20px;
          font-weight: 300;
          text-transform: uppercase;
          padding-left: 5px;
          padding-right: 5px;
        }
        +li {
          padding-left: 5px;
          &:before {
            content: '/';
            color: #969595;
            display: inline-block;
            position: absolute;
            left: 0;
            top: 50%;
            transform:translateY(-50%);
            font-size: 20px;
          }
        }
      }
    }
  }
</style>
