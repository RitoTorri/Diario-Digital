const pool = require('../database/db')
const bycrypt = require('bcrypt')

async function AddUser(user){
    const Exist = await SearchUser(user.email)

    if(Exist.success === true) return { message: 'Ya existe un usuario con ese email', success: false, status: 400 }

    try {
        user.password = await bycrypt.hash(user.password, 10)
        const query = 'INSERT INTO users (name, lastname, email, password) VALUES ($1, $2, $3, $4)'
        
        const data = [user.name, user.lastname, user.email, user.password]
    
        const result = await pool.query(query, data)

        if(result.affectedRows === 0) return { message: 'Error al registrar usuario. Intentelo de nuevo.', success: false, status: 400 }
        return { message: 'Usuario registrado exitosamente.', success: true, status: 201 }

    } catch (error) {
        return { message: 'Error interno del servidor al registrar usuario', success: false, status: 500 };
    }
}

async function SearchUser(email){
    try {
        const query = 'SELECT * FROM users WHERE email = $1'
        const data = [email]
        const result = await pool.query(query, data)

        if(result.rows.length === 0) return { message: 'Usuario no encontrado', success: false, status: 404 }

        return { message: 'Usuario encontrado', success: true, status: 200}

    } catch (error) {
        return { message: 'Error interno del servidor al buscar usuario', success: false, status: 500 };
    }
}

module.exports = {
    AddUser,
}