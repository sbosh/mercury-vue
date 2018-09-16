<template>
  <article class="news-article animate-box">
    <div class="date">{{ date }}</div>
    <div class="img-box">
      <a :href="link"><img :src="image" alt=""></a>
      <div class="category" v-if="whithCategory">
        <div class="icon"><img :src="icon" alt=""></div>
        <div class="text">{{ category }}</div>
      </div>
    </div>
    <div class="info-box">
      <h3 class="article-title"><a :href="link">{{ title }}</a></h3>
      <p>{{ description }}</p>
      <div class="link"><a :href="link">Прочети повече</a></div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'news-listing-item',
  props: ['title', 'description', 'date', 'image', 'link', 'icon', 'category', 'whithCategory']
}
</script>
