const validator = require('../validators/validator.user')
const model = require('../models/model.user')

function signIn(user) {
    if(validator.empty(user) || validator.ErrorEmail(user.email)) {
        return {message : "El email o la contraseña son incorrectos", success: false, status: 400}
    }
}

async function signUp(user) {
    if(validator.empty(user)) {
        return {message : "Campos vacios. Por favor, rellena todos los campos", success: false, status: 400}
    }

    if(validator.ErrorEmail(user.email)){
        return {message : "El email no es valido. Por favor, revisa tu email", success: false, status: 400}
    }

    if(validator.ErrorData(user.name)) {
        return {message : "El nombre no es valido. Por favor, revisa tu nombre", success: false, status: 400}
    }

    if(validator.ErrorData(user.lastname)) {
        return {message : "El apellido no es valido. Por favor, revisa tu apellido", success: false, status: 400}
    }
    const result = await model.AddUser(user)
    return result
}

module.exports = {
    signIn,
    signUp,
}