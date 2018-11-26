<template>
  <div class="main-content terms">
    <mq-layout mq="md+"><navinner-component :navTitle="$t('terms')" /></mq-layout>
    <mq-layout mq="sm" class="mobile-header"><h1 class="title">{{ $t('terms') }}</h1></mq-layout>
    <div class="tersm-container">
      <h1>Lorem ipsum dolor sit amet.</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas quam, similique ratione unde laudantium assumenda repudiandae quaerat totam incidunt. Quasi qui, aperiam, impedit quod deleniti eaque fuga at. Laudantium, sed.</p>
      <ol>
        <li><a href="">Test 1</a></li>
        <li><a href="">Test 2</a></li>
        <li><a href="">Test 3</a></li>
        <li><a href="">Test 4</a></li>
      </ol>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim fugit dolorem, ea. Sed earum totam voluptate enim, illo quis alias ut magnam? Nesciunt dolore ullam molestias, excepturi doloremque, vero cupiditate.</p>
      <ul>
        <li>Test 1</li>
        <li>Test 2</li>
        <li>Test 3</li>
        <li>Test 4</li>
      </ul>
    </div>
    <footer-component />
  </div>
</template>
<script>
import FooterComponent from '@/components/layout/FooterComponent'
import NavinnerComponent from '@/components/layout/NavinnerComponent'
export default {
  name: 'terms',
  components: { FooterComponent, NavinnerComponent }
}
</script>

<style lang="scss">
.terms {
  position: relative;
  padding-top: 200px;
  &:before {
    content: '';
    position: absolute;
    height: 500px;
    left: 0;
    right: 0;
    top: 0;
    z-index: -1;
    background: #232323;
  }
  .tersm-container {
    max-width: 1200px;
    margin-left: 195px;
    margin-right: 195px;
    padding: 40px;
    background: #f8f8f8;
    margin-bottom: 40px;
  }
}
.mobile-header {
  background: #232323;
  padding: 90px 25px 25px;
  .title {
    color: #fff;
    font-size: 34px;
  }
}
</style>
