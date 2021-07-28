import SampleList from "../components/SampleList.js";
import HeroBaner from "../components/HeroBaner.js";
import LoginBaner from "../components/LoginBaner.js";
export default {
    template: `
        <main>
        <base-section>
            <hero-baner v-if="isToken"/>
            <login-baner v-else />
        </base-section>
        <base-section v-if="newSample.length > 0 && isToken" id="newSampleVarietyList">
            <sample-list 
                :items="newSample"
            >New Sample</sample-list>
        </base-section>

        <base-section v-if="items.length > 0 && isToken" id="sampleVarietyList">
            <sample-list 
                :items="items"
            >Sample on stoc</sample-list>
        </base-section>
        </main>
    `,
    components: { 
        'SampleList': SampleList,
        'HeroBaner': HeroBaner,
        'LoginBaner': LoginBaner,
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
        isToken() {
            return this.$store.getters.getToken
        }
    },
    methods:{
    },
    created() {
        this.$store.dispatch('fetchSampleItems')
    }
    
}