export default {
    template: `
        <nav class="mobile-nav">
            <router-link to="/">Home</router-link>
            <router-link :to="{name: 'samples'}">Samples</router-link>
            <router-link v-if="!idToken" :to="{name: 'login.user'}">Login</router-link>
            <router-link v-else :to="{name: 'user.samples'}">User</router-link>
        </nav>
    `,
    computed: {
        idToken(){return this.$store.getters.getToken}
    },
}