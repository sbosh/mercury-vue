<template>
  <div class="apartment-inner" v-if="apartment">
    <mq-layout mq="md+" class="left-sidebar">
      <div class="top">
        <router-link :to="'/' + lang"><img src="@/assets/images/logo-filter.svg" class="logo" alt=""></router-link>
        <div class="back-btn">{{ $t('back_building') }}</div>
        <div class="back-btn">{{ $t('back_floor') }}</div>
      </div>
      <div class="available-from">
        <div class="status">{{ $t('status') }}: <div class="available">{{ $t('available') }}</div></div>
        <div class="input-group">
          <label for="">{{ $t('selected_block') }}:</label>
          <select name="" id="">
            <option value="Вход А">{{ $t('block') }} А</option>
          </select>
        </div>
      </div>
      <div class="floor-plan">
        <div class="text">{{ $t('floor_layout') }}:</div>
        <img src="@/assets/images/floor-plan.png" alt="">
      </div>
    </mq-layout>
    <div class="apartment-info">
      <div class="apartment-header">
        <div class="left">
          <div class="title"><h1>{{ apartment.rooms }} - {{ $t('room_apartment') }}</h1></div>
          <div class="sqm">{{ apartment.living_area }} m2</div>
        </div>
        <div class="right">
          <div class="">
            <div class="text">{{ $t('total_price') }}:</div>
            <div class="price">{{ apartment.price }} <div class="currency drop-arrow">euro <span class="dropdown">bgn</span></div></div>
          </div>
          <div>
            <div class="text">{{ $t('price_per_m') }} m²:</div>
            <div class="price">{{ apartment.price_m2 }} <div class="currency">eur</div></div>
          </div>
        </div>
      </div>
      <div class="apartment-content">
        <div class="sidebar">
          <h3>{{ $t('apartment_information') }}</h3>
          <ul>
            <li>Всекидневна <span>29 m²</span></li>
            <li>Всекидневна <span>29 m²</span></li>
            <li>Спалня 2 <span>15 m²</span></li>
            <li>Баня с wc <span>13.3 m²</span></li>
            <li>Wc <span>3.4 m²</span></li>
            <li>Тераса <span>5 m²</span></li>
          </ul>
          <mq-layout mq="sm" class="status-mobile">
            <div class="text">{{ $t('status') }}</div>
            <div class="status available">{{ $t('available') }}</div>
          </mq-layout>
          <a @click="contactFormActive = !contactFormActive" class="btn">{{ $t('send_request') }}</a>
          <div class="popup" v-bind:class="{ active: contactFormActive }" >
            <h2 class="popup-title">Направи запитване</h2>
            <div class="close" @click="contactFormActive = false">Затвори</div>
            <contact-form />
          </div>
          <div class="donwload-pdf">
            <a href="" class="btn-pdf">{{ $t('download_pdf') }}</a>
          </div>
          <mq-layout mq="sm" class="buttons">
            <a href="" class="btn">Към сградата</a>
            <a href="" class="btn">Към етажа</a>
          </mq-layout>
        </div>
        <div class="apartment-florplan">
          <img :src="apartment.image" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ContactForm from '@/components/contactForm/ContactForm'
export default {
  name: 'apartment',
  components: { ContactForm },
  data () {
    return {
      contactFormActive: false
    }
  },
  metaInfo () {
    return {
      title: this.apartment ? this.apartment['seo_title_' + this.$i18n.locale] : ''
    }
  },
  computed: {
    lang () {
      return this.$i18n.locale
    },
    apartment: function () {
      return this.$store.getters.getApartment(Number(this.$route.params.id), this.$route.params.slug)
    },
    ...mapState({
      contacts: state => state.pages.contacts
    })
  }
}
</script>

