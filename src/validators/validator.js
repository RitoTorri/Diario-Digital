/* si cumple la condicion retorna true */
function empty(user){
    for(const key in user){
        if(user[key] === '' || user[key] === null || user[key] === undefined) return true   
    }
    return false
}

function ErrorEmail(email){
    const regular = /^[a-zA-Z0-9_\-+%]+@[a-zA-Z0-9_-]+\.[a-zA-Z]{2,}$/
    if(!regular.test(email))  return true
    return false
}

function ErrorData(datos){
    const regular = /^[a-zA-Z0-9]+$/
    if(!regular.test(datos))  return true
    return false
}

module.exports = {
    empty,
    ErrorEmail,
    ErrorData
}