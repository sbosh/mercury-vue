<template>
  <div class="news-inner-article">
    <navinner-component navigation="newsBreadcrumbs"/>
    <div class="container">
      <div class="caption">
        <div class="box-title">
          <h2 class="title">{{ title }}</h2>
        </div>
      </div>
      <article class="news-article news-article-content animate-box">
        <div class="date">{{ date }}</div>
        <div class="img-box">
          <img :src="image" alt="">
        </div>
        <div class="info-box">
          <p v-html="description"></p>
        </div>
      </article>
      <div class="related-news">
        <h3>Свързани новини</h3>
        <div class="news-swiper">
          <news-listing-swiper :articles="articles" />
        </div>
      </div>
    </div>
    <footer-component />
  </div>
</template>

<script>
import NavinnerComponent from '@/components/layout/NavinnerComponent'
import NewsListingSwiper from '@/components/news/NewsListingSwiper'
import FooterComponent from '@/components/layout/FooterComponent.vue'
export default {
  name: 'news-inner',
  components: {
    'navinner-component': NavinnerComponent,
    'news-listing-swiper': NewsListingSwiper,
    'footer-component': FooterComponent
  },
  data () {
    return {
      id: 1,
      image: require('@/assets/images/building01.jpg'),
      title: 'Вече сме на акт 16',
      description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. <br><br> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor <b>invidunt</b> ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. <ul><li>list 1</li><li>list 2</li></ul>',
      date: '01.02.2018',
      link: 'https://www.google.com',
      category: 'Комплекс Бижу',
      icon: require('@/assets/images/category01.svg'),
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 15,
        speed: 1000,
        loop: true,
        slideToClickedSlide: true,
        autoplay: {
          delay: 7000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      articles: [
        {
          id: 1,
          image: require('@/assets/images/building01.jpg'),
          title: 'Title',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis numquam maiores animi cum. Dolorem magni adipisci a est! Fugiat illum tempore iure nesciunt debitis ad nemo distinctio minima, quis amet!',
          date: '01.02.2018',
          link: 'https://www.google.com/'
        },
        {
          id: 2,
          image: require('@/assets/images/building01.jpg'),
          title: 'Lorem ipsum',
          description: 'Reiciendis numquam maiores animi cum. Dolorem magni adipisci a est! Fugiat illum tempore iure nesciunt debitis ad nemo distinctio minima, quis amet!',
          date: '01.02.2018',
          link: 'https://www.google.com/'
        },
        {
          id: 3,
          image: require('@/assets/images/building01.jpg'),
          title: 'Title',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis numquam maiores animi cum. Dolorem magni adipisci a est! Fugiat illum tempore iure nesciunt debitis ad nemo distinctio minima, quis amet!',
          date: '01.02.2018',
          link: 'https://www.google.com/'
        },
        {
          id: 4,
          image: require('@/assets/images/building01.jpg'),
          title: 'Lorem ipsum',
          description: 'Reiciendis numquam maiores animi cum. Dolorem magni adipisci a est! Fugiat illum tempore iure nesciunt debitis ad nemo distinctio minima, quis amet!',
          date: '01.02.2018',
          link: 'https://www.google.com/'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
  .active-component {
    .news-article-content {
      .img-box img,
      .img-box:before{
        transform: translate(0);
        opacity: 1;
        visibility: visible;
      }
    }
  }
  .news-inner-article {
    padding-top: 190px;
    position: relative;
    padding-right: 195px;
    .nav-inner .header-title {
      margin: 0;
    }
    .container {
      max-width: 1100px;
      width: 100%;
      margin-left: auto;
      margin-right: auto;
      padding-left: 20px;
      padding-right: 20px;
    }
    &:before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 591px;
      background-color: #232323;
    }
    .news-article {
      margin-bottom: 100px;
    }
    .caption {
      margin-bottom: 60px;
      padding-left: 50px;
      .title-box {
        .title {
          color: #fff;
          font-size: 42px;
          font-weight: 700;
          line-height: 57px;
          &:before {
            height: 1px;
          }
          &:after {
            border-color: fa6a02;
          }
        }
      }
    }
    .related-news {
      margin-bottom: 100px;
      h3 {
        color: #2c2c2c;
        font-size: 26px;
        font-weight: 700;
        line-height: 57px;
        margin-bottom: 30px;
      }
      .news-article {
        margin-bottom: 0;
        .date {
          color: #2c2c2c;
        }
        .img-box {
          margin-bottom: 30px;
        }
        .article-title a, 
        .article-title {
          color: #2c2c2c;
          line-height: 26px;
          margin-bottom: 10px;
        }
      }
      .swiper-pagination {
        .swiper-pagination-bullet {
          background-color: rgba(#232323, .5);
        }
        .swiper-pagination-bullet-active {
          background-color: rgba(#232323, 1);
        }
      }
    }
  }
</style>
