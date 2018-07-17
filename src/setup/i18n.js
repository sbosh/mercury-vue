import Vue from 'vue'
import VueI18n from 'vue-i18n'
import axios from 'axios'
import messages from '@/locales'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages
})

const loadedLanguages = ['en']

function setI18nLanguage (lang) {
  i18n.locale = lang
  axios.defaults.headers.common['Accept-Language'] = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}
export function loadLanguageAsync (lang) {
  if (i18n.locale !== lang) {
    if (!loadedLanguages.includes(lang)) {
      return new Promise(function (resolve, reject) {
        import(`@/locales/${lang}`).then(msgs => {
          i18n.setLocaleMessage(lang, msgs.default)
          loadedLanguages.push(lang)
          resolve(setI18nLanguage(lang))
        })
      })
    }
    return Promise.resolve(setI18nLanguage(lang))
  }
  document.querySelector('html').setAttribute('lang', lang)
  return Promise.resolve(lang)
}
