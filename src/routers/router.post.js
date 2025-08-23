const router = require('express').Router()
const controller = require('../controllers/controller.post')
const path = require('path')

router.get('/your-posts', async(req, res) => {
    const email = req.query.email 
    const result = await controller.yourPost(email)
    const resultFinal = {data: result, redirect: 'blog/rito/home'}
    res.json(resultFinal)
})

router.delete('/your-posts', async(req, res) => {
    const date = req.query.date
    const result = await controller.deletePost(date)
    res.json(result)
})

router.get('/send-post', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/send-post.html'))
})

router.post('/send-post', async (req, res) => {
    const { title , content_post , author, image } = req.body
    post = {  title , content_post , author, image }
    const result = await controller.sendPost(post)
    res.json(result)
})


module.exports = router