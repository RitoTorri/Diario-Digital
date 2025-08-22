const express = require('express')
const morgan = require('morgan')
const config = require('./config')
const path = require('path')
const routerUser = require('./routers/router.user')
const routerPost = require('./routers/router.post')

const app = express()

app.set('port', config.app.port)
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/blog/rito', routerUser)
app.use('/blog/rito', routerPost)

module.exports = app