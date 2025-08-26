/* Seccion del login */
function Login() {
    const form = document.querySelector('#signInForm');
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const errorMessage = document.querySelector('#error-message');

    if (form) {
        form.removeEventListener('submit', form)
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            if (email.value === '' || password.value === '') {
                errorMessage.innerHTML = "Completa todos los campos."
                return
            }

            const user = { email: email.value, password: password.value };

            try {
                const response = await fetch('/blog/rito/sign-in', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })

                const result = await response.json()

                if (!response.ok) {
                    errorMessage.innerHTML = result.message
                    return
                }

                if (!result.success) {
                    errorMessage.innerHTML = result.message
                    return
                }

                errorMessage.innerHTML = ""
                form.reset()
                localStorage.setItem('user', JSON.stringify(result.user))
                window.location.href = result.redirect

            } catch (error) {
                errorMessage.innerHTML = "Error al iniciar sesión." + error;
            }
        })
    }
}


/* Seccion del resgistro de usuario */
function signUp() {
    const form = document.getElementById('signUpForm')
    const name = document.getElementById("name")
    const lastname = document.getElementById("lastname")
    const email = document.getElementById("email")
    const password = document.getElementById("password")
    const errorMessage = document.getElementById("error-message")

    const dialog = document.getElementById('dialog-creted')
    const btnOk = document.getElementById('button-signUp-dialog')
    const message = document.getElementById('message')

    if (form) {
        form.removeEventListener('submit', form)
        form.addEventListener('submit', async (event) => {
            event.preventDefault()

            const user = { name: name.value, lastname: lastname.value, email: email.value, password: password.value }

            try {
                const response = await fetch('/blog/rito/sign-up', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })

                const result = await response.json()

                if (!response.ok) {
                    errorMessage.innerHTML = result.message
                    return
                }

                if (!result.success) {
                    errorMessage.innerHTML = result.message
                    return
                }

                errorMessage.innerHTML = ""
                form.reset()

                dialog.style.display = "flex"
                message.textContent = result.message

                btnOk.addEventListener('click', () => {
                    dialog.style.display = "none"
                })

            } catch (error) {
                errorMessage.innerHTML = "Error al registrarse. Intente de nuevo."
            }
        })
    }
}



/* Seccion que cargas los datos del inicio */
function DataHome() {
    const logout = document.getElementById("btn-logout")
    const sectionName = document.getElementById("section-name")
    const sectionEmail = document.getElementById("section-email")
    const navbuttons = document.querySelectorAll('.buttons-nav')
    const iframe = document.getElementById('iframe')

    const dialog = {
        dialog: document.getElementById('dialog-logout'),
        btnLogout: document.getElementById('btn-logout-dialog'),
        btnCancel: document.getElementById('btn-cancel-dialog'),
    }

    if (logout) {
        const user = JSON.parse(localStorage.getItem('user'))

        sectionName.textContent = user.name + ' ' + user.lastname
        sectionEmail.textContent = user.email

        logout.addEventListener('click', async () => {
            dialog.dialog.style.display = 'flex'
        })

        dialog.btnLogout.addEventListener('click', async () => {
            dialog.dialog.style.display = 'none'
            localStorage.removeItem('user')
            localStorage.removeItem('posts')
            window.location.href = '/blog/rito/sign-in'
        })

        dialog.btnCancel.addEventListener('click', async () => {
            dialog.dialog.style.display = 'none'
        })

        for (const button of navbuttons) {
            button.addEventListener('click', async () => {

                for (const btn of navbuttons) {
                    btn.classList.remove('active');
                }

                document.getElementById(button.id).classList.add('active')
                switch (button.id) {
                    case 'btn-your-post':
                        const result = await getPosts()
                        if (result.result.success) {
                            localStorage.setItem('posts', JSON.stringify(result.result.posts))
                        }
                        iframe.src = result.redirect
                        break
                    case 'btn-send-post':
                        iframe.src = '/blog/rito/send-post'
                        break
                    case 'btn-profile':
                        iframe.src = '/blog/rito/profile'
                        break
                }
            })
        }
    }
}




