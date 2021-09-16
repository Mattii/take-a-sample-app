export default {
    template: `
            <div class="hero-element">
                <img src="./img/vegetables/ogórek.png">
                <img src="./img/vegetables/pomidor.png">
                <img src="./img/vegetables/rzodkiewka.png">
                <img src="./img/vegetables/sałata.png">
                <img src="./img/vegetables/dynia-pirzmowa.png">
                <img src="./img/vegetables/ogorek-pickling.png">
                <h2 v-if="isToken">Predict the future and <br /><span>take a sample</span> <br /> of innovation</h2>
                <h2 v-else>To use this site you need to be login and authorized</h2>
                <router-link v-if="isToken" class="btn btn-to-action" :to="{name: 'samples'}">Take Some</router-link>
                <router-link v-else class="btn btn-to-action" :to="{name: 'login.user'}">Login</router-link>
            </div>
    `,
    computed:{
        isToken() {
            return this.$store.getters.getToken
        }
    }
}