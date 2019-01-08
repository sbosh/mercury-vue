import axios from 'axios'
export default (() => {
  const instance = axios.create({
    baseURL: 'http://api.mercury99.bg/api',
    withCredentials: false,
    headers: {
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 0889260962'
    }
  })

  return instance
})()