/* Seccion que te uestra tus posts */
async function getPosts() {
    const iframe = document.getElementById('iframe')

    if (iframe) {
        const user = JSON.parse(localStorage.getItem('user'))
        const result = '/blog/rito/your-posts?email=' + user.email

        const x = await fetch(result, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const a = await x.json()
        return a
    }
}



async function YourPosts() {
    const container = document.getElementById('container-your-posts')
    const errorMessage = document.getElementById('error-message')

    if (container) {
        if (localStorage.getItem('posts') === null) {
            errorMessage.innerHTML = "No se encontraron posts"
            return
        }

        errorMessage.innerHTML = ""
        const posts = JSON.parse(localStorage.getItem('posts'))
        const user = JSON.parse(localStorage.getItem('user'))

        for (let i = 0; i < posts.length; i++) {
            const fechaDb = new Date(posts[i].created_post)
            fechaDb.setHours(fechaDb.getHours() - 4)
            let fechaFormateada = fechaDb.toISOString().replace('T', ' ').split(".")

            container.innerHTML += `
                <article id="article-post">
                    <section id="section-info">
                        <div id="container-image">
                            <img src="/img/icon-user.png" alt="User's profile picture" id="icon-user">
                        </div>
                        <div id="container-data">
                            <p id="paragraph-name">${user.name} ${user.lastname}</p>
                            <p id="paragraph-email">${user.email}</p>
                        </div>
                        <div id="container-date">
                            <p id="paragraph-date">${fechaFormateada[0]}</p>
                        </div>
                    </section>
                    <section id="section-post">
                        <div id="container-title-post">
                            <p id="title-post">${posts[i].title}</p>
                        </div>
                        <div id="container-content-post">
                            <textarea placeholder="Contenido del Post" rows="15" id="content-post">${posts[i].content_post}</textarea>
                        </div>
                        <div id="container-buttons-post">
                            <button id="btn-delete-post" onclick="DeletePost('${fechaFormateada[0]}')">Eliminar</button>
                        </div>
                    </section>
                </article>
            `
        }
    }
}


async function DeletePost(date) {
    const dialoDelete = document.getElementById('dialog-delete')
    const btnOk = document.getElementById('btn-ok')
    const btnCancel = document.getElementById('btn-cancel')

    dialoDelete.style.display = 'flex'

    btnOk.addEventListener('click', async () => {
        try {
            const result = await fetch('/blog/rito/your-posts?date=' + date, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            const a = await result.json()
            if (!result.ok) {
                console.error(a.message)
                return
            }

            dialoDelete.style.display = 'none'
            localStorage.removeItem('posts')

            parent.location.reload(true)

        } catch (error) {
            console.error(error)
        }
    })

    btnCancel.addEventListener('click', async () => {
        dialoDelete.style.display = 'none'
    })
}



function EditProfile() {
    const form = document.getElementById('form-update-profile')
    const name = document.getElementById('input-name')
    const lastname = document.getElementById('input-last-name')
    const email = document.getElementById('input-email')
    const reset = document.getElementById('btn-delete')
    const inputs = document.querySelectorAll('.input')
    const containerButtons = document.getElementById('container-buttons')
    const dialogUpdate = document.getElementById('dialog-update-profile')
    const btnOkUpdate = document.getElementById('btn-ok-update')

    if (form) {
        const user = JSON.parse(localStorage.getItem('user'))

        name.value = user.name
        lastname.value = user.lastname
        email.value = user.email

        for (const input of inputs) {
            input.addEventListener('input', () => {
                if (name.value !== user.name || lastname.value !== user.lastname || email.value !== user.email) {
                    containerButtons.style.display = 'flex'
                } else {
                    containerButtons.style.display = 'none'
                }
            })
        }

        reset.addEventListener('click', async () => {
            name.value = user.name
            lastname.value = user.lastname
            email.value = user.email
            containerButtons.style.display = 'none'
        })


        form.removeEventListener('submit', form)
        form.addEventListener('submit', async (event) => {
            event.preventDefault()

            let userSend

            if (user.email === email.value) {
                userSend = { name: name.value, lastname: lastname.value, email: user.email }
            } else {
                userSend = { name: name.value, lastname: lastname.value, email: user.email, emailNew: email.value }
            }

            try {
                const response = await fetch('/blog/rito/profile', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userSend)
                })

                const result = await response.json()

                if (!response.ok || !result.success) {
                    console.error(result.message)
                    return
                }
                containerButtons.style.display = 'none'

                dialogUpdate.style.display = 'flex'

                btnOkUpdate.addEventListener('click', async () => {
                    dialogUpdate.style.display = 'none'
                    localStorage.setItem('user', JSON.stringify(result.data))
                    parent.location.reload(true)
                })

            } catch (error) {
                console.error(error)
            }
        })
    }
}



