<template>
    <div class="cookies-box">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni rem numquam error voluptate pariatur a, molestias sit, distinctio vel quia minima quis necessitatibus! Similique praesentium voluptate atque vero eius voluptates.
      <div id="agree" @click="agreeCookies()">agree</div>
    </div>
</template>

<script>
export default {
  name: 'cookies-box'
}
</script>

<style>
.cookies-box {
  position: fixed;
  right: 195px;
  bottom: 0;
  z-index: 99999;
  padding: 20px;
  background: #333;
  width: 300px;
  color: #fff;
  display: none !important;
}
</style>
