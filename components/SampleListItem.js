export default {
    template: `
        <li class="sampleListItem">
            <div>
                <p class="varietySegment">{{ item.cropSegment }}</p>
                <h3 class="varietyName">{{ item.cropName.toLocaleUpperCase() }}</h3>
            </div>
            <p class="varietyPackingDate">Data pakowania: <span :class="{expired: expired(item.packingDate)}">{{ item.packingDate }}</span></p>
            <p class="varietyStock">{{ item.cropPacking }} nasion x {{ item.cropQuantity }} opakowania ( {{ +item.cropPacking * +item.cropQuantity }} nasoin )</p>
            <p class="remarkCounter" v-if="item.remarks && item.remarks.length > 0">
               there is {{ item.remarks.length }} remark
            </p>
            <div v-if="info === 'edit'" class="varietyListActions">
                <base-button class="btn" @click="editVariety(item.id)">Edit</base-button>
                <router-link class="btn" :to="{name: 'details.show', params: {id: item.id}}">Details</router-link>
                <base-button class="btn">Add to chart</base-button>
                <base-button class="btn btn-cancel" @click="deleteVariety(item.id)">Delete</base-button>
            </div>		
            
	        <img :src="'./img/vegetables/'+ item.cropSegment +'.png'" alt="lt_butter_leaf" >
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