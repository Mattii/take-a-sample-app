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
                <router-link class="btn" v-if="userData.privileges == 'admin'" :to="{ name: 'user.samples' }"><img width="24" src="../img/edit.svg"/><p>Edytuj Samp...</p></router-link>
                <base-button class="btn" @click="logoutUser"><img width="24" src="../img/logout.svg"/><p>Wyloguj</p></base-button>    
            </div>
	    </base-section>
        <base-section class="user-orders" v-if="!!userData">
            <div class="sample-list-wrapper">
                <div class="card section-header">
                    <h1>Ostatnie zamówienia</h1>
                    <span>({{ userData.orders.length }})</span>
                </div>
                <ul>
                    <li v-for="(item, index) in userData.orders" :key="index">{{ item }}</li>
                </ul>
            </div>
        </base-section>
        <base-section class="user-samples" v-if="!!userSamples">
            <div class="sample-list-wrapper">
            <div class="card section-header">
                    <h1>Crop samples</h1>
                    <span>({{ userSamples.length }})</span>
                </div>
                <ul class="sample-list">
                    <router-link
                            v-for="item in userSamples" 
                            :key="item.id" :to="{name: 'details.show', params: {id: item.id}}">
                            <small-sample-card :item="item" />
                    </router-link>
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