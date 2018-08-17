<template>
  <div class="news-article">
    <div class="date">01.04.2018</div>
    <div class="img-box"><img src="@/assets/images/article01.jpg" alt="test"></div>
    <h3 class="article-title"><a href="">Title</a></h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis numquam maiores animi cum. Dolorem magni adipisci a est! Fugiat illum tempore iure nesciunt debitis ad nemo distinctio minima, quis amet!</p>
    <div class="link"><a href="">Прочети повече</a></div>
  </div>
</template>

<script>
export default {
  name: 'news-article'
}
</script>

<style lang="scss">
  .news-article {
    position: relative;
    .date {
      position: absolute;
      left: -40px;
      top: 0;
      color: #fff;
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
      writing-mode: tb-rl;
      transform: rotate(-180deg);
    }
    .img-box {
      margin-bottom: 40px;
      img {
        max-width: 100%;
        display: block;
      }
    }
    .article-title a,
    .article-title {
      color: #fff;
      font-size: 20px;
      font-weight: 600;
      line-height: 23px;
      text-decoration: none;
      margin-bottom: 12px;
    }
    p {
      color: #8d8d8d;
      font-family: "Fira Sans";
      font-size: 15px;
      font-weight: 400;
      line-height: 23px;
      margin: 0 0 15px 0;
    }
    .link {
      a {
        color: #8d8d8d;
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        text-decoration: none;
        &:after {
          content: '';
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 4px 0 4px 5px;
          border-color: transparent transparent transparent #fa6902;
          display: inline-block;
          margin: 0 0 0 10px;
        }
      }
    }
  }
</style>
