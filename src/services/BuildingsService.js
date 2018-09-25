export default class BuildingsService {
  constructor (http) {
    this.http = http
  }

  getBuildings () {
    return this.http.get('/buildings')
      .catch((error) => { throw new Error(error) })
  }

  getCurrentBuildings () {
    return this.http.get('/buildings/current')
      .catch((error) => { throw new Error(error) })
  }
}