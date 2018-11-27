<template>
  <article class="news-article animate-box">
    <div class="date">{{ date }}</div>
    <div class="img-box">
      <router-link :to="'/' + $i18n.locale + '/news/' + id + '/' + link"><img :src="image" alt=""></router-link>
    </div>
    <div class="info-box">
      <h3 class="article-title"><router-link :to="'/' + $i18n.locale + '/news/' + id + '/' + link">{{ title }}</router-link></h3>
      <div class="link"><router-link :to="'/' + $i18n.locale + '/news/' + id + '/' + link">{{ $t('read_more') }}</router-link></div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'news-listing-item',
  props: ['id', 'title', 'description', 'date', 'image', 'link', 'icon', 'category']
}
</script>
