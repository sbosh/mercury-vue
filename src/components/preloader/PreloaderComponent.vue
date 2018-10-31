<template>
  <div class="preloader">
    <div class="preloader-content">
      <div class="loader">
        <span></span>
        <div class="logo"><img src="@/assets/images/logo-filter.svg" alt=""></div>
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
  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 250px;
    height: 250px;
    background: transparent;
    border: 3px solid #fff;
    border-radius: 50%;
    text-align: center;
    line-height: 250px;
  }
  .loader::before {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    width: 100%;
    height: 100%;
    border: 3px solid transparent;
    border-top: 3px solid #fa6a02;
    border-right: 3px solid #fa6a02;
    border-radius: 50%;
    animation: animateCircle 2s linear infinite;
  }
  .loader span {
    display: block;
    position: absolute;
    top: calc(50% - 2px);
    left: 50%;
    width: 50%;
    height: 4px;
    background:transparent;
    transform-origin: left;
    animation: animate 2s linear infinite;
  }
  .loader span::before {
    content: '';
    position: absolute;
    top: -6px;
    right: -8px;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    background: #fa6a02;
    box-shadow: 0 0 10px #fa6a02;
  }
  @keyframes animateCircle {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
  }
  @keyframes animate {
    0% {
        transform: rotate(45deg);
    }
    100% {
        transform: rotate(405deg);
    }
  }
  .preloader-content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    .logo {
      max-width: 130px;
      width: 100%;
      margin: 50px auto;
      perspective: 1000px;
      img {
        width: 100%;
      }
    }
  }
}
</style>
