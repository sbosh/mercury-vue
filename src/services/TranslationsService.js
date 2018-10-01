export default class TranslationsService {
  constructor (http) {
    this.http = http
  }

  getTranslations (lang) {
    return this.http.get('/translations/' + lang)
      .catch((error) => { throw new Error(error) })
  }
}
