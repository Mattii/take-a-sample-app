import SmallSampleCard from "../components/Home/SmallSampleCard.js"
export default {
    template: `
    <main>
        <base-section class="user-details" v-if="!!userData">
            <img class="user-img" :src="'img/' + userData.imageUrl" :alt="userData.name"/>
            <div class="introduction">
                <p class="varietyLabel">{{ userData.position }}</p>
                <p>{{ userData.name }}</p>
            </div>
            <div class="introduction-details card">
                    <p>Orders: {{ userData.orders.length }}</p>
                    <p>Main crop: {{ userData.crop }}</p>
                    <p>Rgion: {{ userData.region }}</p>  
            </div>
            <div class="user-actions">
                <router-link class="btn" v-if="userData.privileges == 'admin'" :to="{ name: 'user.samples' }"><img width="32" src="../img/edit.svg"/>Edit</router-link>
                <base-button class="btn" @click="logoutUser"><img width="32" src="../img/logout.svg"/>Logout</base-button>    
            </div>
	    </base-section>
        <base-section class="user-orders" v-if="!!userData">
            <div class="sample-list-wrapper">
                <h1>Last orders ({{ userData.orders.length || 0 }})</h1>
                <ul>
                    <li v-for="(item, index) in userData.orders" :key="index">{{ item }}</li>
                </ul>
            </div>
        </base-section>
        <base-section class="user-samples" v-if="!!userSamples">
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
            this.$router.push('/')
            this.$store.dispatch('logoutUser')
        }
    },
}