export default class PagesService {
  constructor (http) {
    this.http = http
  }

  getHomePage () {
    return this.http.get('/page/type/home')
      .catch((error) => { throw new Error(error) })
  }

  getNewsPage () {
    return this.http.get('/page/type/news')
      .catch((error) => { throw new Error(error) })
  }

  getCurrentBuildingsPage () {
    return this.http.get('/page/type/current-projects')
      .catch((error) => { throw new Error(error) })
  }

  getFutureBuildingsPage () {
    return this.http.get('/page/type/future-projects')
      .catch((error) => { throw new Error(error) })
  }

  getFinishedBuildingsPage () {
    return this.http.get('/page/type/finished-projects')
      .catch((error) => { throw new Error(error) })
  }

  getContactsPage () {
    return this.http.get('/page/type/contacts')
      .catch((error) => { throw new Error(error) })
  }
}
