export default {
    template: `
    <main>
        <section>
            <base-button class="btn" @click="logoutUser">Logout</base-button>
            <router-link class="btn" :to="{ name: 'user.samples' }">Edit Sample</router-link>
            {{ userData.name }}
	    </section>
    </main>
    `,
    name: 'User',
    computed: {
        userData() {
            return this.$store.getters.getLogedInUser
        }
    },
    methods: {
        logoutUser(){
            this.$store.dispatch('logoutUser')
            this.$router.push('/')
        }
    },
}