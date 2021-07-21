import store from "./store.js";
import router from "./router.js";
// components
import SampleList from "./components/SampleList.js";
import BaseButton from "./components/UI/BaseButton.js";
import BaseSection from "./components/UI/BaseSection.js";
import TheHeader from "./components/TheHeader.js";
import AddSampleForm from "./components/AddSampleForm.js";


const shoppingListApp = Vue.createApp({
    components: { 
        'SampleList': SampleList, 
        'AddSampleForm': AddSampleForm 
    },
    data(){
        return {
            displayAddingForm: false,
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
            this.displayAddingForm = !this.displayAddingForm
            if(this.displayAddingForm == false){
                this.$store.dispatch( 'editedSampleId', null)
            }
        },
        showForm(state) {
            this.displayAddingForm = state
        }
    },
    created() {
        this.$store.dispatch('fetchSampleItems')
    }
})
.component('TheHeader', TheHeader)
.component('BaseButton', BaseButton)
.component('BaseSection', BaseSection);
shoppingListApp.use(store);
shoppingListApp.use(router);
shoppingListApp.mount('#shopping-list');