<template>
  <div class="main-content">
    <navinner-component :navTitle="title" />
    <div class="error-page">
      <div class="caption">
        <div class="title-box">
          <h1 class="title">Тази страница нe беше намерена</h1>
        </div>
        <h2>404 </h2>
      </div>
    </div>
  </div>
</template>
<script>
import NavinnerComponent from '@/components/layout/NavinnerComponent'
export default {
  name: 'error404',
  components: {
    'navinner-component': NavinnerComponent
  },
  data () {
    return {
      title: '404 Грешка'
    }
  }
}
</script>

<style lang="scss">
.error-page {
  background-color: #232323;
  display: flex;
  align-items: center;
  height: 100vh;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 55%;
    background: #fa6a02;
    z-index: 0;
  }
  .caption {
    width: 100%;
    padding-right: 195px;
    position: relative;
    z-index: 100;
  }
  h2 {
    color: #fff;
    font-size: 358px;
    font-weight: 700;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
    &:before {
      content: '';
      width: 1px;
      height: 131px;
      background: #979797;
      display: inline-block;
      margin-right: 70px;
    }
  }
}
</style>
