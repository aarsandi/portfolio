import axios from 'axios'

// set your server api
const instance = axios.create({
  baseURL: 'http://localhost:3001/'
})

export default instance
