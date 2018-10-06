<template>
  <div class="company-component">
    <div class="caption">
      <div class="title-box">
        <h1 class="title">За компанията</h1>
        <h2>Mercury99 е строителна фирма. <br>Ние създаваме иновативни комплекси, сгради.</h2>
      </div>
    </div>
    <div class="img-box">
      <img src="@/assets/images/about-team.jpg" alt="">
    </div>
    <div class="caption">
      <div class="title-box">
        <h3 class="title">Consetetur sadipscing elitr, sed diam</h3>
      </div>
    </div>
    <div class="description">
      <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
      <br>
      <blockquote >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum fugit inventore corrupti, culpa quam consequuntur quia nulla temporibus est facilis accusantium ipsam unde ducimus sit, eius deserunt excepturi dignissimos itaque.
      </blockquote>
    </div>
  </div>
</template>

<script>
export default {
  name: 'company-component'
}
</script>

<style lang="scss" scoped>
.company-component {
  background-image: linear-gradient(#232323 50%, #fff 50%);
  padding-top: 200px;
  padding-right: 195px;
  .caption {
    margin-bottom: 50px;
    .title-box {
      h1.title {
        color: #6e6e6e;
        font-family: "Fira Sans";
        font-size: 17px;
        font-weight: 400;
        line-height: 23px;
        &:after {
          border-color: #fa6a02;
        }
      }
      h3.title {
        color: #2c2c2c;
        &:before {
          background-color: #8d8d8d;
        }
        &:after {
          border-color: #fa6a02;
        }
      }
      h2 {
        color: #fff;
        font-size: 42px;
        font-weight: 600;
        line-height: 57px;
        max-width: 800px;
      }
    }
  }
  blockquote {
    padding-left: 60px;
    border-left: 1px solid #979797;
    margin: 0;
  }
  blockquote,
  p {
    margin: 0;
    color: #363636;
    font-family: "Fira Sans";
    font-size: 17px;
    font-weight: 400;
    line-height: 23px;
  }
  .description {
    padding: 0 195px 100px 240px;
  }
  .img-box {
    padding: 0 195px;
    margin-bottom: 80px;
    img {
      max-width: 100%;
      height: auto;
    }
  }
  @media screen and(max-width: 768px) {
    padding: 0 25px;
    background: #fff;
    margin-bottom: 0px;
    margin-top: -1px;
    position: relative;
    &:before {
      content: '';
      position: absolute;
      z-index: 0;
      left: 0;
      right: 0;
      top: 0;
      height: 360px;
      background: #232323;
    }
    .img-box {
      margin-bottom: 25px;
      padding: 0;
    }
    div {
      z-index: 100;
      position: relative;
    }
    .caption {
      margin-left: -25px;
      margin-bottom: 30px;
      .title-box {
        padding-left: 45px;
        h3.title {
          font-size: 30px;
          line-height: 34px;
        }
        .title {
          margin-bottom: 25px;
          &:before {
            margin-right: 25px;
          }
          &:after {
            margin-right: 12px;
          }
        }
        h2 {
          font-size: 24px;
          line-height: 28px;
          font-weight: 500;
        }
      }
    }
    .description {
      padding: 25px 0;
    }
    blockquote {
      padding-left: 20px;
    }
  }
}
</style>
