<template>
  <div class="contacts-page">
    <navinner-component :navTitle="title" />
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
    <GmapMap
      :center="{lat:10, lng:10}"
      :zoom="7"
      map-type-id="terrain"
      style="width: 500px; height: 300px"
    >
    </GmapMap>
    </div>
    <footer-component/>
  </div>
</template>
<script>
import NavinnerComponent from '@/components/layout/NavinnerComponent'
import FooterComponent from '@/components/layout/FooterComponent'
export default {
  name: 'contacts',
  components: { FooterComponent, NavinnerComponent },
  data () {
    return {
      title: 'Контакти'
    }
  }
}
</script>

<style lang="scss">
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
      margin: 0 160px 200px 160px;

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
  }
</style>
