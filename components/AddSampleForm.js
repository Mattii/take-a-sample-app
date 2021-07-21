export default {
    template:`
    <div>
    <h2>Add new sample</h2>
    <form @submit.prevent="submitForm" id="sampleAddForm">
        <div>
            <label for="cropFormSegment">Segment</label>
            <input 
                list="cropFormTypes" 
                id="cropFormSegment" 
                placeholder="Choose Crop"  
                v-model="cropFormSegment"
                required					
            />
            <datalist id="cropFormTypes">
                <option 
                    v-for="cropSegment in cropSegments" 
                    :key="cropSegment" 
                    :value="cropSegment" 
                />
            </datalist>
        </div>
        <div>
            <label for="cropFormName">Name</label>
            <input 
                id="cropFormName" 
                type="text" 
                v-model.lazy="cropFormName" 
                placeholder="Add an Name of Crop"
                autocomplete="username"
                required
            />
        </div>
        <div>
            <label for="cropFormPackingType">Packing</label>
            <input 
                id="cropFormPackingType"
                list="cropFormPackingTypes"
                v-model="cropFormPackingType"
                placeholder="Add an packing type"
                required
            />
            <datalist id="cropFormPackingTypes">
                <option 
                    v-for="packing in cropPackings" 
                    :key="packing" 
                    :value="packing" 
                />
            </datalist>
        </div>
        <div>
            <label for="cropFormPackQuantity">Number of pack</label>
            <input 
                id="cropFormPackQuantity"
                type="number"
                v-model="cropFormPackQuantity"
                min="1"
                placeholder="At least 1"
                required
            />
        </div>
        <div>
            <label for="cropFormPackingDate">Packing date</label>
            <input 
                type="date" 
                id="cropFormPackingDate" 
                v-model="cropFormPackingDate" 
                required
            > 
        </div>
        <div>
            <label for="cropFormBatch">Batch</label>
            <input 
                id="cropFormBatch" 
                type="text"
                v-model.lazy="cropFormBatch" 
                placeholder="Add an Batch of Crop"
                minlength="6"
                maxlength="6"
                autocomplete="off"
                required
            />
        </div>
        
        <base-button class="btn btn-primery btn-to-action" type="submit">{{!isEdited ? 'Add sample' : 'Edit sample'}}</base-button>
        <base-button class="btn btn-cancel" type="reset" @click="clearForm">Cancle</base-button>
    </form>
    </div>
    `,
    data(){
        return {
            isEdited: false,
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
        }
    },
    watch: {
        editedId: function(newId, oldId) {
            if(this.editedId !== null){
                this.editVariety(this.editedId)
            }
        }
    },
    methods: {
        submitForm() {
            if(this.isEdited){
                const indexItem = this.$store.getters.getItems.findIndex(e => e.id === this.editedId)
                const editedItem = {
                    ...this.$store.getters.getItems[indexItem],
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
                this.$store.dispatch( 'editedSampleId', null)
        }, 
        editVariety(id) {
            this.isEdited = true
            const editedVariety = this.$store.getters.getItems.find(e => e.id === id)
            this.cropFormSegment = editedVariety.cropSegment
            this.cropFormName = editedVariety.cropName
            this.cropFormPackingType = editedVariety.cropPacking
            this.cropFormPackQuantity = editedVariety.cropQuantity
            this.cropFormPackingDate = editedVariety.packingDate
            this.cropFormBatch = editedVariety.cropBatch
            this.editedId = id
        },
    },
    computed: {
        logedInUser() {
            return this.$store.getters.getLogedInUser
        },
        editedId: {
            get: function() {
                return this.$store.getters.editedItemId
            },
            set: function(newValue) {
                console.log('test');
            }
        }
    },

}