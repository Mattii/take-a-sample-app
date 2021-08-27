import SmallSampleCard from "../components/Home/SmallSampleCard.js"
export default {
    template: `
    <main>
        <section class="user-details">
            <base-button class="btn" @click="logoutUser">Logout</base-button>
            <router-link class="btn" :to="{ name: 'user.samples' }">Edit Sample</router-link>
            {{ userData.name || "test" }}
	    </section>
        <base-section class="user-orders">
            <div class="sample-list-wrapper">
                <h1>Last orders ({{ userData.orders.length || 0 }})</h1>
                <ul>
                    <li v-for="(item, index) in userData.orders" :key="index">{{ item }}</li>
                </ul>
            </div>
        </base-section>
        <base-section class="user-saples">
            <div class="sample-list-wrapper">
                <h1>Crop samples ({{ userSamples.length }})</h1>
                <ul class="sample-list" v-for="(item, index) in userSamples" :key="index">
                    <small-sample-card :item="item"></small-sample-card>
                </ul>
            </div>
        </base-section>
    </main>
    `,
    components: {
        SmallSampleCard,
    },
    watch: {
        // żeby wylogowywało po uruchominiu timera trzeba zamontować watcher na karzdym views
        userData(newValue, oldValue){
            if(newValue === null){
                this.$router.push('/')
            }
        }
    },
    name: 'User',
    computed: {
        userData() {
            return this.$store.getters.getLogedInUser
        },
        userSamples() {
            return this.$store.getters.getItems.filter(e => e.cropSegment == 'pomidor') || []
        }
    },
    methods: {
        logoutUser(){
            this.$store.dispatch('logoutUser')
            this.$router.push('/')
        }
    },
}