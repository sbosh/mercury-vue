<template>
  <div class="buildings-carousel">
    <swiper :options="swiperOption">
      <swiper-slide v-for="building in buildings" :key="building.id" >
        <div class="bg" :style="{ 'background-image': 'url(' + building.bg + ')' }">
          <div class="caption">
            <div class="title-box">
              <h2 class="title"><a :href="building.link">{{ building.description }}</a></h2>
            </div>
          </div>
        </div>
      </swiper-slide>
      <div class="buildings-list">
        <h3>{{ $t('current_projects') }}</h3>
        <div class="buildings-titles"></div>
        <div class="buttons">
          <a href="">{{ $t('future_projects') }}</a>
          <a href="">{{ $t('completed_projects') }}</a>
        </div>
      </div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'buildings-carousel',
  data () {
    return {
      buildingsRoute: null,
      buildings: [
        {
          title: 'Комплекс Бижу',
          link: 'https://google.com',
          description: 'Сградата има страхотен изглед към Витоша',
          bg: require('@/assets/images/building01.jpg')
        },
        {
          title: 'Флора Бийч Резорт',
          link: 'https://google.com',
          description: 'Сградата е разположена в ж.к Младост 3',
          bg: require('@/assets/images/gallery01.jpg')
        },
        {
          title: 'Комплекс Меркурий Плаза',
          link: 'https://google.com',
          description: 'В непосредствена близост до НДК',
          bg: require('@/assets/images/next-building.jpg')
        },
        {
          title: 'Комплекс Елеганс',
          link: 'https://google.com',
          description: 'Частен басейн, 50 паркоместа и частна детска площадка',
          bg: require('@/assets/images/gallery01.jpg')
        }
      ],
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 0,
        effect: 'fade',
        speed: 1000,
        loop: true,
        mousewheel: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.buildings-titles',
          clickable: true,
          renderBullet (index, className) {
            return `<div class="${className} building-title"><a href=""><span>${index + 1}</span> Title</a></div>`
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
  .buildings-list {
    position: absolute;
    right: 195px;
    bottom: 0;
    background: #fff;
    z-index: 999;
    padding: 35px 0;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      height: 100vh;
      width: 1px;
      background: rgba(151, 151, 151, 0.37);
    }
    h3 {
      color: #8d8d8d;
      font-family: "Exo 2";
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      margin-left: 40px;
      margin-bottom: 20px;
    }
    .buildings-titles {
      border-bottom: 1px solid #dfdfdf;
      margin-bottom: 40px;
    }
    .building-title {
      color: #000;
      font-size: 18px;
      font-weight: 600;
      border-bottom: 1px solid #dfdfdf;
      margin-left: 40px;
      margin-right: 40px;
      width: auto;
      height: auto;
      background: none;
      box-shadow: none;
      border-radius: 0;
      opacity: 1;
      display: block;
      span {
        display: inline-block;
        color: #fa6a02;
        font-family: Montserrat;
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        float: left;
        margin: 5px 10px 0;
      }
      &:last-child {
        border-bottom: 0;
      }
      a {
        color: #000;
        display: block;
        padding: 20px 0;
        text-decoration: none;
        display: block;
      }
      &.swiper-pagination-bullet-active {
        a {
          color: #fa6a02;
        }
      }
    }
    .buttons {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-left: 40px;
      margin-right: 40px;
      a {
        border-right: 1px solid #8d8d8d;
        color: #484b47;
        font-family: "Fira Sans";
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        text-decoration: none;
        display: block;
        padding: 13px 30px;
        transition: all .3s;
        border: 1px solid #8d8d8d;
        &:hover {
          background: #fa6a02;
          color: #fff;
          border-color: #fa6a02;
        }
        &:last-child {
          border-left: 0;
        }
      }
    }
  }
  .buildings-carousel {
    position: absolute;
    z-index: 99;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    height: 100vh;
    width: 100%;
    .caption {
      max-width: 50%;
    }
    .swiper-wrapper,
    .swiper-container {
      height: 100vh;
      width: 100%;
    }
    .swiper-slide {
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      height: 100%;
      width: 100%;
      .bg {
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
      }
    }
  }
</style>
