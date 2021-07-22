export default {
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
            <div v-if="info === 'edit'" class="varietyListActions">
                <base-button class="btn" @click="editVariety(item.id)">Edit</base-button>
                <base-button class="btn" @click="showRemark = !showRemark">Remark</base-button>
                <base-button class="btn">Add to chart</base-button>
                <base-button class="btn btn-cancel" @click="deleteVariety(item.id)">Delete</base-button>
            </div>		
        </li>
    `,
    name: 'SampleListItem',
    props: {
        info: {
            type: String,
        },
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
            this.remarkText = ''
            this.showRemark = false
            const varietyIndex = this.items.findIndex(e => e.id === id)
            const remark = {
                createdRemarkAt: new Date().toLocaleString(),
                creatorOfRemark: this.logedInUser,
                text: remarkText,
            }
            this.items[varietyIndex].remarks.push(remark)
        },
        deleteVariety(id) {
            this.$store.dispatch('deleteSampleItem', id);
        },
        editVariety(id) {
            const editPromis = new Promise((resolve, reject) => {
                this.$emit( 'showForm', true)
                resolve()
            })
            editPromis.then(() => {
                    this.$store.dispatch( 'editedSampleId', id)
            })
            
        }
    }
}