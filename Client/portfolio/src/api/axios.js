import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://aarsandi-portfolio.herokuapp.com/'
})

export default instance
