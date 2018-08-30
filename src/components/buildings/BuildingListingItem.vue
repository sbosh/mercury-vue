<template>
  <div class="bg" :style="{ 'background-image': 'url(' + building.bg + ')' }">
    <div class="title"><a :href="building.link">{{ building.title }}</a></div>
  </div>
</template>

<script>
export default {
  name: 'building-listing-item',
  props: ['title', 'bg', 'link', 'fullListing']
}
</script>
