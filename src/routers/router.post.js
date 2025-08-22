const router = require('express').Router()
const controller = require('../controllers/controller.post')

router.get('/your-posts', async(req, res) => {
    const email = req.query.email 
    const result = await controller.yourPost(email)
    res.json(result)
})

router.delete('/your-posts', async(req, res) => {
    const date = req.query.date
    const result = await controller.deletePost(date)
    res.json(result)
})

router.get('/send-post', (req, res) => {
    res.send('estas en el router de subir post')
})

router.post('/send-post', async (req, res) => {
    const { title , content_post , author, image } = req.body
    post = {  title , content_post , author, image }
    const result = await controller.sendPost(post)
    res.json(result)
})


module.exports = router