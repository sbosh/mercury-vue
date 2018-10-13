<template>
  <div class="services-component">
    <div class="flex-row">
      <div class="caption">
        <div class="title-box">
          <h3 class="title">{{ $t('services') }}</h3>
        </div>
        <div class="description">
          <p>{{ $t('services_description') }}</p>
        </div>
      </div>
      <div class="all-services">
        <ul>
          <li><a href="">{{ $t('services_one') }}</a></li>
          <li><a href="">{{ $t('services_two') }}</a></li>
          <li><a href="">{{ $t('services_three') }}</a></li>
          <li><a href="">{{ $t('services_four') }}</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'service-component'
}
</script>

<style lang="scss" scoped>
.services-component {
  background-color: #232323;
  padding: 150px 195px 150px 0;
  .flex-row {
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .description {
    padding-left: 195px;
    p {
      color: #6e6e6e;
      font-family: "Fira Sans";
      font-size: 17px;
      font-weight: 400;
      line-height: 23px;
      max-width: 450px;
    }
  }
  .caption {
    flex: 1 0 50%;
    .title-box {
      .title:after {
        border-color: #fa6a02;
      }
    }
  }
  .all-services {
    flex: 1 0 50%;
    ul {
      counter-reset: section;
      list-style-type: none;
      max-width: 500px;
      margin: 0;
      li {
        display: flex;
        justify-content: flex-start;
        width: 100%;
        position: relative;
        overflow: hidden;
        margin-top: -1px;
        transition: all .7s;
        &:before {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          background: #fa6a02;
          z-index: 0;
          transform: translateX(-100%);
          transition: all .7s;
        }
        a {
          color: #8d8d8d;
          font-family: "Fira Sans";
          font-size: 15px;
          font-weight: 400;
          text-decoration: none;
          display: flex;
          width: 100%;
          padding: 30px 0;
          transition: all .3s;
          position: relative;
          z-index: 10;
          border-bottom: 1px solid #dfdfdf;
          &:before {
            counter-increment: section;
            content: "0"counters(section,".")".";
            display: inline-block;
            color: #8d8d8d;
            font-family: "Fira Sans";
            font-size: 17px;
            font-weight: 400;
            margin-right: 50px;
          }
        }
        &:hover {
          padding-left: 20px;
          z-index: 9999;
          a:before,
          a {
            color: #fff;
            border-bottom-color: #fa6a02;
          }
          &:before {
            transform: translateX(0)
          }
        }
      }
    }
  }
  @media screen and(max-width: 768px) {
    padding: 50px 25px;
    .caption {
      flex: 1 0 100%;
      .title-box {
        padding-left: 45px;
        margin-left: -25px;
        .title {
          margin-bottom: 25px;
          &:before {
            margin-right: 25px;
          }
          &:after {
            margin-right: 12px;
          }
        }
      }
    }
    .all-services {
      flex: 1 0 100%;
      ul {
        padding-left: 0;
      }
    }
    .description {
      padding-left: 0;
    }
  }
}
</style>
