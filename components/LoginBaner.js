export default {
    template: `
            <div class="hero-element" style="background-image: url(./img/login-hero-bg.jpg);">
                <h2>To use this site you need to be login and authorized</h2>
                <router-link class="btn btn-to-action" :to="{name: 'login.user'}">Login</router-link>
            </div>
    `,

}