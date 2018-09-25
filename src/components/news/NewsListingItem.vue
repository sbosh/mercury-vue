<template>
  <article class="news-article animate-box">
    <div class="date">{{ date }}</div>
    <div class="img-box">
      <router-link :to="'/' + $i18n.locale + '/article/' + id + '/' + link"><img :src="image" alt=""></router-link>
    </div>
    <div class="info-box">
      <h3 class="article-title"><router-link :to="'/' + $i18n.locale + '/article/' + id + '/' + link">{{ title }}</router-link></h3>
      <p>{{ description }}</p>
      <div class="link"><router-link :to="'/' + $i18n.locale + '/article/' + id + '/' + link">Прочети повече</router-link></div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'news-listing-item',
  props: ['id', 'title', 'description', 'date', 'image', 'link', 'icon', 'category']
}
</script>
