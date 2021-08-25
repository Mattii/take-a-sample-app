import AddSampleForm from "../components/AddSampleForm.js";
import SampleList from "../components/SampleList.js";
import OrderItemTab from "../components/Samples/OrderItemTab.js";
import OrderCustomerTab from "../components/Samples/OrderCustomerTab.js";

export default {
    template: `
        <div style="min-height: 79vh">
        <nav class="add-sample-nav">
                <base-button @click="showAddForm"><img width="52" src="../img/basket.svg"/><span v-if="chartItems.length > 0" class="chart-counter">{{ chartItems.length }}</span></base-button>
	    </nav>
        <teleport to="#header-element">
    	<section class="showSection" v-if="showSection">
            <div>
                <h2>Order</h2>
                <base-button class="btn" :class="{'btn-tab': currentTab === 'Items' }" @click="currentTab = 'Items'">Items</base-button>
                <base-button :disabled="chartItems.length === 0" class="btn" :class="{'btn-tab': currentTab === 'Customer' }" @click="currentTab = 'Customer'">Customer</base-button>
            </div>
            <keep-alive>
                <component :is="currentTabComponent" :chartItems="chartItems" class="tab"></component>
            </keep-alive>
        </section>
        </teleport>
        <main>
        <!-- <base-section v-if="newSample.length > 0" id="newSampleVarietyList">
            <sample-list 
                :items="newSample"
                @show-form="showForm"
            >New Sample</sample-list>
        </base-section> -->

        <base-section v-if="items.length > 0" id="sampleVarietyList">
            <sample-list 
                :items="items"
                @show-form="showForm"
            >Sample on stock</sample-list>
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