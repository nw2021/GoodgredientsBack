const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = new express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'images')))
app.use(bodyParser.json())

// Routers
const ingredientsRouter = require('./routes/ingredients')
app.use('/api/ingredients', ingredientsRouter)

// Home routing
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' })
})

app.listen(process.env.PORT || 9000)