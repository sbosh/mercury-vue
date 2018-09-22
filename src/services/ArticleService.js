export default class ArticleService {
  constructor (http) {
    this.http = http
  }

  getArticles () {
    return this.http.get('/posts')
      .catch((error) => { throw new Error(error) })
  }
}
