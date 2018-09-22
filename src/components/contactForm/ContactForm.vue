<template>
  <form @submit="checkForm" method="POST" action="">
    <h3>Пиши ни</h3>
    <div class="form-row radio-checkbox-row">
      <div class="form-group radio-group">
        <input type="radio" id="input_property" v-model="reason" name="reason" class="form-element" />
        <label for="input_property">Запитване свързано с закупуване на жилище</label>
      </div>
      <hr>
      <div class="form-group radio-group">
        <input type="radio" id="input_company" v-model="reason" name="reason" class="form-element" />
        <label for="input_company">Запитване към компанията</label>
      </div>
      <hr>
      <div class="form-group radio-group">
        <input type="radio" id="input_team" v-model="reason" name="reason" class="form-element" />
        <label for="input_team">Присъедини се към нашият екип</label>
      </div>
    </div>
    <h3>Име</h3>
    <div class="form-row">
      <div class="form-group">
        <p class="form-error" v-if="errors.name && errors.name.length" v-text="errors.name"/>
        <input type="text" name="name" v-model="name" class="form-element" placeholder="Вашето име *" />
      </div>
      <div class="form-group">
        <input type="text" name="company" v-model="company" class="form-element" placeholder="Име на вашата компания">
      </div>
    </div>
    <h3>Информация</h3>
    <div class="form-row">
      <div class="form-group">
        <p class="form-error" v-if="errors.email && errors.email.length" v-text="errors.email"/>
        <input type="email" name="email" v-model="email" class="form-element" placeholder="Е-mail *" />
      </div>
      <div class="form-group">
        <input type="tel" name="" v-model="phone" class="form-element" placeholder="Телефон">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <input type="text" name="address" v-model="address" class="form-element" placeholder="Адрес" />
      </div>
      <div class="form-group">
        <input type="text" name="time" v-model="time" class="form-element" placeholder="Удобно време за разговор">
      </div>
    </div>
    <h3>Съобщение</h3>
    <div class="form-row">
      <div class="form-group">
        <textarea name="message" v-model="message" class="form-element"></textarea>
      </div>
    </div>
    <div class="form-group">
      <input type="submit" class="send form-element" value="send">
    </div>
  </form>
</template>

<script>
export default {
  name: 'contact-form',
  data () {
    return {
      reason: '',
      name: null,
      company: null,
      email: null,
      address: null,
      time: null,
      phone: null,
      message: null,
      errors: {
        name: '',
        email: ''
      }
    }
  },
  methods: {
    checkForm (e) {
      e.preventDefault()
      this.clearErrorMessages()

      if (!this.name || !this.name.length) {
        this.errors.name = 'Това поле е задължително!'
      }
      if (!this.email || !this.email.length) {
        this.errors.email = 'Това поле е задължително!'
      }

      this.scrollToFirstErrorMessage()
    },
    scrollToFirstErrorMessage () {
      const firstErrorKey = this.getFirstErrorKey()
      if (!firstErrorKey) return

      const firstErrorInput = this.$el.querySelector('input[name=' + firstErrorKey + ']')
      if (!firstErrorInput) return

      firstErrorInput.scrollIntoView({
        behavior: 'smooth'
      })
    },
    getFirstErrorKey () {
      const errorsKeys = Object.keys(this.errors)

      let firstErrorKey
      for (let keyIndex = 0; keyIndex < errorsKeys.length; keyIndex++) {
        let errorKey = errorsKeys[keyIndex]
        let errorMessage = this.errors[errorKey]

        if (errorMessage && errorMessage.length) {
          firstErrorKey = errorKey
          break
        }
      }

      return firstErrorKey
    },
    clearErrorMessages () {
      this.errors.name = ''
      this.errors.email = ''
    }
  }
}
</script>
<style lang="scss" scoped>
.form-error {
  color: #e41616;
  font-size: 10px;
  font-weight: 500;
  text-align: right;
  position: absolute;
  width: 100%;
  top: -20px;
  margin: 0;
}
.form-group {
  position: relative;
}
</style>
