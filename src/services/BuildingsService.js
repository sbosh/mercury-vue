export default class BuildingsService {
  constructor (http) {
    this.http = http
  }

  getBuildingApartments (id) {
    return this.http.get('/apartments/building/' + id)
      .catch((error) => { throw new Error(error) })
  }

  getBuildingById (id) {
    return this.http.get('/building/' + id)
      .catch((error) => { throw new Error(error) })
  }

  getBuildingFloors (id) {
    return this.http.get('/floors/building/' + id)
      .catch((error) => { throw new Error(error) })
  }

  getBuildingEntrances (id) {
    return this.http.get('/entrances/building/' + id)
      .catch((error) => { throw new Error(error) })
  }

  getBuildingParkings (id) {
    return this.http.get('/parkings/building/' + id)
      .catch((error) => { throw new Error(error) })
  }

  getCurrentBuildings () {
    return this.http.get('/buildings/current')
      .catch((error) => { throw new Error(error) })
  }

  // getBuildings () {
  //   return this.http.get('/buildings')
  //     .catch((error) => { throw new Error(error) })
  // }

  // getBuildingById (id) {
  //   return this.http.get('/building/' + id)
  //     .catch((error) => { throw new Error(error) })
  // }

  getFutureBuildings () {
    return this.http.get('/buildings/future')
      .catch((error) => { throw new Error(error) })
  }

  getFinishedBuildings () {
    return this.http.get('/buildings/finished')
      .catch((error) => { throw new Error(error) })
  }
}
