<template>
  <div class="main-content">
    <div class="contacts-page">
      <navinner-component :navTitle="contacts['title_' + $i18n.locale]"  />
      <div class="contacts-us">
        <form action="">
          <h3>Пиши ни</h3>
          <div class="form-row radio-checkbox-row">
            <div class="form-group radio-group">
              <input type="radio" id="input_property" name="reason" class="form-element" />
              <label for="input_property">Запитване свързано с закупуване на жилище</label>
            </div>
            <hr>
            <div class="form-group radio-group">
              <input type="radio" id="input_company" name="reason" class="form-element" />
              <label for="input_company">Запитване към компанията</label>
            </div>
            <hr>
            <div class="form-group radio-group">
              <input type="radio" id="input_team" name="reason" class="form-element" />
              <label for="input_team">Присъедини се към нашият екип</label>
            </div>
          </div>
          <h3>Име</h3>
          <div class="form-row">
            <div class="form-group">
              <input type="text" name="name" class="form-element" placeholder="Вашето име *" />
            </div>
            <div class="form-group">
              <input type="text" name="company" class="form-element" placeholder="Име на вашата компания">
            </div>
          </div>
          <h3>Информация</h3>
          <div class="form-row">
            <div class="form-group">
              <input type="email" name="email" class="form-element" placeholder="Е-mail *" />
            </div>
            <div class="form-group">
              <input type="tel" name="" class="form-element" placeholder="Телефон">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <input type="text" name="address" class="form-element" placeholder="Адрес" />
            </div>
            <div class="form-group">
              <input type="text" name="time" class="form-element" placeholder="Удобно време за разговор">
            </div>
          </div>
          <h3>Съобщение</h3>
          <div class="form-row">
            <div class="form-group">
              <textarea name="message" class="form-element"></textarea>
            </div>
          </div>
          <div class="form-group">
            <input type="submit" class="send form-element" value="send">
          </div>
        </form>
      </div>
      <div class="google-map">
        <div class="tabs">
          <ul class="nav-tabs">
            <li class="active" @click="tabActive($event, 'tab1')"><a href="">Sofia</a>
              <div class="dropdown">
                <div class="address">Адрес</div>
                <div class="text">София, ул. „Николай Лилиев“ 14</div>
                <br>
                <div class="address">Консултант брокер</div>
                <div class="text">Ани Ботева</div>
                <div class="phone"><a href="tel:+359884626391">+359 884 626 391</a></div>
                <div class="text">sales@mercury99.com</div>
              </div>
            </li>
            <li @click="tabActive($event, 'tab2')"><a href="">Sunny Beach</a>
              <div class="dropdown">
                <div class="address">Адрес</div>
                <div class="text">София, ул. „Николай Лилиев“ 14</div>
                <br>
                <div class="address">Консултант брокер</div>
                <div class="text">Ани Ботева</div>
                <div class="phone"><a href="tel:+359884626391">+359 884 626 391</a></div>
                <div class="text">sales@mercury99.com</div>
              </div>
            </li>
          </ul>
          <div class="tabs-container">
            <div id="tab1" v-if="tab1">
              <GmapMap
                :center="{lat:42.676590, lng:23.320476}"
                :zoom="17"
              >
                <GmapMarker
                  :position="{lat:42.676590, lng:23.320476}"
                  :icon="'https://cdn3.iconfinder.com/data/icons/flat-icons-web/40/Location-128.png'"
                />
              </GmapMap>
            </div>
            <div id="tab2" v-if="tab2">
              <GmapMap
                :center="{lat:42.687657, lng:27.705927}"
                :zoom="17"
                :icon="'https://cdn3.iconfinder.com/data/icons/flat-icons-web/40/Location-128.png'"
              >
                <GmapMarker
                  :position="{lat:42.687657, lng:27.705927}"
                  :icon="'https://cdn3.iconfinder.com/data/icons/flat-icons-web/40/Location-128.png'"
                />
              </GmapMap>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer-component/>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import NavinnerComponent from '@/components/layout/NavinnerComponent'
import FooterComponent from '@/components/layout/FooterComponent'
export default {
  name: 'contacts',
  components: { FooterComponent, NavinnerComponent },
  metaInfo () {
    return {
      title: this.contacts ? this.contacts['seo_title_' + this.$i18n.locale] : ''
    }
  },
  data () {
    return {
      tab1: true,
      tab2: false
    }
  },
  methods: {
    tabActive (e, tab) {
      e.preventDefault()
      let tabs = this.$el.querySelectorAll('.nav-tabs li')
      tabs[0].classList.remove('active')
      tabs[1].classList.remove('active')
      e.currentTarget.classList.add('active')
      if (tab === 'tab1') {
        this.tab1 = true
        this.tab2 = false
      } else {
        this.tab1 = false
        this.tab2 = true
      }
    }
  },
  computed: {
    ...mapState({
      contacts: state => state.pages.contacts
    })
  }
}
</script>

