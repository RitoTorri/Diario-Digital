const app = require('./app')

function main() {
    app.listen(app.get('port'), () => {
        console.log(`Servidor corriendo en el puerto http://localhost:${app.get('port')}/blog/rito`)
    })
}

main()