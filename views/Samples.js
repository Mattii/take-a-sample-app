import AddSampleForm from "../components/AddSampleForm.js";
import SampleList from "../components/SampleList.js";
import OrderSampleCard from "../components/Samples/OrderSampleCard.js";

export default {
    template: `
        <div style="min-height: 79vh">
        <nav class="add-sample-nav">
		        <base-button @click="showAddForm" class="btn btn-to-action">Order<span v-if="chartItems.length > 0" class="chart-counter">{{ chartItems.length }}</span></base-button>
	    </nav>
    	<section class="showSection" v-if="showSection">
            <h2>Samples in order</h2>
            <div v-if="chartItems.length > 0">
                <ul class="order-sample-list">
                    <order-sample-card class="samples-order-list-item" v-for="chartItem in chartItems" :key="chartItem.id" :chartItem="chartItem"></order-sample-card>
                </ul>
            </div>
            <p v-else>There's no samples in order &#128533 change that &#128522</p>
        </section>
        <main>
        <base-section v-if="newSample.length > 0" id="newSampleVarietyList">
            <sample-list 
                :items="newSample"
                @show-form="showForm"
            >New Sample</sample-list>
        </base-section>

        <base-section v-if="items.length > 0" id="sampleVarietyList">
            <sample-list 
                :items="items"
                @show-form="showForm"
            >Sample on stoc</sample-list>
        </base-section>
        </main>
        </div>
    `,
    name: 'Samples',
    components: { 
        'SampleList': SampleList, 
        'AddSampleForm': AddSampleForm,
        'OrderSampleCard': OrderSampleCard,
    },
    data(){
        return {
            showSection: false,
        }
    },
    computed: {
        items() {
            return this.$store.getters.getItems.filter(e => e.cropQuantity > 0)
        },
        chartItems() {
            return this.$store.getters.getChartItems
        },
        newSample() {
            return this.items.filter(e => new Date(e.createdAt).getTime() > new Date().getTime() - (63158400000 / 100))
        }
    },
    methods:{
        showAddForm() {
            this.showSection = !this.showSection
            if(this.showSection == false){
                this.$store.dispatch( 'editedSampleId', null)
            }
        },
        showForm(state) {
            this.displayForm = state
        }
    }
}