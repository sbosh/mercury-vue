<template>
  <div class="all-news">
    <navinner-component navigation="newsNav" :navTitle="title" />
    <div class="caption">
      <div class="title-box"><h2 class="title">Всички</h2></div>
    </div>
    <div class="container">
      <news-listing :articles="articles" :whithCategory="true" />
    </div>
    <footer-component />
  </div>
</template>

<script>
import NavinnerComponent from '@/components/layout/NavinnerComponent'
import NewsListing from '@/components/news/NewsListing'
import FooterComponent from '@/components/layout/FooterComponent.vue'
export default {
  name: 'news',
  components: {
    'navinner-component': NavinnerComponent,
    'news-listing': NewsListing,
    'footer-component': FooterComponent
  },
  data () {
    return {
      title: 'Новини',
      articles: [
        {
          id: 1,
          image: require('@/assets/images/building01.jpg'),
          title: 'Title',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis numquam maiores animi cum. Dolorem magni adipisci a est! Fugiat illum tempore iure nesciunt debitis ad nemo distinctio minima, quis amet!',
          date: '01.02.2018',
          link: 'https://www.google.com',
          category: 'Комплекс Бижу',
          icon: require('@/assets/images/category01.svg')
        },
        {
          id: 2,
          image: require('@/assets/images/building01.jpg'),
          title: 'Lorem ipsum',
          description: 'Reiciendis numquam maiores animi cum. Dolorem magni adipisci a est! Fugiat illum tempore iure nesciunt debitis ad nemo distinctio minima, quis amet!',
          date: '01.02.2018',
          link: 'https://www.google.com',
          category: 'Комплекс Бижу',
          icon: require('@/assets/images/category02.svg')
        },
        {
          id: 3,
          image: require('@/assets/images/building01.jpg'),
          title: 'Title',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis numquam maiores animi cum. Dolorem magni adipisci a est! Fugiat illum tempore iure nesciunt debitis ad nemo distinctio minima, quis amet!',
          date: '01.02.2018',
          link: 'https://www.google.com',
          category: 'Комплекс Бижу',
          icon: require('@/assets/images/category01.svg')
        },
        {
          id: 4,
          image: require('@/assets/images/building01.jpg'),
          title: 'Lorem ipsum',
          description: 'Reiciendis numquam maiores animi cum. Dolorem magni adipisci a est! Fugiat illum tempore iure nesciunt debitis ad nemo distinctio minima, quis amet!',
          date: '01.02.2018',
          link: 'https://www.google.com',
          category: 'Комплекс Бижу',
          icon: require('@/assets/images/category02.svg')
        }
      ]
    }
  },
  mounted () {
    let animateBox = document.getElementsByClassName('animate-box')
    window.addEventListener('scroll', function () {
      for (let index = 0; index < animateBox.length; index++) {
        let windowBottom = animateBox[index].getBoundingClientRect().bottom
        if (windowBottom - window.innerHeight <= 0) {
          animateBox[index].classList.add('visible')
        }
      }
    })
  }
}
</script>

<style lang="scss">
  .active-component {
    .all-news {
      .news-listing {
        .news-article:first-of-type {
          .img-box:before,
          .img-box img {
            transform: translateX(0);
            opacity: 1;
          }
        }
      }
    }
  }
  .all-news {
    position: relative;
    padding-right: 195px;
    padding-top: 200px;
    .caption {
      margin-bottom: 50px;
      .title:after {
        border-color: #fa6902;
      }
    }
    &:before {
      content: '';
      position: absolute;
      z-index: 0;
      left: 0;
      right: 0;
      top: 0;
      height: 450px;
      background-color: #232323;
    }
    .container {
      max-width: 1100px;
      width: 100%;
      margin: 0 auto;
      padding-left: 20px;
      padding-right: 20px;
    }
    .news-article {
      margin-bottom: 70px;
      &:first-child {
        .date {
          color: #fff;
        }
      }
      .date {
        color: #2c2c2c;
      }
      .article-title,
      .article-title a {
        color: #2c2c2c;
        font-weight: 700;
      }
      p {
        font-size: 17px;
      }
    }
  }
</style>