<style lang="scss">
.popup {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(#000, .5);
  z-index: -1;
  opacity: 0;
  visibility: hidden;
  overflow: auto;
  transition: all .7s;
  transform: translateX(-100%);
  .close {
    color: #fff;
    font-size: 20px;
    font-weight: 500;
    padding: 30px;
    cursor: pointer;
    position: fixed;
    right: 0;
    top: 0;
  }
  .popup-title {
    font-size: 24px;
    text-align: center;
    color: #fff;
    font-weight: 500;
    margin-top: 3%;
  }
  form {
    margin: 5% 10%;
    background: #fff;
    padding: 5%;
    transform: translateY(100%);
    transition-delay: 1s;
    transition-property: all;
    transition-duration: .7s;
    h3 {
      color: #2c2c2c;
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 10px;
      margin-top: 20px;
      &:first-of-type {
        margin-top: 0;
      }
    }
  }
  &.active {
    z-index: 99999;
    opacity: 1;
    visibility: visible;
    transform: translateX(0);
    form {
      transform: translateY(0);
    }
  }
}
.apartment-info {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-left: 250px;
  padding-right: 250px;
  height: 100%;
  min-height: 100vh;
  .apartment-header {
    width: 100%;
    border-bottom: 1px solid #dfdfdf;
    padding: 30px 0;
    margin-bottom: 50px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .left {
      margin-right: auto;
      .sqm {
        font-weight: 600;
        color: #8d8d8d;
        font-size: 20px;
      }
    }
    .right {
      display: flex;
      margin-left: auto;
      margin-top: auto;
      >div:first-of-type {
        border-right: 1px solid #dfdfdf;
        padding-right: 40px;
        padding-left: 0;
      }
      >div {
        padding-left: 40px;
      }
      .text {
        color: #8d8d8d;
        font-family: "Fira Sans";
        font-size: 10px;
        font-weight: 500;
        text-transform: uppercase;
      }
      .price {
        color: #000;
        font-size: 24px;
        font-weight: 600;
        .currency {
          font-weight: 300;
          position: relative;
          display: inline-block;
          &.drop-arrow {
            &:after {
              content: '';
              width: 0;
              height: 0;
              border-style: solid;
              border-width: 6px 4px 0 4px;
              border-color: #fa6902 transparent transparent transparent;
              margin-top: 12px;
              margin-left: 10px;
              float: right;
              display: inline-block;
              transition: all .3s;
            }
          }
          &:hover {
            .dropdown {
              visibility: visible;
              opacity: 1;
            }
            &.drop-arrow:after {
              transform: rotate(90deg);
            }
          }
          .dropdown {
            position: absolute;
            left: 0;
            top: 100%;
            visibility: hidden;
            opacity: 0;
            transition: all .3s;
          }
        }
      }
    }
  }
  .apartment-content {
    display: flex;
    justify-content: space-around;
    flex-direction: row-reverse;
    align-items: stretch;
    margin-bottom: auto;
    .apartment-florplan {
      img,
      svg {
        max-width: 100%;
      }
    }
    .sidebar {
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      padding-left: 40px;
      ul {
        counter-reset: counter;
        padding: 0;
        margin: 0;
        li {
          color: #4a4a4a;
          font-family: "Fira Sans";
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 4px;
          list-style: none;
          display: flex;
          align-items: center;
          &:nth-child(even) {
            background: #f2f2f2;
          }
          &:before {
            counter-increment: counter;
            content: counters(counter,".");
            width: 36px;
            height: 36px;
            line-height: 36px;
            color: #fff;
            background-color: #fa6a02;
            text-align: center;
            margin-right: 9px;
            display: inline-block;
          }
          span {
            margin-left: auto;
          }
        }
      }
      .btn {
        color: #000;
        border-color: #fa6a02;
        padding: 20px;
        display: inline-block;
        margin-right: auto;
        width: auto;
        text-align: center;
        transition: all .3s;
        cursor: pointer;
        &:hover {
          color: #fff;
          background: #fa6a02;
        }
        &:after,
        &:before {
          display: none;
        }
      }
      .donwload-pdf {
        .btn-pdf {
          color: #000;
          font-family: "Fira Sans";
          font-size: 13px;
          font-weight: 400;
          line-height: 17px;
          text-decoration: none;
          display: flex;
          align-items: center;
          &:before {
            content: '';
            width: 54px;
            height: 53px;
            background-color: #eee;
            background-image: url(~@/assets/images/arrow-pdf.svg);
            background-position: center center;
            background-repeat: no-repeat;
            display: inline-block;
            margin-right: 18px;
            border: 1px solid transparent;
            transition: all .3s;
          }
          &:hover {
            text-decoration: underline;
            &:before {
              background-position: center 16px;
              border-color: #fa6a02;
            }
          }
        }
      }
    }
  }
  @media screen and(max-width: 768px) {
    padding: 0 25px;
    .apartment-header {
      flex-direction: column;
      padding: 0;
      margin: 0 0 30px 0;
      .left {
        margin: 0 0 30px 0;
        width: 100%;
        .sqm {
          color: #2c2c2c;
          font-size: 14px;
          font-weight: 700;
          line-height: 25px;
        }
      }
      .right {
        margin: 0 0 20px 0;
        >div {
          padding: 0;
        }
        >div:last-of-type {
          padding-left: 24px;
        }
        .price {
          color: #000;
          font-size: 20px;
          font-weight: 600;
        }
      }
      .title {
        h1 {
          color: #2c2c2c;
          font-size: 20px;
          font-weight: 700;
          line-height: 25px;
        }
      }
    }
    .apartment-content {
      flex-direction: column-reverse;
      .sidebar {
        margin-top: 40px;
        padding-left: 0;
        h3 {
          color: #2c2c2c;
          font-size: 17px;
          font-weight: 700;
          line-height: 24px;
          margin-bottom: 20px;
        }
        ul {
          margin-bottom: 20px;
        }
        .btn {
          width: 100%;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          box-sizing: border-box;
          padding: 25px 20px;
          margin: 30px 0;
        }
        .status-mobile {
          .text {
            color: #8d8d8d;
            font-family: "Fira Sans";
            font-size: 11px;
            font-weight: 500;
            text-transform: uppercase;
            margin-bottom: 5px;
          }
          .status {
            color: #22a314;
            font-size: 17px;
            font-weight: 600;
            text-transform: none;
          }
        }
        .buttons {
          border-top: 1px solid rgba(#979797, .37);
          margin-top: 30px;
          padding: 30px 0;
          display: flex;
          justify-content: space-between;
          .btn {
            width: 47%;
            background-color: #eee;
            border-color: #eee;
            color: #000;
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            margin: 0;
          }
        }
      }
    }
  }
}
.apartment-inner {
  .status {
    color: #8d8d8d;
    font-family: "Fira Sans";
    font-size: 11px;
    font-weight: 500;
    text-transform: uppercase;
    .available {
      color: #22a314;
      font-size: 20px;
      font-weight: 600;
    }
    .unavailable {
      color: red;
      font-size: 20px;
      font-weight: 600;
    }
  }
  @media screen and (max-width: 768px ) {
    margin-top: 90px;
  }
}
.left-sidebar {
  width: 195px;
  border-right: 1px solid #979797;
  background: #f8f8f8;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding-left: 25px;
  padding-right: 25px;
  box-sizing: border-box;
  padding-bottom: 20px;
  padding-top: 20px;
  .router-link-active {
    margin: 0px auto 10px auto;
    display: block;
    text-align: center;
  }
  .back-btn {
    color: #000;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    background-color: #eeeeee;
    display: block;
    padding: 20px 10px;
    text-align: left;
    cursor: pointer;
    margin-top: 10px;
    &:before {
      content: '';
      width: 19px;
      height: 12px;
      background: url(~@/assets/images/back-arrow-gray.svg) no-repeat center;
      display: inline-block;
      transform: rotate(90deg);
    }
  }
  .floor-plan {
    margin-top: auto;
    .text {
      color: #8d8d8d;
      font-family: "Fira Sans";
      font-size: 11px;
      font-weight: 500;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
    img {
      max-width: 100%;
    }
  }
  .available-from {
    text-align: left;
    width: 100%;
    margin: auto;
    .text {
      display: block;
      color: #8d8d8d;
      font-family: "Fira Sans";
      font-size: 11px;
      font-weight: 500;
      text-transform: uppercase;
    }
    .input-group {
      margin: 20px 0;
    }
    label {
      color: #8d8d8d;
      font-family: "Fira Sans";
      font-size: 11px;
      font-weight: 500;
      text-transform: uppercase;
      margin-bottom: 6px;
      display: block;
    }
    select {
      width: 100%;
      height: 43px;
      line-height: 44px;
      border: 1px solid #c0c0c0;
      color: #000;
      font-size: 14px;
      font-weight: 600;
      outline: none;
      padding-left: 20px;
    }
    span {
      color: #8d8d8d;
      font-size: 24px;
      text-transform: uppercase;
      font-weight: 400;
      &:first-of-type {
        color: #000;
        font-weight: 600;
      }
    }
  }
}
</style>