<style lang="scss">
.google-map {
  padding: 0 90px 90px;
  .vue-map-container {
    width: 100%;
    height: 560px;
  }
  .tabs {
    .nav-tabs {
      padding: 0;
      margin: 0 0 0 65px;
      width: 360px;
      position: relative;
      >li {
        list-style: none;
        display: inline-block;
        width: 50%;
        background-color: #fa6a02;
        >a {
          display: block;
          color: #fff;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          text-decoration: none;
          padding: 31px 0;
          text-align: center;
          position: relative;
          &:after {
            content: '';
            position: absolute;
            top: 15px;
            bottom: 15px;
            right: 0;
            width: 1px;
            background: rgba(255,255,255, .2);
          }
          &:before {
            content: '';
            position: absolute;
            bottom: -17px;
            margin-left: -16px;
            left: 50%;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 17px 16px 0 16px;
            border-color: #fa6902 transparent transparent transparent;
            display: block;
            z-index: 9999;
            opacity: 0;
          }
        }
        &:last-child a:after {
          display: none;
        }
        .dropdown {
          position: absolute;
          left: 0;
          right: 0;
          top: 100%;
          background-color: #232323;
          z-index: 999;
          padding: 40px;
          color: #fff;
          visibility: hidden;
          opacity: 0;
          .address {
            font-size: 9px;
            font-weight: 700;
            text-transform: uppercase;
            margin-bottom: 7px;
          }
          .text {
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 8px;
          }
          .phone {
            margin-bottom: 8px;
            a {
              color: #fff;
              text-decoration: none;
              font-size: 18px;
              font-weight: 700;
              text-transform: uppercase;
            }
          }
        }
        &.active {
          a {
            &:before {
              opacity: 1;
            }
          }
          .dropdown {
            visibility: visible;
            opacity: 1;
          }
        }
      }
    }
  }
  @media screen and(max-width: 768px) {
    padding: 0;
    margin-left: -5px;
    margin-right: -5px;
    .tabs {
      .nav-tabs {
        margin: 0;
        width: 100%;
        >li {
          >a {
            font-size: 12px;
            padding: 20px 0;
          }
          .dropdown {
            padding: 20px;
            background-color: rgba(#232323, .61);
          }
        }
      }
    }
  }
}
.contacts-page {
  padding-top: 190px;
  padding-right: 190px;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 591px;
    background-color: #232323;
    z-index: 0;
  }
  .contacts-us {
    background: #fff;
    padding: 70px 110px;
    position: relative;
    z-index: 10;
    margin: 0 160px 120px 160px;

    h3 {
      color: #2c2c2c;
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 20px;
      margin-top: 40px;
      &:first-of-type {
        margin-top: 0;
      }
    }
  }
  hr{
    margin-bottom: 20px;
    border: 1px solid #dfdfdf;
  }
  @media screen and(max-width: 768px) {
    padding: 90px 25px 25px;
    .contacts-us {
      margin: 0 -25px;
      padding: 20px;
    }
  }
}
.form-row:not(.radio-checkbox-row) {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: -10px;
  margin-right: -10px;
  .form-group:not(.radio-group) {
    margin-left: 10px;
    margin-right: 10px;
  }
  @media screen and(max-width: 768px) {
    flex-direction: column;
    margin: 0;
  }
}
.form-group {
  margin-bottom: 20px;
  width: 100%;
  .form-element {
    padding: 21px 20px;
    border: 1px solid #d0d0d0;
    background-color: #ffffff;
    color: #969595;
    font-size: 13px;
    font-weight: 500;
    box-sizing: border-box;
    outline: none;
    resize: none;
    width: 100%;
    &:focus {
      border-color: #fa6a02;
    }
    &.error {
      border-color: #e41616;
    }
    &.send {
      padding: 20px 30px;
      color: #fff;
      background-color: #fa6a02;
      border-color: #fa6a02;
      font-size: 12px;
      width: auto;
      cursor: pointer;
      min-width: 200px;
      margin-top: 30px;
    }
  }
  textarea {
    min-height: 161px;
  }
  &.radio-group {
    input[type=radio]{
      display: none;
    }
    input[type=radio]:checked+label{
      color: #303030;
      &:before {
        background-color: #fff;
        border: 2px solid #fa6a02;
      }
    }
    label {
      position: relative;
      display: block;
      width: 100%;
      color: #757575;
      font-size: 14px;
      font-weight: 500;
      padding-left: 33px;
      height: 20px;
      line-height: 20px;
      cursor: pointer;
      &:before {
        content: '';
        width: 17px;
        height: 17px;
        background-color: #d8d8d8;
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        border-radius: 50%;
        border: 2px solid #d8d8d8;
      }
    }
  }
  @media screen and(max-width: 768px) {
    margin-bottom: 10px;
    &.radio-group {
      margin-bottom: 20px;
      label {
        height: auto;
      }
    }
    .form-element {
      &.send {
        width: 100%;
      }
    }
  }
}
</style>
