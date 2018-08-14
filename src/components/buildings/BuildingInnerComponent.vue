<template>
<div class="inner-building">
  <navinner-component/>
  <div class="inner-building-header">
    <div class="animate-box">
      <img src="@/assets/images/building01.jpg" class="img" alt="">
    </div>
    <div class="btn-box"><a href="" class="btn">ВИЖ СХЕМАТА на блока</a></div>
  </div>
  <div class="caption">
    <div class="title-box">
      <h2 class="title">За<br> сградата</h2>
    </div>
    <div class="text">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos distinctio rerum explicabo dolore cupiditate laudantium? In illo, veniam fuga nam, amet sunt incidunt excepturi rerum rem et aperiam, error ea.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis architecto voluptatem nihil fugit debitis repellendus, molestiae, perferendis adipisci ex, hic voluptate possimus quasi? Excepturi, consequuntur reiciendis obcaecati neque, veniam nostrum!</p>
    </div>
  </div>
</div>
</template>

<script>
import NavinnerComponent from '@/components/layout/NavinnerComponent'
export default {
  name: 'building-inner',
  components: { NavinnerComponent },
  mounted () {
    let $this = this
    setTimeout(function () {
      $this.$el.classList.add('active')
    }, 1000)
    let animateBox = document.getElementsByClassName('animate-box')
    window.addEventListener('scroll', function () {
      for (let index = 0; index < animateBox.length; index++) {
        let windowBottom = animateBox[index].getBoundingClientRect().bottom
        if (windowBottom - window.innerHeight <= 0) {
          animateBox[index].classList.add('visible')
        }
      }
    })
  }
}
</script>

<style lang="scss">
.caption {
  .text {
    padding-left: 195px;
    p {
      column-count: 2;
    }
  }
}
.img {
  max-width: 100%;
  display: block;
  transform: translateX(-100px);
  opacity: 0;
  visibility: hidden;
  transition: all 1.4s;
}
.animate-box {
  display: block;
  visibility: hidden;
  opacity: 0;
  transition: all .3s;
  transform: translateX(100px);
  img {
    display: block;
  }
  &.visible {
    visibility: visible;
    opacity: 1;
    transform: translateX(0);
  }
}
.inner-building-header {
  transition: all 1.4s;
  background-color: #232323;
  padding-left: 195px;
  padding: 130px 0 0 195px;
  .btn-box {
    margin-top: -40px;
    .btn {
      background-color: #fa6a02;
      border-color: #fa6a02;
    }
  }
}
.inner-building {
  padding: 0 195px 0 0;

  .caption .title {
    color: #2c2c2c;
    &:before {
      background: #2c2c2c;
    }
    &:after {
      border-color: #fa6a02;
    }
  }

  &.active {
    .img {
      transform: translateX(0);
      opacity: 1;
      visibility: visible;
    }
  }
}
</style>
