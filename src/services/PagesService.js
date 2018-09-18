export default class PagesService {
  constructor (http) {
    this.http = http
  }

  getHomePage () {
    return this.http.get('/page/type/home/mitko')
      .catch((error) => { throw new Error(error) })
  }

  getNewsPage () {
    return this.http.get('/page/type/news/mitko')
      .catch((error) => { throw new Error(error) })
  }

  getCurrentBuildingsPage () {
    return this.http.get('/page/type/current-projects/mitko')
      .catch((error) => { throw new Error(error) })
  }

  getContactsPage () {
    return this.http.get('/page/type/contacts/mitko')
      .catch((error) => { throw new Error(error) })
  }
}
