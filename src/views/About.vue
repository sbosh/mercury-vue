<template>
  <div class="main-content">
    <navinner-component/>
    <div class="about-us">
      <div class="caption">
        <div class="title-box">
          <h1>За компанията</h1>
          <h2 class="title">Mercury99 е строителна фирма. <br>Ние създаваме иновативни комплекси, сгради.</h2>
        </div>
      </div>
      <h2>{{ $t('message') }}</h2>
      <p>{{ $t('text') }}</p>
      <div class="history">
        <div class="caption">
          <div class="title-box">
            <h2 class="title">История</h2>
          </div>
        </div>
      </div>
    </div>
    <footer-component/>
  </div>
</template>
<script>
import FooterComponent from '@/components/layout/FooterComponent'
import NavinnerComponent from '@/components/layout/NavinnerComponent'
export default {
  name: 'about',
  components: { FooterComponent, NavinnerComponent }
}
</script>

<style lang="scss">
  .about-us {
    background-color: #232323;
    padding-top: 120px;

    .caption {
      .title-box {
        .title {
          color: #fff;
        }
      }
    }

    .history {
      background-color: #f8f8f8;

      .caption {
        .title-box {
          .title {
            color: #2c2c2c;
            &:after {
              border-color: #fa6a02;
            }
            &:before {
              background: #8d8d8d;
            }
          }
        }
      }
    }//history
  }
</style>
