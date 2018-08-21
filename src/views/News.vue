<template>
  <div class="all-news">
    <news-listing :articles="articles" />
  </div>
</template>

<script>
import NewsListing from '@/components/news/NewsListing'
export default {
  name: 'news',
  components: {
    'news-listing': NewsListing
  },
  data () {
    return {
      articles: [
        {
          id: 1,
          image: require('@/assets/images/building01.jpg'),
          title: 'Title',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis numquam maiores animi cum. Dolorem magni adipisci a est! Fugiat illum tempore iure nesciunt debitis ad nemo distinctio minima, quis amet!',
          date: '01.02.2018',
          link: 'https://www.google.com'
        },
        {
          id: 2,
          image: require('@/assets/images/building01.jpg'),
          title: 'Lorem ipsum',
          description: 'Reiciendis numquam maiores animi cum. Dolorem magni adipisci a est! Fugiat illum tempore iure nesciunt debitis ad nemo distinctio minima, quis amet!',
          date: '01.02.2018',
          link: 'https://www.google.com'
        },
        {
          id: 3,
          image: require('@/assets/images/building01.jpg'),
          title: 'Title',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis numquam maiores animi cum. Dolorem magni adipisci a est! Fugiat illum tempore iure nesciunt debitis ad nemo distinctio minima, quis amet!',
          date: '01.02.2018',
          link: 'https://www.google.com'
        },
        {
          id: 4,
          image: require('@/assets/images/building01.jpg'),
          title: 'Lorem ipsum',
          description: 'Reiciendis numquam maiores animi cum. Dolorem magni adipisci a est! Fugiat illum tempore iure nesciunt debitis ad nemo distinctio minima, quis amet!',
          date: '01.02.2018',
          link: 'https://www.google.com'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
  .active-component {
    .news-article {
      .img-box {
        &:before,
        img {
          opacity: 1;
          transform: translateX(0);
        }
      }
    }
  }
</style>
