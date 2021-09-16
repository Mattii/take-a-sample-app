import AddSampleForm from "../components/AddSampleForm.js";
import SampleList from "../components/SampleList.js";

export default {
    template: `
        <div>
        <teleport to="#main-nav-search">
                <div class="serch-sample">
                    <input v-model="searchString" type="text" placeholder="Wyszukaj pruby..."/>
                </div>
        </teleport>
        <nav class="add-sample-nav">
		        <base-button @click="showAddForm"><img width="52" src="../img/add.svg"/></base-button>
	    </nav>
        <teleport to='#header-element'>
            <section id="addingForm" v-if="displayForm">
                <add-sample-form></add-sample-form>
            </section>
        </teleport>
        <main>
        <!-- <base-section v-if="newSample.length > 0" id="newSampleVarietyList">
            <sample-list 
                :items="newSample"
                @show-form="showForm"
                info="edit"
            >New Sample</sample-list>
        </base-section> -->
        <base-section v-if="items.length > 0" id="sampleVarietyList">
            <sample-list 
                :items="items"
                @show-form="showForm"
                info="edit"
            >Sample on stoc</sample-list>
        </base-section>
        </main>
        </div>
    `,
    name:'UserSamples',
    components: { 
        'SampleList': SampleList, 
        'AddSampleForm': AddSampleForm 
    },
    data(){
        return {
            displayForm: false,
            isEdited: null,
            searchString: '',
        }
    },
    computed: {
        items() {
            return this.$store.getters.getItems.filter(e => e.cropName.includes(this.searchString.toLowerCase()))
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