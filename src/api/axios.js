import axios from 'axios'

// set your server api
const instance = axios.create({
  baseURL: 'https://aarsandi-portfolio.herokuapp.com/'
})

export default instance
