import axios from 'axios'
export default (() => {
  const instance = axios.create({
    baseURL: 'http://mercury-api.imigix.com/api',
    withCredentials: false,
<<<<<<< HEAD
    timeout: 0,
=======
>>>>>>> b382f1e16e1da6a1f5722de08d50212a9c39dede
    headers: {
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer mitko'
    }
  })

  return instance
})()
