<template>
  <div class="news-listing">
    <news-listing-item
    v-for="article in articles"
    :key="article.id"
    :id="article.id"
    :title="article[$t('i18n_title')]"
    :description="article[$t('i18n_annonce')]"
    :image="article.image"
    :link="article[$t('i18n_slug')]"
    :date="article.date"
    :category="article.category"
    :icon="article.icon"
    :whithCategory="whithCategory" />
    <h1 style="color: #000;">{{ $t('i18n_title') }}</h1>
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
