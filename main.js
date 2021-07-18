let SampleListItem = {
    template: `
        <li class="sampleListItem">
            <div>
                <p class="varietySegment">{{ item.cropSegment }}</p>
                <h3 class="varietyName">{{ item.cropName.toLocaleUpperCase() }}</h3>
            </div>
            <p class="varietyPackingDate">Data pakowania: <span :class="{expired: expired(item.packingDate)}">{{ item.packingDate }}</span></p>
            <p class="varietyStock">{{ item.cropPacking }} nasion x {{ item.cropQuantity }} opakowania ( {{ +item.cropPacking * +item.cropQuantity }} nasoin )</p>
            <ul class="remarkList" v-if="item.remarks.length > 0">
                <li v-for="remark in item.remarks" class="varietyRemark">{{ remark.text }}</li>
            </ul>
            <div v-if="showRemark" class="remark">
                <textarea v-model="remarkText" cols="25" rows="1" placeholder="Add an remark"></textarea>
                <button class="btn btn-primery" @click="addRemarkToVarietyt(item.id)">Add Remark</button>
            </div>
            <div class="varietyListActions">
                <button class="btn" @click="editVariety(item.id)">Edit</button>
                <button class="btn" @click="showRemark = !showRemark">Remark</button>
                <button class="btn">Add to chart</button>
                <button class="btn btn-cancel" @click="deleteVariety(item.id)">Delete</button>
            </div>		
        </li>
    `,
    name: 'SampleListItem',
    props: {
        item: {
            type: Object,
            required: true,    
        },
    },
    data() {
        return {
            showRemark: false,
            remarkText: '',
        }
    },
    methods: {
        expired(date) {
            const now = new Date().getTime();
            const expDate = new Date(date).getTime()
            const expDatePlusTwoYears = expDate + 63158400000
            return expDatePlusTwoYears < now
        },
        addRemarkToVarietyt(id) {
            this.$emit('addRemarkToVarietyt', id, this.remarkText)
            this.remarkText = ''
            this.showRemark = false
        },
        deleteVariety(id) {
            this.$emit('deleteVariety', id)
        },
        editVariety(id) {
            this.$emit( 'edit-variety', id)
        }
    }
}
let SampleList = {
    template: `
    <div class="sample-list-wrapper">
        <h2><slot></slot> ({{ items.length }})</h2>
        <ul class="slampleList">
            <sample-list-item 
                v-for="item in items" 
                :key="item.id" 
                :item="item"
                @deleteVariety="deleteVariety"
                @editVariety="editVariety"
                @addRemarkToVarietyt="addRemarkToVarietyt"
            ></sample-list-item>
        </ul>
    </div>
    `,
    name: 'SampleList',
    components: { 'SampleListItem': SampleListItem },
    props: {
        items: {
            type: Array,
            required: true,
        }
    },
    methods: {
        deleteVariety(id) {
            this.$emit('deleteVariety', id)
        },
        editVariety(id) {
            this.$emit( 'editVariety', id)
        },
        addRemarkToVarietyt(id, remarkText) {
            this.$emit('addRemarkToVarietyt', id, remarkText)
        },
    }
}



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
            items: [
                {
                    createdAt: "7/8/2021, 10:29:46 AM",
                    creator: "Mateusz Ś",
                    cropBatch: "555555",
                    cropName: "adanto",
                    cropPacking: "100",
                    cropQuantity: "4",
                    cropSegment: "sałata",
                    id: 1625732986787,
                    packingDate: "2019-07-08",
                    remarks: [],
                },
                {
                    createdAt: "7/15/2021, 10:29:46 AM",
                    creator: "Mateusz Ś",
                    cropBatch: "555555",
                    cropName: "fairly",
                    cropPacking: "100",
                    cropQuantity: "4",
                    cropSegment: "sałata",
                    id: 1625732986790,
                    packingDate: "2021-07-15",
                    remarks: [],
                },
                {
                    createdAt: "7/15/2021, 10:29:46 AM",
                    creator: "Mateusz Ś",
                    cropBatch: "555555",
                    cropName: "dabi",
                    cropPacking: "500",
                    cropQuantity: "7",
                    cropSegment: "sałata",
                    id: 1625732986900,
                    packingDate: "2020-07-15",
                    remarks: [],
                },
                {
                    createdAt: "7/6/2021, 10:29:46 AM",
                    creator: "Mateusz Ś",
                    cropBatch: "555555",
                    cropName: "dabi",
                    cropPacking: "500",
                    cropQuantity: "7",
                    cropSegment: "sałata",
                    id: 1625732986900,
                    packingDate: "2020-07-08",
                    remarks: [],
                },
                
            ],
        }
    },
    computed: {
        newSample() {
            return this.items.filter(e => new Date(e.createdAt).getTime() > new Date().getTime() - (63158400000 / 100))
        }
    },
    methods:{
        submitForm() {
            if(this.isEdited){
                const indexItem = this.items.findIndex(e => e.id === this.editedId)
                this.items[indexItem] = {
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
                this.items.unshift(newItem)
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
            this.items = this.items.filter(e => e.id !== id);
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
})
.component('TheHeader', {
    template: `
        <header>
	        <img src="/img/pie-chart.svg" alt="pie-chart">
            <h1><slot></slot></h1>
            <nav>
		        <button @click="showAddForm" class="btn btn-round">Add</button>
	        </nav>
        </header>
    `,
    data() {
        return {
            header: 'Take Sample',
        }
    },
    methods: {
        showAddForm() {
            this.$emit('showAddForm')
        }
    }
} )
.mount('#shopping-list');