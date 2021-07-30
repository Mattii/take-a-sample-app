
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
                <h2>New Sample ({{ newSample.length }})</h2>
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
                <h2>Old Sample ({{ oldItems.length }})</h2>
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
    components: { 
        'HeroBaner': HeroBaner,
        'LoginBaner': LoginBaner,
        'SmallSampleCard': SmallSampleCard,
    },
    data(){
        return {
        }
    },
    computed: {
        items() {
            return this.$store.getters.getItems
        },
        newSample() {
            return this.items.filter(e => new Date(e.createdAt).getTime() > new Date().getTime() - (63158400000 / 50))
        },
        oldItems() {
            return this.items.filter(e => new Date(e.packingDate).getTime() + 63158400000 < new Date().getTime())
        },
        isToken() {
            return this.$store.getters.getToken
        }
    },
    methods:{
    },
    created() {
        if(this.isToken){
            this.$store.dispatch('fetchSampleItems')
        }
    }
    
}