import store from "./store.js";
// components
import SampleList from "./components/SampleList.js";
import BaseButton from "./components/UI/BaseButton.js";
import BaseSection from "./components/UI/BaseSection.js";
import TheHeader from "./components/TheHeader.js";

const About = { template: '<div>About</div>' }

const routes = [
    { path: '/about', component: About },
  ]
const router = VueRouter.createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: VueRouter.createWebHistory(),
    routes, // short for `routes: routes`
  })

const shoppingListApp = Vue.createApp({
    components: { 'SampleList': SampleList },
    data(){
        return {
            logedInUser: 'Mateusz Ś',
            isEdited: false,
            editedId: null,
            cropFormSegment: null,
            cropSegments: [
                'pomidor',
                'ogórek',
                'papryka',
                'cebula',
                'rzodkiewka',
                'kapusta',
            ],
            cropFormName: '',
            cropFormPackingType: '',
            cropPackings: [
                '100',
                '250',
                '5000',
                '2500',
                '50000',
                '1000000',
            ],
            cropFormPackQuantity: null,
            cropFormPackingDate: null,
            cropFormBatch: null,
            displayAddingForm: false,
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
        submitForm() {
            if(this.isEdited){
                const indexItem = this.items.findIndex(e => e.id === this.editedId)
                const editedItem = {
                    ...this.items[indexItem],
                    updatedAt: new Date().toLocaleString(),
                    updatedBy: this.logedInUser,
                    cropSegment: this.cropFormSegment,						
                    cropName: this.cropFormName,
                    cropPacking: this.cropFormPackingType,
                    cropQuantity: this.cropFormPackQuantity,
                    packingDate: this.cropFormPackingDate,
                    cropBatch: this.cropFormBatch,
                }
                this.$store.dispatch('editSampleItem', editedItem)
                this.isEdited = false
            } else {
                const newItem = {
                    id: new Date().getTime(),
                    createdAt: new Date().toLocaleString(),
                    creator: this.logedInUser,
                    cropSegment: this.cropFormSegment,						
                    cropName: this.cropFormName,
                    cropPacking: this.cropFormPackingType,
                    cropQuantity: this.cropFormPackQuantity,
                    packingDate: this.cropFormPackingDate,
                    cropBatch: this.cropFormBatch,
                    remarks: [],
                }
                this.$store.dispatch('postSampleItem', newItem)
            }
            this.clearForm()
        },
        clearForm() {
                this.cropFormSegment = null
                this.cropFormName = null
                this.cropFormPackingType = null
                this.cropFormPackQuantity = null
                this.cropFormPackingDate = null
                this.cropFormBatch = null
                this.isEdited = false
        },
        showAddForm() {
            this.displayAddingForm = !this.displayAddingForm
        },
        editVariety(id) {
            this.displayAddingForm = true
            this.isEdited = true
            const editedVariety = this.items.find(e => e.id === id)
            this.cropFormSegment = editedVariety.cropSegment
            this.cropFormName = editedVariety.cropName
            this.cropFormPackingType = editedVariety.cropPacking
            this.cropFormPackQuantity = editedVariety.cropQuantity
            this.cropFormPackingDate = editedVariety.packingDate
            this.cropFormBatch = editedVariety.cropBatch
            this.editedId = id
        },
        deleteVariety(id) {
            this.$store.dispatch('deleteSampleItem', id);
        },
        addRemarkToVarietyt(id, remarkText) {
            const varietyIndex = this.items.findIndex(e => e.id === id)
            const remark = {
                createdRemarkAt: new Date().toLocaleString(),
                creatorOfRemark: this.logedInUser,
                text: remarkText,
            }
            this.items[varietyIndex].remarks.push(remark)
        },
    },
    created() {
        this.$store.dispatch('fetchSampleItems')
    }
})
.component('TheHeader', TheHeader)
.component('BaseButton', BaseButton)
.component('BaseSection', BaseSection);
shoppingListApp.use(store);
shoppingListApp.mount('#shopping-list');