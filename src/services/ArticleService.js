export default class ArticleSerivce {
  constructor (http) {
    this.http = http
  }

  get () {
    return this.http.get('/articles')
      .catch((error) => { throw new Error(error) })
  }
}
