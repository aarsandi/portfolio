require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT
const cors = require('cors')
const routes = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')

app.use(express.urlencoded({ extended:true }))
app.use(express.json())

app.use(cors())
app.use('/', routes)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`app running at http://localhost:${port}/`)
})