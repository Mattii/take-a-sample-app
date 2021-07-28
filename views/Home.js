import SampleList from "../components/SampleList.js";
import HeroBaner from "../components/Home/HeroBaner.js";
import LoginBaner from "../components/Home/LoginBaner.js";
export default {
    template: `
        <main>
        <base-section>
            <hero-baner v-if="isToken"/>
            <login-baner v-else />
        </base-section>
        <base-section v-if="newSample.length > 0 && isToken" id="newSampleVarietyList">
        <div class="sample-list-wrapper">
            <h2>New Sample ({{ newSample.length }})</h2>
            <ul class="sample-list">
                <router-link
                    v-for="item in newSample" 
                    :key="item.id" :to="{name: 'details.show', params: {id: item.id}}">
                    <li  class="sampleListItem">
                        <div>
                            <p class="varietySegment">{{ item.cropSegment }}</p>
                            <h3 class="varietyName">{{ item.cropName.toLocaleUpperCase() }}</h3>
                        </div>
                        <p class="varietyPackingDate">Data pakowania: <span>{{ item.packingDate }}</span></p>
                        <p class="varietyStock">{{ item.cropPacking }} nasion x {{ item.cropQuantity }} opakowania ( {{ +item.cropPacking * +item.cropQuantity }} nasoin )</p>
                        <p class="remarkCounter" v-if="item.remarks && item.remarks.length > 0">
                        there is {{ item.remarks.length }} remark
                        </p>		
                        <img :src="'./img/vegetables/'+ item.cropSegment +'.png'" alt="lt_butter_leaf" >
                    </li>
                </router-link>
            </ul>
        </div>
        </base-section>

        <base-section v-if="items.length > 0 && isToken" id="sampleVarietyList">
            <sample-list 
                :items="items"
            >Sample on stoc</sample-list>
        </base-section>
        </main>
    `,
    components: { 
        'SampleList': SampleList,
        'HeroBaner': HeroBaner,
        'LoginBaner': LoginBaner,
    },
    data(){
        return {
        }
    },
    computed: {
        items() {
            return this.$store.getters.getItems
        },
        newSample() {
            return this.items.filter(e => new Date(e.createdAt).getTime() > new Date().getTime() - (63158400000 / 50))
        },
        isToken() {
            return this.$store.getters.getToken
        }
    },
    methods:{
    },
    created() {
        this.$store.dispatch('fetchSampleItems')
    }
    
}