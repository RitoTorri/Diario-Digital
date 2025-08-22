const validator = require('../validators/validator')
const model = require('../models/model.post')

async function sendPost(post) {
    const image = post.image
    delete post.image
    if (validator.empty(post)) {
        return { message: "Campos vacios. Por favor, rellena todos los campos", success: false, status: 400 }
    }
    post.image = image
    const result = await model.AddPost(post)
    return result
}

async function yourPost(email) {
    if (validator.ErrorEmail(email)) return { message: "El email no es valido. Por favor, revisa tu email.", success: false, status: 400 }
    const result = await model.GetPosts(email)
    return result
}

async function deletePost(date) {
    const result = await model.DeletePost(date)
    return result
}

module.exports = {
    sendPost,
    yourPost,
    deletePost,
}