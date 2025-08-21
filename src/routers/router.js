const router = require('express').Router()
const controller = require('../controllers/controller.user')

/* METHODS get */
router.get('/sign-in',(req, res) => {
    res.send('estas en el router de iniciar sesion')
})

router.get('/sign-up',(req, res) => {
    res.send('estas en el router de registrarse')
})

router.get('/home', (req, res) => {
    res.send('estas en el router de home')
})

router.get('/your-posts', (req, res) => {
    res.send('estas en el router de tus posts')
})

router.get('/send-post', (req, res) => {
    res.send('estas en el router de subir post')
})

router.get('/profile', (req, res) => {
    res.send('estas en el router de perfil')
})


/* METHODS post */
router.post('/sign-in',(req, res) => {
    const { email, password } = req.body
    const user = { email, password }
    const result = controller.signIn(user)
    res.json(result)
})

router.post('/sign-up',async (req, res) => {
    const { name, lastname, email, password } = req.body
    const user = { name, lastname,  email, password }
    const result = await controller.signUp(user)
    res.json(result)
})

router.post('/send-post', (req, res) => {
    res.send('estas en el router de subir post')
})

router.post('/profile', (req, res) => {
    res.send('estas en el router de perfil')
})

module.exports = router