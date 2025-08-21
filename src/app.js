const express = require('express')
const morgan = require('morgan')
const config = require('./config')
const path = require('path')
const router = require('./routers/router')

const app = express()

app.set('port', config.app.port)
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/blog/rito', router)

module.exports = app