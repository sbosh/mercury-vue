<template>
  <div class="news-article">
    <div class="date">{{ date }}</div>
    <div class="img-box"><a :href="link"><img :src="image" alt=""></a></div>
    <div class="info-box">
      <h3 class="article-title"><a :href="link">{{ title }}</a></h3>
      <p>{{ description }}</p>
      <div class="link"><a :href="link">Прочети повече</a></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'news-listing-item',
  props: ['title', 'description', 'date', 'image', 'link']
}
</script>
