<template>
  <div class="news-listing">
    <news-listing-item
    v-for="article in articles"
    :key="article.id"
    :title="article.title"
    :description="article.description"
    :image="article.image"
    :link="article.link"
    :date="article.date" />
  </div>
</template>

<script>
import NewsListingItem from './NewsListingItem'
export default {
  name: 'news-listing',
  components: {
    'news-listing-item': NewsListingItem
  },
  props: ['articles']
}
</script>
