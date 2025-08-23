const router = require('express').Router()
const controller = require('../controllers/controller.user')
const path = require('path')

/* METHODS get */
router.get('/sign-in',(req, res) => {
    res.sendFile(path.join(__dirname, '../views/sign-in.html'))
})

router.get('/sign-up',(req, res) => {
    res.sendFile(path.join(__dirname, '../views/sign-up.html'))
})

router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/home.html'))
})

router.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/profile.html'))
})


/* METHODS post */
router.post('/sign-in', async (req, res) => {
    const { email, password } = req.body
    const user = { email, password }
    const result = await controller.signIn(user)
    
    if(!result.success) res.json(result)
    
    const resultFinal = {data: result, redirect: 'blog/rito/home'}
    res.json(resultFinal)
})

router.post('/sign-up',async (req, res) => {
    const { name, lastname, email, password } = req.body
    const user = { name, lastname,  email, password }
    const result = await controller.signUp(user)
    res.json(result)
})

router.put('/profile', async (req, res) => {
    const {name, lastname, email, emailNew} = req.body
    const user = { name, lastname,  email, emailNew }
    const result = await controller.Editprofile(user)
    res.json(result)
})

module.exports = router