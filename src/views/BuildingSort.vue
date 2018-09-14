<template>
  <div class="main-content">
    <navinner-component :navTitle="title" />
    <div class="buildings building-sort">
      <swiper :options="swiperOptions">
        <swiper-slide v-for="building in buildings" :key="building.id" >
          <div class="building-item">
            <div class="img-box"><a :href="building.link"><img :src="building.bg" alt=""></a></div>
            <div class="caption">
              <div class="title-box">
                <h2 class="title"><a :href="building.link">{{ building.description }}</a></h2>
                <div class="location-info">{{ building.location }}</div>
                <div class="btn-box"><a :href="building.link" class="btn">Виж</a></div>
              </div>
            </div>
          </div>
        </swiper-slide>
        <div class="dots-paggination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NavinnerComponent from '@/components/layout/NavinnerComponent'
export default {
  name: 'building-sort',
  components: {
    'navinner-component': NavinnerComponent
  },
  data () {
    return {
      title: '',
      swiperOptions: {
        slidesPerView: 'auto',
        spaceBetween: 0,
        effect: 'fade',
        speed: 1000,
        loop: true,
        mousewheel: true,
        pagination: {
          el: '.dots-paggination',
          clickable: true,
          renderBullet (index, className) {
            return `<div class="${className}">${index + 1}</div>`
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      buildings: 'getSortedBuildings'
    })
  }
}
</script>

<style lang="scss">
.building-sort {
  position:relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 360px;
    background-color: #232323;
    z-index: 0;
  }
}
.dots-paggination {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .swiper-pagination-bullet {
    width: auto;
    height: auto;
    color: #8e8e8e;
    font-size: 16px;
    font-weight: 700;
    padding: 15px;
    border-bottom: 1px solid transparent;
    border-radius: 0;
    background: none;
    opacity: 1;
    transition: all .3s;
    &.swiper-pagination-bullet-active {
      color: #fff;
      border-bottom-color: #fa6a02;
    }
  }
}
.building-item {
  display: flex;
  align-items: center;
  opacity: 0;
  visibility: hidden;
  padding: 0 200px;
  .img-box {
    width: 50%;
    height: 80vh;
    position: relative;
    overflow: hidden;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: #232323;
      transition-duration: .7s;
      transition-delay: .3s;
      transition-property: all;
      transform: translateX(-100%);
    }
    img {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-150%, -50%);
      transition-duration: .7s;
      transition-delay: 1s;
      transition-property: all;
    }
  }
  .caption {
    width: 50%;
    .location-info {
      color: #484b47;
      font-size: 16px;
      font-weight: 600;
      background-image: url(../assets/images/location-icon.svg);
      background-position: top left;
      background-repeat: no-repeat;
      padding-left: 31px;
      margin: 25px 0 40px 0;
      transform: translateY(400px);
      transition-delay: 1.5s;
      transition-duration: .7s;
      transition-property: all;
    }
  }
  .title-box {
    .title {
      opacity: 0;
      visibility: hidden;
      transition-delay: 1s;
      transition-duration: .7s;
      transition-property: all;
    }
    .title, .title a {
      color: #2c2c2c;
      font-family: "Exo 2";
      font-size: 42px;
      font-weight: 700;
      text-transform: uppercase;
    }
    .title:before {
      background-color: #8d8d8d;
    }
    .title:after {
      border-color: #fa6a02;
    }
    .btn-box {
      transform: translateY(250px);
      transition-delay: 1.5s;
      transition-duration: .7s;
      transition-property: all;
      margin: 0;
      .btn {
        color: #4a4a4a;
        border-color: #fa6a02;
        &:after {
          background: #4a4a4a;
        }
        &:before {
          border-color: transparent transparent transparent #4a4a4a;
        }
      }
    }
  }
}
.swiper-slide-active {
  .building-item {
    opacity: 1;
    visibility: visible;
    .img-box {
      &:before {
        transform: translateX(0);
      }
      img {
        transform: translate(-50%, -50%);
      }
    }
    .title-box {
      .title {
        opacity: 1;
        visibility: visible;
      }
    }
    .location-info {
      transform: translateY(0);
    }
    .caption {
      .btn-box {
        transform: translateY(0);
      }
    }
  }
}
</style>
