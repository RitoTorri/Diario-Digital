const pool = require('../database/db')
const bycrypt = require('bcrypt')

async function AddUser(user) {
    const Exist = await SearchUser(user.email)
    if (Exist.success) return { message: 'Ya existe un usuario con ese email', success: false, status: 400 }

    try {
        user.password = await bycrypt.hash(user.password, 10)

        const query = 'INSERT INTO users (name, lastname, email, password) VALUES ($1, $2, $3, $4)'
        const data = [user.name, user.lastname, user.email, user.password]

        const result = await pool.query(query, data)

        if (result.affectedRows === 0) return { message: 'Error al registrar usuario. Intentelo de nuevo.', success: false, status: 400 }

        return { message: 'Usuario registrado exitosamente.', success: true, status: 201 }

    } catch (error) {
        return { message: 'Error interno del servidor al registrar usuario', success: false, status: 500 };
    }
}

async function GetUser(user) {
    try {
        const query = 'SELECT name, lastname, email, password FROM users WHERE email = $1'
        const data = [user.email]
        const result = await pool.query(query, data)

        if (result.rows.length === 0 || result.rows[0] === undefined || result.rows[0] === null) {
            return { message: 'Contraseña incorrecta', success: false, status: 404 }
        }

        if (!bycrypt.compareSync(user.password, result.rows[0].password)) {
            return { message: 'Contraseña incorrecta', success: false, status: 400 }
        }

        delete result.rows[0].password
        return { success: true, status: 200, user: result.rows[0], redirect: '/blog/rito/home' }

    } catch (error) {
        return { message: 'Error interno del servidor al buscar usuario', success: false, status: 500 };
    }
}

async function EditUser(user) {
    try {
        let result
        if (user.emailNew !== undefined) {
            const exist = await SearchUser(user.emailNew)
            if (exist.success) return { message: 'Error al editar usuario. El email ya esta en uso.', success: false, status: 400 }

            const query = 'UPDATE users SET name = $1, lastname = $2, email = $3 WHERE email = $4'
            const data = [user.name, user.lastname, user.emailNew, user.email]
            result = await pool.query(query, data)

        } else {
            const query = 'UPDATE users SET name = $1, lastname = $2 WHERE email = $3'
            const data = [user.name, user.lastname, user.email]
            result = await pool.query(query, data)
        }

        if (result.rowCount === 0) return { message: 'Error al editar usuario. Intentelo de nuevo.', success: false, status: 400 }

        const query2 = 'SELECT name, lastname, email FROM users WHERE email = $1'
        let userN

        if (user.emailNew === undefined) userN = await pool.query(query2, [user.email])
        else userN = await pool.query(query2, [user.emailNew])

        if (userN.rows.length === 0) return { message: 'Error al editar usuario. Intentelo de nuevo.', success: false, status: 400 }

        return { success: true, status: 201, data: userN.rows[0] }

    } catch (error) {
        return { message: `Error interno del servidor al editar usuario: ${error}`, success: false, status: 500 };
    }
}

async function SearchUser(email) {
    try {
        const query = 'SELECT id FROM users WHERE email = $1'
        const data = [email]
        const result = await pool.query(query, data)

        if (result.rows.length === 0) return { success: false, status: 404 }

        return { success: true, status: 200, id: result.rows[0].id }
    } catch (error) {
        return { message: 'Error interno del servidor al buscar usuario', success: false, status: 500 };
    }
}

module.exports = {
    AddUser,
    GetUser,
    SearchUser,
    EditUser,
}