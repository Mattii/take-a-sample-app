import AddSampleForm from "../components/AddSampleForm.js";
import SampleList from "../components/SampleList.js";

export default {
    template: `
        <div>
        <nav class="add-sample-nav">
		        <base-button @click="showAddForm" class="btn btn-to-action">Order</base-button>
	    </nav>
    	<section id="addingForm" v-if="displayForm">
            <h2>Your ordered Samples</h2>
            
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
     components: { 
        'SampleList': SampleList, 
        'AddSampleForm': AddSampleForm 
    },
    data(){
        return {
            displayForm: false,
            isEdited: null
        }
    },
    computed: {
        items() {
            return this.$store.getters.getItems
        },
        newSample() {
            return this.items.filter(e => new Date(e.createdAt).getTime() > new Date().getTime() - (63158400000 / 100))
        }
    },
    methods:{
        showAddForm() {
            this.displayForm = !this.displayForm
            if(this.displayForm == false){
                this.$store.dispatch( 'editedSampleId', null)
            }
        },
        showForm(state) {
            this.displayForm = state
        }
    }
}