import Vue from 'vue'
import VueI18n from 'vue-i18n'
import axios from 'axios'
import TranslationService from '../services/TranslationsService'
import HTTP from '@/api/http'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: '',
  fallbackLocale: 'en',
  silentTranslationWarn: true
})

const loadedLanguages = []

function setI18nLanguage (lang) {
  i18n.locale = lang
  axios.defaults.headers.common['Accept-Language'] = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}
let translationService = new TranslationService(HTTP)
export function loadLanguageAsync (lang) {
  if (i18n.locale !== lang) {
    if (!loadedLanguages.includes(lang)) {
      translationService.getTranslations(lang)
        .then(({ data }) => {
          i18n.setLocaleMessage(lang, data.data[0])
          loadedLanguages.push(lang)
          setI18nLanguage(lang)
        })
    }
    return Promise.resolve(setI18nLanguage(lang))
  }
  document.querySelector('html').setAttribute('lang', lang)
  return Promise.resolve(lang)
}
