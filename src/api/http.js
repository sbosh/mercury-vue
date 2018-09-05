import axios from 'axios'
export default (() => {
  const instance = axios.create({
    baseURL: 'http://service.area52.bg/api',
    withCredentials: false,
    timeout: 5000,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })

  return instance
})()
