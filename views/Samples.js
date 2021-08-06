import AddSampleForm from "../components/AddSampleForm.js";
import SampleList from "../components/SampleList.js";
import OrderItemTab from "../components/Samples/OrderItemTab.js";
import OrderCustomerTab from "../components/Samples/OrderCustomerTab.js";

export default {
    template: `
        <div style="min-height: 79vh">
        <nav class="add-sample-nav">
		        <base-button @click="showAddForm" class="btn btn-to-action">Order<span v-if="chartItems.length > 0" class="chart-counter">{{ chartItems.length }}</span></base-button>
	    </nav>
    	<section class="showSection" v-if="showSection">
            <div>
            <h2>Your order</h2>
            <button @click="currentTab = 'Items'">Items</button>
            <button @click="currentTab = 'Customer'">Customer</button>
        </div>
            <component :is="currentTabComponent" :chartItems="chartItems" class="tab"></component>
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
        'ItemsTab': OrderItemTab,
        'CustomerTab': OrderCustomerTab,
    },
    data(){
        return {
            showSection: false,
            currentTab: 'Items',
            tabs:['Items','Customer'],
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
        },
        currentTabComponent(){
            return this.currentTab.toLowerCase() + '-tab'
        },
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