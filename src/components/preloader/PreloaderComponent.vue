<template>
  <div class="preloader">
    <div class="preloader-content">
      <div class="logo"><img src="@/assets/images/logo-filter.svg" alt=""></div>
      <div class="progress-bar">
        <span>Loading, please wait 100% - {{loaded}}</span>
        <div class="fill" :style="{width:loaded}"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'preloader-component',
  data () {
    return {
      loadingPercent: 0,
      loadTime: 0,
      interval: null
    }
  },
  created () {
    let perfData = window.performance.timing
    let estimatedTime = Math.abs(perfData.loadEventEnd - perfData.navigationStart)
    this.loadTime = parseInt((estimatedTime / 2000) % 60) * 100
    this.doProgress()
  },
  computed: {
    loaded () {
      return this.loadingPercent + '%'
    }
  },
  methods: {
    doProgress () {
      let step = this.loadTime / 100
      this.interval = setInterval(() => {
        this.loadingPercent++
      }, step)
    }
  },
  watch: {
    loadingPercent (val) {
      if (val >= 100) {
        this.$emit('complete')
        clearInterval(this.interval)
      }
    }
  }
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
    .progress-bar {
      width: 90%;
      text-align: center;
      position: relative;
      display: flex;
      box-sizing: border-box;
      span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #ccc;
        font-family: 'Exo 2', sans-serif;
        font-size: 16px;
        font-weight: 600;
        text-transform: uppercase;
      }
    }
    .progress-bar .fill {
      background: #f26b21;
      height: 100%;
      width: 0%;
      padding: 20px;
    }
  }
}
</style>
