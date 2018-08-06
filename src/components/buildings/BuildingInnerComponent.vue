<template>
<div class="inner-building">
  <h3>Inner Building</h3>
  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam amet quam placeat odit molestias est quos, iure sed excepturi delectus, necessitatibus, exercitationem dignissimos. Magni hic consequuntur asperiores modi nostrum minus.</p>
  <img src="@/assets/images/building01.jpg" class="img" alt="">
  <div class="text">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, accusamus praesentium! Non repudiandae perspiciatis voluptates, iste, accusamus exercitationem vitae ratione repellat quos ea a error assumenda saepe, natus possimus in!
    Officia, mollitia iusto, itaque, similique praesentium asperiores harum quibusdam exercitationem ut illo magni veniam voluptatibus incidunt. Tempora expedita delectus harum cum nemo ducimus odit voluptates ad alias! Similique, voluptates tempora?
    Aut optio possimus cumque modi quod dignissimos voluptatibus in deserunt rem ex dolore at, exercitationem fugiat quos eos nam reprehenderit assumenda ipsum qui numquam molestias quia! Maiores dolor consequuntur exercitationem.
    Repellat beatae perferendis numquam quia itaque tempore laborum id, aliquid ullam ipsum quas! Sint nostrum harum qui neque esse, in eum mollitia voluptatibus voluptate libero ex ullam consequatur, placeat accusantium.
    Inventore enim officiis praesentium earum architecto veritatis libero ratione possimus dolore sequi, sed assumenda a quas quos necessitatibus dignissimos omnis ipsa placeat dolorem dicta cum tempora. Maiores eius accusantium ab!
    Quisquam eum eveniet voluptatum quam ipsam, porro culpa facere veniam amet veritatis omnis rem nulla beatae velit. Quas, obcaecati, repellendus voluptas nulla voluptatibus deserunt necessitatibus consequatur numquam possimus animi dolorem!
    Porro pariatur fuga nostrum earum impedit delectus aliquam, laboriosam iure vitae magnam nisi sit ratione voluptate dolore quisquam neque! Cum, exercitationem atque. Commodi eveniet explicabo pariatur omnis est accusantium. Nemo!
    Fugiat, ea officiis porro eum eveniet vitae. Aliquid nisi corporis libero aspernatur dolorem qui in, temporibus dignissimos esse harum nihil repudiandae sequi velit ullam maiores illo exercitationem vitae praesentium soluta!
    Blanditiis debitis nobis voluptatum minima reiciendis distinctio illum atque quibusdam laboriosam et dolor porro, impedit hic doloribus, saepe, odit at veniam cum eum quae! Debitis repudiandae placeat voluptatum ipsam tempora.
    Voluptas ratione maiores fuga nam aperiam distinctio adipisci dolore consequuntur repellat, itaque temporibus. Delectus doloremque, tempora quisquam beatae expedita facilis esse ut atque aliquam eaque recusandae harum molestias laborum sunt.
  </div>
  <img src="@/assets/images/building01.jpg" class="animate-box" alt="">
  <div class="text">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, libero reiciendis voluptatibus, incidunt eveniet nobis sint dicta, dolore in quis distinctio. Enim nobis culpa consequuntur pariatur nemo quam ipsam iste!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum temporibus officia laboriosam eaque accusamus aspernatur quidem reiciendis numquam sequi fugiat, necessitatibus eius perferendis pariatur maxime aliquam est assumenda ex adipisci.
  </div>
  <img src="@/assets/images/building01.jpg" class="animate-box" alt="">
  <div class="text">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, libero reiciendis voluptatibus, incidunt eveniet nobis sint dicta, dolore in quis distinctio. Enim nobis culpa consequuntur pariatur nemo quam ipsam iste!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum temporibus officia laboriosam eaque accusamus aspernatur quidem reiciendis numquam sequi fugiat, necessitatibus eius perferendis pariatur maxime aliquam est assumenda ex adipisci.
  </div>
</div>
</template>

<script>
export default {
  name: 'building-inner',
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
.img {
  max-width: 500px;
  margin: 50px auto;
  display: block;
  transform: translateX(-100px);
  opacity: 0;
  visibility: hidden;
  transition: all 1.4s;
}
.animate-box {
  max-width: 500px;
  margin: 20px auto;
  display: block;
  visibility: hidden;
  opacity: 0;
  transition: all .3s;
  transform:translateX(100px);

  &.visible {
    visibility: visible;
    opacity: 1;
    transform: translateX(0);
  }
}
.inner-building {
  background: #f7f7f7;
  padding: 100px;
  transition: all 1.4s;

  &.active {
    background: #cfcfcf;

    .img {
      transform: translateX(0);
      opacity: 1;
      visibility: visible;
    }
  }
}
</style>
