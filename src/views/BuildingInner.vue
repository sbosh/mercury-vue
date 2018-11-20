<template>
  <div class="building-content">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'building-inner'
}
</script>

<style lang="scss" scoped>
.page-enter-active, .page-leave-active {
  transition: opacity 1s, transform 1s;
}
.page-enter, .page-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}
</style>
