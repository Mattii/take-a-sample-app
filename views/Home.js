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
                        <li  class="sample-list-item">
                            <div>
                                <p class="variety-segment varietyLabel">{{ item.cropSegment }}</p>
                                <h3 class="variety-name">{{ item.cropName.toLocaleUpperCase() }}</h3>
                            </div>
                            <div>
                                <p class="varietyLabel">rozmiar pakowania</p> 
                                <p class="variety-packing">{{ item.cropPacking }}</p>
                            </div>
                            <div>
                                <p class="varietyLabel">ilość opakowań</p>
                                <p class="variety-quantity">{{ item.cropQuantity }}</p>
                            </div>
                            <div>
                                <p class="varietyLabel">ilość nasion</p>
                                <p class="variety-stoc=quantity">{{ +item.cropPacking * +item.cropQuantity }}</p>
                            </div>
                            <div>
                                <p class="varietyLabel">data pakowania</p>
                                <p class="variety-packing-date">{{ item.packingDate }}</p>
                            </div>
                            <p class="remark-counter" v-if="item.remarks && item.remarks.length > 0">
                            there is {{ item.remarks.length }} remark
                            </p>
                            <div>
                                <img :src="'./img/vegetables/'+ item.cropSegment +'.png'" alt="lt_butter_leaf" >		
                                <img :src="'./img/vegetables/'+ item.cropSegment +'.png'" alt="lt_butter_leaf" >
                            </div>
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