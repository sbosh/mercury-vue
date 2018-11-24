export default class ContactService {
  constructor (http) {
    this.http = http
  }

  submit (formData) {
    return this.http.post('/submit', formData)
  }
}
