function navBar() {
    const buttonNav = document.querySelectorAll('.buttons-nav');
    const iframe = document.querySelector('#iframe');

    buttonNav.forEach(btn => {
        btn.addEventListener('click', () => {
            switch (btn.id) {
                case "btn-your-post": iframe.src = "/blog/rito/your-posts"; break

                case "btn-send-post": iframe.src = "/blog/rito/send-post"; break

                case "btn-profile": iframe.src = "/blog/rito/profile"; break
            }
        });
    });
}

addEventListener('DOMContentLoaded', function() {
    navBar();
})