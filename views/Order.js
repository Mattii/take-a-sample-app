import SmallSampleCard from "../components/Home/SmallSampleCard.js"

export default {
    template: `
    <div>
    <base-section >
            <div class="base-section-header">
                    <h1>szczeguły zamówienia...  </h1>
                    <p class="varietyLabel">zamówione  {{ new Date(order.orderedAt).toLocaleString() }}</p>
            </div>
        <div class="order-details">
            <div v-if="order.userName"> 
                <span>
                    <p class="varietyLabel">zamówione</p>
                    <p>{{ new Date(order.orderedAt).toLocaleString() }}</p>
                    <p class="varietyLabel">przez</p>
                    <p>{{ firstLettertoUpperCase }}</p>
                </span>
            </div>
            <div class="card">
                <p class="varietyLabel">status</p>
                <p v-if="!order.confirm">do realizacji</p>
                <p v-else>zrealizowane</p>
            </div>
            <div class="card" v-if="order.userName">
                <p class="varietyLabel">zamówione dla</p>
                <h2>{{ order.orderCustomer.toLocaleUpperCase()}}</h2>
            </div>
            <div>
                <p class="varietyLabel"> termin płatnośi</p>
                <p>{{ order.paymentTerm }}</p>
            </div>
            <div class="card" v-if="order.orderRemark">
                <p class="varietyLabel">uwagi</p>
                <p>{{ order.orderRemark }}</p>
            </div>   
        </div>     
    </base-section>
    <base-section >
            <div class="base-section-header">
                    <h1>linie zamówienia...  </h1>
                    <p class="varietyLabel">{{ order.chartLines }} batchy</p>
            </div>   
            <ul class="sample-list">
                    <router-link
                        v-for="item in chart" 
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
                                <p class="variety-quantity">{{ item.chartQty }}</p>
                            </div>
                            <div>
                                <p class="varietyLabel">ilość nasion</p>
                                <p class="variety-stoc=quantity">{{ +item.cropPacking * +item.chartQty }}</p>
                            </div>
                            <div>
                                <p class="varietyLabel">data pakowania</p>
                                <p class="variety-packing-date" :class="{'expired-date': expired(item.packingDate)}">{{ toDateString(item.packingDate) }}</p>
                            </div>
                            <p class="remark-counter" v-if="item.remarks && item.remarks.length > 0">
                            there is {{ item.remarks.length }} remark
                            </p>
                            <div class="varietyImages">
                                <img :src="'./img/vegetables/'+ item.cropSegment +'.png'" alt="lt_butter_leaf" >		
                                <img :src="'./img/vegetables/'+ item.cropSegment +'.png'" alt="lt_butter_leaf" >
                            </div>
                        </li>
                    </router-link>
            </ul> 
    </base-section>
</div>
    `,
    name: 'Orders',
    components:{
        'SmallSampleCard': SmallSampleCard
    },
    props: {
        orderId: {
            type: String,
            required: true,
        }
    },
    data() {
        return {
            order: {},
            chart: {},
        }
    },
    computed:{
        firstLettertoUpperCase(){
            return this.order.userName[0].toLocaleUpperCase() + this.order.userName.substring(1)
        }
    },
    methods:{
        expired(date) {
            const now = new Date().getTime();
            const expDate = new Date(date).getTime()
            const expDatePlusTwoYears = expDate + 63158400000
            return expDatePlusTwoYears < now
        },
        toDateString(date){
          return new Date(date).toLocaleDateString('en-GB', {month: 'numeric', year: 'numeric'})
        }
    },
    async created() {
            const resOrder = fetch(`https://tas-sample-app-default-rtdb.europe-west1.firebasedatabase.app/orders/${this.orderId}.json?auth=${this.$store.getters.getToken}`)
            const resChart = fetch(`https://tas-sample-app-default-rtdb.europe-west1.firebasedatabase.app/charts/${this.orderId}.json?auth=${this.$store.getters.getToken}`)
            Promise.all([resOrder, resChart])
            .then((values) => {
                return Promise.all([values[0].json(), values[1].json()])
            }).then((values) => {
                this.order = values[0]
                this.chart = values[1]
            }).catch(error => {
                console.error(error.message)
            })
    }
}