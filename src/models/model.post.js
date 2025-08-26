const userEx = require('./model.user')
const pool = require('../database/db')

async function AddPost(post) {
    console.log(post)
    try {
        const user = await userEx.SearchUser(post.author)
        if(user.success === false) return { message: 'Error al buscar el autor del post', success: false, status: 400 }
        
        const query = 'INSERT INTO posts (id_user, title, content_post) VALUES ($1, $2, $3)'
        const data = [user.id, post.title, post.content_post]

        const result = await pool.query(query, data)

        if(result.affectedRows === 0) return { success: false, status: 400 }

        return { success: true, status: 201 }
    } catch (error) {
        console.error(error)
        return { message: 'Error interno del servidor al registrar post', success: false, status: 500 };
    }
}

async function GetPosts(email) {
    try {
        const query = 'SELECT title, content_post, created_post FROM posts WHERE id_user = (SELECT id FROM users WHERE email = $1)'
        const data = [email]
        const result = await pool.query(query, data)
        
        if(result.rows.length === 0) return { message: 'No se encontraron posts', success: false, status: 404 }
    
        return { success: true, status: 200, posts: result.rows}
    } catch (error) {
        return { message: 'Error interno del servidor al buscar posts', success: false, status: 500 };
    }
}

async function DeletePost(date) {
    try {
        console.log(date)
        const query = 'DELETE FROM posts WHERE created_post = $1'
        const data = [date]
        const result = await pool.query(query, data)
        console.log(result)

        if(result.affectedRows === 0) return { message: 'Error al eliminar post. Intentelo de nuevo.', success: false, status: 400 }

        return { message: 'Post eliminado exitosamente.', success: true, status: 201 }

    } catch (error) {
        console.error(error)
        return { message: 'Error interno del servidor al eliminar post', success: false, status: 500 };
    }
}

module.exports = {
    AddPost,
    GetPosts,
    DeletePost,
}