/* seccion que te permite enviar un post */
async function sendPost() {
    const user = JSON.parse(localStorage.getItem('user'))
    const form = document.getElementById('form-post')
    const name = document.getElementById('paragraph-name')
    const email = document.getElementById('paragraph-email')
    const title = document.getElementById('title-post')
    const content = document.getElementById('content-post')
    const messageLarge = document.getElementById('dialog-message-large')

    const dialogSuccess = document.getElementById('dialog-success')
    const dialogError = document.getElementById('dialog-error')
    const dialogLarge = document.getElementById('dialog-post-large')

    const btnOkSuccess = document.getElementById('btn-ok-success')
    const btnCancelError = document.getElementById('btn-cancel-error')
    const btnTryAgain = document.getElementById('btn-try-again')
    const btnOkLarge = document.getElementById('btn-ok-large')
    const btnreset = document.getElementById('btn-cancel')

    if (form) {
        name.textContent = user.name
        email.textContent = user.email

        btnreset.addEventListener('click', async () => {
            title.classList.remove('error')
            content.classList.remove('error')
            title.placeholder = 'Titulo del Post'
            content.placeholder = 'Contenido del Post'
            form.reset()
        })

        form.addEventListener('submit', async (event) => {
            event.preventDefault()

            title.addEventListener('click', () => {
                title.classList.remove('error')
                title.placeholder = 'Titulo del Post'
            })

            content.addEventListener('click', () => {
                content.classList.remove('error')
                content.placeholder = 'Contenido del Post'
            })

            if (title.value === '') {
                title.classList.add('error')
                title.placeholder = 'El titulo no puede estar vacío.'
                return
            }

            if (content.value === '') {
                content.classList.add('error')
                content.placeholder = 'El contenido no puede estar vacío'
                return
            }

            if (title.value.length > 100) {
                dialogLarge.style.display = 'flex'
                messageLarge.textContent = 'El titulo no puede tener mas de 100 caracteres.'
                btnOkLarge.addEventListener('click', async () => {
                    dialogLarge.style.display = 'none'
                })
                return
            }

            if (content.value.length > 400) {
                console.log(content.value.length)
                dialogLarge.style.display = 'flex'
                messageLarge.textContent = 'El contenido no puede tener mas de 400 caracteres.'
                btnOkLarge.addEventListener('click', async () => {
                    dialogLarge.style.display = 'none'
                })
                return
            }

            const post = { title: title.value, content_post: content.value, author: user.email }

            try {
                const response = await fetch('/blog/rito/send-post', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(post)
                })

                const result = await response.json()

                if (!response.ok || !result.success) {
                    dialogError.style.display = 'flex'
                    return
                }

                btnCancelError.addEventListener('click', async () => {
                    dialogError.style.display = 'none'
                })

                btnTryAgain.addEventListener('click', async () => {
                    sendPost()
                })

                dialogSuccess.style.display = 'flex'

                btnOkSuccess.addEventListener('click', async () => {
                    dialogSuccess.style.display = 'none'
                })

                form.reset()
            } catch (error) {
                console.error(error)
            }
        })
    }
}

addEventListener('DOMContentLoaded', function () {
    Login()
    signUp()
    DataHome()
    sendPost()
    EditProfile()
    YourPosts()
})