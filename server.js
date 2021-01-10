const express = require('express')
const cors = require('cors')
require('dotenv').config()
const path = require('path')


const app = new express()

// MIDDLEWARES
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// routers
const ingredientsRouter = require('./routes/ingredients')
app.use('/api/ingredients', ingredientsRouter)

// home routing
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' })
})



app.listen(process.env.PORT || 9000)