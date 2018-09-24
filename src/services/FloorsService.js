export default class FloorsService {
  constructor (http) {
    this.http = http
  }

  getFloors () {
    return this.http.get('/floors')
      .catch((error) => { throw new Error(error) })
  }
}
