import axios from 'axios'
export default (() => {
  const instance = axios.create({
    baseURL: 'http://mercury-api.imigix.com/api',
    withCredentials: false,
    timeout: 5000,
    headers: {
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer mitko'
    }
  })

  return instance
})()
