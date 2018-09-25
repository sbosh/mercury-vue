<template>
  <div class="news-listing">
    <news-listing-item
    v-for="article in articles"
    :key="article.id"
    :id="article.id"
    :title="article['title_' + $i18n.locale]"
    :description="article['annonce_' + $i18n.locale]"
    :image="article.image"
    :link="article['slug_' + $i18n.locale]"
    :date="article.date"
    :category="article.category"
    :icon="article.icon" />
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
