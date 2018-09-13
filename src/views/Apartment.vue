<template>
  <div class="apartment-inner">
    <div class="left-sidebar">
      <div class="top">
        <router-link :to="'/' + lang"><img src="@/assets/images/logo-filter.png" class="logo" alt=""></router-link>
        <div class="back-btn">Към сградата</div>
        <div class="back-btn">Към етажа</div>
      </div>
      <div class="available-from">
        <div class="status">Статус: <div class="available">Свободен</div></div>
        <div class="input-group">
          <label for="">Избран вход:</label>
          <select name="" id="">
            <option value="Вход А">Вход А</option>
            <option value="Вход А">Вход Б</option>
            <option value="Вход А">Вход В</option>
          </select>
        </div>
      </div>
      <div class="floor-plan">
        <div class="text">Етажно разположение:</div>
        <img src="@/assets/images/floor-plan.png" alt="">
      </div>
    </div>
    <div class="apartment-info">
      <div class="apartment-header">
        <div class="left">
          <div class="title"><h1>3-стаен апартамент</h1></div>
          <div class="sqm">86,4 m2</div>
        </div>
      </div>
      <div class="apartment-content">
        <div class="sidebar">
          <h3>Информация за апартамента</h3>
          <ol>
            <li>Всекидневна <span>29 m²</span></li>
            <li>Всекидневна <span>29 m²</span></li>
            <li>Спалня 2 <span>15 m²</span></li>
            <li>Баня с wc <span>13.3 m²</span></li>
            <li>Wc <span>3.4 m²</span></li>
            <li>Тераса <span>5 m²</span></li>
          </ol>
          <a href="" class="btn">Изпрати запитване</a>
        </div>
        <div class="apartment-florplan">
          <img src="@/assets/images/apartment.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'apartment',
  computed: {
    lang () {
      return this.$i18n.locale
    }
  }
}
</script>

<style lang="scss">
.apartment-info {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-left: 250px;
  padding-right: 250px;
  .apartment-header {
    width: 100%;
    border-bottom: 1px solid #dfdfdf;
    padding: 30px 0;
    display: flex;
    justify-content: space-between;
  }
  .apartment-content {
    display: flex;
    justify-content: space-around;
    flex-direction: row-reverse;
    align-items: stretch;
    .sidebar {
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      ol {
        li {
          color: #4a4a4a;
          font-family: "Fira Sans";
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 4px;
          span {
            float: right;
          }
        }
      }
      .btn {
        color: #000;
        border-color: #fa6a02;
        padding: 20px;
        &:after,
        &:before {
          display: none;
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
    padding: 20px 15px;
    text-align: center;
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
