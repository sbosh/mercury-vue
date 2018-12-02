<template>
  <form @submit="checkForm" method="POST" action="" id="contact_form">
    <!-- <h3>{{ $t('write_us') }}</h3>
    <div class="form-row radio-checkbox-row">
      <div class="form-group radio-group">
        <input type="radio" id="input_property" v-model="reason" name="reason" class="form-element" />
        <label for="input_property">{{ $t('enquery_for_apartment') }}</label>
      </div>
      <hr>
      <div class="form-group radio-group">
        <input type="radio" id="input_company" v-model="reason" name="reason" class="form-element" />
        <label for="input_company">{{ $t('enquery_for_company') }}</label>
      </div>
      <hr>
      <div class="form-group radio-group">
        <input type="radio" id="input_team" v-model="reason" name="reason" class="form-element" />
        <label for="input_team">{{ $t('join_our_team') }}</label>
      </div>
    </div>
    <h3>{{ $t('name') }}</h3> -->
    <h3>{{ $t('write_us') }}</h3>
    <div class="form-row">
      <div class="form-group">
        <p class="form-error" v-if="errors.name && errors.name.length" v-text="errors.name"/>
        <input type="text" name="name" v-model="name" class="form-element" :placeholder="$t('your_name') + '*'" />
      </div>
      <div class="form-group">
        <p class="form-error" v-if="errors.email && errors.email.length" v-text="errors.email"/>
        <input type="email" name="email" v-model="email" class="form-element" placeholder="Е-mail *" />
      </div>
      <div class="form-group">
        <input type="tel" name="" v-model="phone" class="form-element" :placeholder="$t('telephone')">
      </div>
      <!-- <div class="form-group">
        <input type="text" name="company" v-model="company" class="form-element" :placeholder="$t('company_name') + '*'">
      </div> -->
    </div>
    <!-- <h3>{{ $t('information') }}</h3> -->
    <div class="form-row">
     <!--  <div class="form-group">
        <p class="form-error" v-if="errors.email && errors.email.length" v-text="errors.email"/>
        <input type="email" name="email" v-model="email" class="form-element" placeholder="Е-mail *" />
      </div>
      <div class="form-group">
        <select name="about" v-model="about" class="form-element">
          <option value="" selected>{{ $t('about') }}</option>
          <option :value="$t('enquery_for_apartment')">{{ $t('enquery_for_apartment') }}</option>
          <option :value="$t('enquery_for_company')">{{ $t('enquery_for_company') }}</option>
        </select>
      </div> -->
    </div>
    <div class="form-row">
      <!-- <div class="form-group">
        <input type="text" name="address" v-model="address" class="form-element" :placeholder="$t('address')" />
      </div>
      <div class="form-group">
        <input type="text" name="time" v-model="time" class="form-element" :placeholder="$t('convenient_time')">
      </div> -->
    </div>
    <h3>{{ $t('message') }}</h3>
    <div class="form-row">
      <div class="form-group">
        <textarea name="message" v-model="message" class="form-element"></textarea>
      </div>
    </div>
    <div class="form-group">
      <input type="submit" class="send form-element" :value="$t('send')">
    </div>
    <div class="form-popup" v-bind:class="{ active: popupActive }" id="form-popup">
      <div class="form-errors">
        <div class="info" v-if="!successForm">
          <div class="icon"><img src="@/assets/images/mail-error.svg" alt=""></div>
          <h3>{{ $t('error_text') }}</h3>
          <div class="form-errors-error" v-for="(error, index) in responseErrors" :key="index" v-text="error" />
        </div>
        <div class="info" v-else>
          <div class="icon"><img src="@/assets/images/mail-success.svg" alt=""></div>
          <h3>{{ $t('success_text') }}</h3>
        </div>
        <div class="btn-box">
          <div @click="popupActive = !popupActive" class="btn">{{ $t('close') }}</div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import ContactsService from '@/services/ContactsService'
import HTTP from '@/api/http'
export default {
  name: 'contact-form',
  props: ['hasApartment'],
  data () {
    return {
      successForm: '',
      reason: '',
      name: null,
      company: null,
      email: null,
      about: null,
      address: null,
      time: null,
      phone: null,
      message: null,
      errors: {
        name: '',
        email: ''
      },
      responseErrors: [],
      contactService: null,
      popupActive: false
    }
  },
  created () {
    this.contactService = new ContactsService(HTTP)
  },
  methods: {
    checkForm (e) {
      e.preventDefault()
      this.responseErrors = []
      this.clearErrorMessages()

      let hasError = false
      if (!this.name || !this.name.length) {
        this.errors.name = 'Това поле е задължително!'
        hasError = true
      }
      if (!this.email || !this.email.length) {
        this.errors.email = 'Това поле е задължително!'
        hasError = true
      }

      if (hasError) {
        this.scrollToFirstErrorMessage()
      } else {
        this.submitForm()
      }
    },
    submitForm () {
      const data = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        message: this.message,
        language: this.$route.params.lang
      }

      if (this.hasApartment) {
        data.apartment_id = this.hasApartment
      }

      const formData = JSON.stringify(data)
      this.contactService.submit(formData).then(response => {
        if (response.status && response.status === 200) {
          this.popupActive = true
          this.successForm = true
          this.name = ''
          this.email = ''
          this.phone = ''
          this.message = ''
        }
      }).catch(({ response }) => {
        const errors = response.data.errors
        const errorKeys = Object.keys(errors)
        if (!errorKeys.length) return

        const messages = []
        for (let errorKey of errorKeys) {
          messages.push(errors[errorKey][0])
        }
        this.popupActive = true
        this.successForm = false
        this.responseErrors = messages
      })
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
.form-popup {
  z-index: -1;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  opacity: 0;
  visibility: hidden;
  transition: all .3s;
  background: rgba(0,0,0,.5);
  &.active {
    z-index: 99999;
    opacity: 1;
    visibility: visible;
  }
  .form-errors {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background: #fff;
    padding: 50px 40px;
    text-align: center;
    max-width: 550px;
    width: 100%;
    .icon {
      margin-bottom: 15px;
    }
    h3 {
      margin-bottom: 30px;
    }
    .btn-box {
      margin: 30px auto 0 auto;
      .btn {
        border-color: #fa6a02;
        color: #000;
        cursor: pointer;
        min-width: 180px;
        &:hover {
          color: #fff;
        }
        &:before,&:after {
          display: none;
        }
      }
    }
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
  }
  @media screen and(max-width: 768px) {
    padding: 20px;
    .form-errors {
      width: 80%;
      padding: 20px;
    }
  }
}
.form-group {
  position: relative;
}
</style>
