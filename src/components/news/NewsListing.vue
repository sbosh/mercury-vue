<template>
  <div class="news-listing">
    <news-listing-item
    v-for="article in articles"
    :key="article.id"
    :title="article.title"
    :description="article.description"
    :image="article.image"
    :link="article.link"
    :date="article.date"
    :category="article.category"
    :icon="article.icon"
    :whithCategory="whithCategory" />
  </div>
</template>

<script>
import NewsListingItem from './NewsListingItem'
export default {
  name: 'news-listing',
  components: {
    'news-listing-item': NewsListingItem
  },
  props: ['articles', 'whithCategory']
}
</script>
