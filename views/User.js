import SmallSampleCard from "../components/Home/SmallSampleCard.js"
import BoxSvg from "../components/UI/BoxSvg.js"
import EditSvg from "../components/UI/EditSvg.js"
import LogoutSvg from "../components/UI/LogoutSvg.js"
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
                <base-button @click="logoutUser">
                    <p>Wyloguj</p>
                    <logout-svg></logout-svg>
                </base-button>
                <p>Main crop: {{ userData.crop }}</p>
                <p>Rgion: {{ userData.region }}</p>
                <router-link v-if="userData.privileges == 'admin'" :to="{ name: 'user.samples' }">
                    <p>Edytuj sample</p>
                    <edit-svg></edit-svg>
                </router-link> 
                <router-link v-if="!!userData.orders" :to="{name: 'user.orders', params: {id: userData.localId }}">
                    <p>Moje zamówienia</p>
                    <span style="display: flex;align-items: center;gap:.5rem">
                        <p>{{ userData.orders.length }}</p>
                        <box-svg></box-svg>
                    </span>
                </router-link>
            </div>
            <div class="user-actions">    
            </div>
	    </base-section>
        <base-section class="user-samples" v-if="!!userSamples">
            <div class="sample-list-wrapper">
            <div class="card section-header">
                    <h1>Moje sample</h1>
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
        BoxSvg,
        EditSvg,
        LogoutSvg
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