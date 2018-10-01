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

  getBuildingById (id) {
    return this.http.get('/building/' + id)
      .catch((error) => { throw new Error(error) })
  }

  getFutureBuildings () {
    return this.http.get('/buildings/future')
      .catch((error) => { throw new Error(error) })
  }

  getFinishedBuildings () {
    return this.http.get('/buildings/finished')
      .catch((error) => { throw new Error(error) })
  }
}
