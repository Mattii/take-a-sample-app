
import HeroBaner from "../components/Home/HeroBaner.js";
import LoginBaner from "../components/Home/LoginBaner.js";
import SmallSampleCard from "../components/Home/SmallSampleCard.js";
export default {
    template: `
        <main>
        <base-section>
            <hero-baner v-if="isToken"/>
            <login-baner v-else />
        </base-section>
        <base-section v-if="newSample.length > 0 && isToken" id="newSampleVarietyList">
            <div class="sample-list-wrapper">
                <h1>New samples ({{ newSample.length }})</h1>
                <ul class="sample-list">
                    <router-link
                        v-for="item in newSample" 
                        :key="item.id" :to="{name: 'details.show', params: {id: item.id}}">
                        <small-sample-card :item="item" />
                    </router-link>
                </ul>
            </div>
        </base-section>

        <base-section v-if="oldItems.length > 0 && isToken" id="sampleVarietyList">
            <div class="sample-list-wrapper">
                <h1>Old Sample ({{ oldItems.length }})</h1>
                <ul class="sample-list">
                    <router-link
                        v-for="item in oldItems" 
                        :key="item.id" :to="{name: 'details.show', params: {id: item.id}}">
                        <small-sample-card :item="item" />
                    </router-link>
                </ul>
            </div>
        </base-section>
        </main>
    `,
    name: 'Home',
    components: { 
        'HeroBaner': HeroBaner,
        'LoginBaner': LoginBaner,
        'SmallSampleCard': SmallSampleCard,
    },
    data(){
        return {
        }
    },
    created() {
        if(this.$store.getters.getToken){
            this.$store.dispatch('fetchSampleItems')
        }
    },
    beforeRouteEnter (to, from, next) {
        // ...
        next()
    },
    computed: {
        items() {
            return this.$store.getters.getItems.filter(e => e.cropQuantity > 0)
        },
        newSample() {
            return this.items.filter(e => e.createdAt > new Date().getTime() - 2678400000 / 2)
        },
        oldItems() {
            return this.items.filter(e => e.packingDate + 63158400000 < new Date().getTime())
        },
        isToken() {
            return this.$store.getters.getToken
        }
    },
    methods:{
    },
}