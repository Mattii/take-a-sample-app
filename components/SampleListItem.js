export default {
    template: `
    <li  class="sample-list-item">
        <div>
            <p class="variety-segment varietyLabel"><strong v-if="newSample" style="color: red">NEW</strong> {{ item.cropSegment }}</p>
            <h3 class="variety-name">{{ item.cropName.toLocaleUpperCase() }}</h3>
        </div>
        <div>
            <p class="varietyLabel">rozmiar pakowania</p> 
            <p class="variety-packing">{{ item.cropPacking }}</p>
        </div>
        <div>
            <p class="varietyLabel">ilość opakowań</p>
            <p class="variety-quantity">{{ itemChartDifrence }}</p>
        </div>
        <div>
            <p class="varietyLabel">ilość nasion</p>
            <p class="variety-stoc=quantity">{{ +item.cropPacking * +itemChartDifrence }}</p>
        </div>
        <div>
            <p class="varietyLabel">data pakowania</p>
            <p class="variety-packing-date" :class="{'expired-date': expired(item.packingDate)}">{{ toDateString(item.packingDate) }}</p>
        </div>
        <p class="remark-counter" v-if="item.remarks && item.remarks.length > 0">
        there is {{ item.remarks.length }} remark
        </p>
        <div class="varietyListActions">
                <div class="varietyListChartCounter">
                    <base-button class="btn" :class="{'btn-to-action': toChartQnt > 0}" @click="addItemToChart">Add <span style="font-weight:bold">{{ toChartQnt }}</span> to chart <br /> {{ +toChartQnt * +item.cropPacking}} seeds</base-button>
                    <base-button class="btn" @click="increaseAmount">+</base-button>
                    <base-button class="btn" @click="decreseAmount">-</base-button>
                </div>
                <base-button v-if="info === 'edit'" class="btn" @click="editVariety(item.id)">Edit</base-button>
                <router-link class="btn" :to="{name: 'details.show', params: {id: item.id}}">Details</router-link>
                <base-button v-if="info === 'edit'" class="btn btn-cancel" @click="deleteVariety(item.id)">Delete</base-button>
        </div>		
        <div class="varietyImages">
            <img :src="'../img/vegetables/'+ item.cropSegment +'.png'" alt="lt_butter_leaf" >		
            <img :src="'../img/vegetables/'+ item.cropSegment +'.png'" alt="lt_butter_leaf" >
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
            remarkText: '',
            toChartQnt: 0,
        }
    },
    computed: {
        itemChartDifrence(){
            return this.item.cropQuantity - this.toChartQnt
        },
        newSample() {
            return this.item.createdAt > new Date().getTime() - 2678400000 / 2
        },
    },
    methods: {
        toDateString(date){
            return new Date(1629158400000).toLocaleDateString('en-GB', {month: 'numeric', year: 'numeric'})
        },
        increaseAmount() {
            if(this.itemChartDifrence > 0){
                this.toChartQnt++
            }
        },
        decreseAmount() {
            if(this.toChartQnt > 0){
                this.toChartQnt--
            }
        },
        addItemToChart(){
            if(this.toChartQnt > 0){ 
                this.$store.dispatch('addItemToChart', {qty: this.toChartQnt, id: this.item.id})
                this.toChartQnt = 0
            }
        },
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