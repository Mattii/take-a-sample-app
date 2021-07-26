import SampleList from "../components/SampleList.js";
export default {
    template: `
        <main>
        <base-section>
            <div class="hero-element">
                <h2>Predict the future and <br /><span>take a sample</span> <br /> of innovation</h2>
                <base-button class="btn btn-to-action">Take some</base-button>
            </div>
        </base-section>
        <base-section v-if="newSample.length > 0" id="newSampleVarietyList">
            <sample-list 
                :items="newSample"
            >New Sample</sample-list>
        </base-section>

        <base-section v-if="items.length > 0" id="sampleVarietyList">
            <sample-list 
                :items="items"
            >Sample on stoc</sample-list>
        </base-section>
        </main>
    `,
    components: { 
        'SampleList': SampleList,
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
        }
    },
    methods:{
    },
}