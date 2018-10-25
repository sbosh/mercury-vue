<template>
  <div class="preloader">
    <div class="preloader-content">
      <div class="logo">
        <img src="@/assets/images/logo-filter.svg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'preloader-component'
}
</script>

<style lang="scss" scoped>
.preloader {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  background: #fff;
  transition: all 1s;
  .preloader-content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    .logo {
      max-width: 250px;
      width: 100%;
      margin: 50px auto;
      img {
        width: 100%;
      }
    }
  }
}
</style>
