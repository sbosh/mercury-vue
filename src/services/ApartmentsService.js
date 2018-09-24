export default class ApartmentsService {
  constructor (http) {
    this.http = http
  }

  getApartments () {
    return this.http.get('/apartments')
      .catch((error) => { throw new Error(error) })
  }
}
