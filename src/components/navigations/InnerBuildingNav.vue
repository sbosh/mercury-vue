<template>
  <ul>
    <li><a href="#about">{{ $t('about_building') }}</a></li>
    <li><a href="#gallery">{{ $t('gallery') }}</a></li>
    <li><a href="#location">{{ $t('location') }}</a></li>
    <li><a href="#news">{{ $t('news') }}</a></li>
    <li class="btn-box"><a href="" class="btn">{{ $t('views_scheme') }}</a></li>
  </ul>
</template>

<script>
export default {
  name: 'inner-building-nav'
}
</script>
