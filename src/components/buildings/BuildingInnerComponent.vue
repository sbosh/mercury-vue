<template>
<div class="inner-building">
  <transition name="slide-fade">
    <div>
    <h3>Inner Building</h3>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam amet quam placeat odit molestias est quos, iure sed excepturi delectus, necessitatibus, exercitationem dignissimos. Magni hic consequuntur asperiores modi nostrum minus.</p>
    <img src="@/assets/images/building01.jpg" alt="">
    </div>
  </transition>
</div>
</template>

<script>
export default {
  name: 'building-inner'
}
</script>

<style>
img {
  max-width: 500px;
  margin: 50px auto;
  display: block;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
