
import HeroBaner from "../components/Home/HeroBaner.js";
import LoginBaner from "../components/Home/LoginBaner.js";
import SmallSampleCard from "../components/Home/SmallSampleCard.js";
export default {
    template: `
        <main>
        <base-section>
            <hero-baner v-if="isToken"/>
            <login-baner v-else />
        </base-section>
        <base-section>
            <div class="sample-list-wrapper">
                <div class="base-section-header">
                    <h1>ostatnie zamówienia...  </h1>
                    <p class="varietyLabel">wstaione w ciągu 30 dni</p>
                </div>
                <ul class="sample-list" v-if="isToken">
                    <li class="card"
                        v-for="(order, key) in orders"
                        :key="key">
                            <p class="varietyLabel">zamówione  {{ new Date(order.orderedAt).toLocaleString() }}</p>
                            <h2><div><span v-if="!order.confirm">&#9203;</span><span v-else>&#9989;</span>  {{ order.orderCustomer.toLocaleUpperCase()}}</div></h2>
                            <p class="varietyLabel">{{ order.userName[0].toLocaleUpperCase() + order.userName.substring(1) }}</p>
                            <p>&#128176; &#128198; {{ order.paymentTerm }}</p>
                            <p>{{ order.chartLines}} lini</p>
                            <p v-if="order.orderRemark">{{ order.orderRemark }}</p>
                            
                    </li>
                </ul>
                <div v-if="!isToken" class="card duble">
                    <p>Najnowsze zamówienia możliwe do przeglądania jedynie po zalogowaniu</p>
                </div>
            </div>
        </base-section>
        <base-section id="newSampleVarietyList">
            <div class="sample-list-wrapper">
                <div class="base-section-header">
                    <h1>najnowsze pruby...  </h1>
                    <p class="varietyLabel">przyjęte w ciągu 30 dni</p>
                </div>
                <ul class="sample-list" v-if="newSample.length > 0 && isToken">
                    <router-link
                        v-for="item in newSample" 
                        :key="item.id" :to="{name: 'details.show', params: {id: item.id}}">
                        <small-sample-card :item="item" />
                    </router-link>
                </ul>
                <div v-else-if="newSample.length == 0 && isToken" class="card duble">
                    <p>w ostatnim czasie nie zostały przyjęte żadne nowe pruby</p>
                </div>
                <div v-if="!isToken" class="card duble">
                    <p>Zaloguj się by móc oglądać najnowsze pruby</p>
                </div>
            </div>
        </base-section>
        <base-section id="sampleVarietyList">
            <div class="sample-list-wrapper">
                <div class="base-section-header">
                    <h1>przeterminowane pruby...  </h1>
                    <p class="varietyLabel">data ważności powyżej dwóch lat</p>
                </div>
                <ul class="sample-list" v-if="oldItems.length > 0 && isToken">
                    <router-link
                        v-for="item in oldItems" 
                        :key="item.id" :to="{name: 'details.show', params: {id: item.id}}">
                        <small-sample-card :item="item" />
                    </router-link>
                </ul>
                <div v-else-if="oldItems.length == 0 && isToken" class="card duble">
                    <p>Brak prub starszych niż dwa lata</p>
                </div>
                <div v-if="!isToken" class="card duble">
                    <p>Zaloguj się by móc oglądać przeterminowane pruby</p>
                </div>
            </div>
        </base-section>
        </main>
    `,
    name: 'Home',
    components: { 
        'HeroBaner': HeroBaner,
        'LoginBaner': LoginBaner,
        'SmallSampleCard': SmallSampleCard,
    },
    data(){
        return {
            orders: {}
        }
    },
    updated(){
        console.log('updated');
    },
    async created() {
        const expiresAt = localStorage.getItem('expiresAt')
        const nowTime = new Date().getTime()
        if(expiresAt && !+expiresAt < nowTime){
            console.log('Token is exp:', +expiresAt < nowTime);
            this.$store.dispatch('getUserData').then(() => {
            this.$store.dispatch('fetchSampleItems')
            this.$store.dispatch('fetchLastOrders').then(orders => this.orders = orders)
          })
        }
    },
    beforeRouteEnter (to, from, next) {
        // ...
        next()
    },
    computed: {
        items() {
            return this.$store.getters.getItems.filter(e => e.cropQuantity > 0)
        },
        newSample() {
            return this.items.filter(e => e.createdAt > new Date().getTime() - 2678400000 / 2)
        },
        oldItems() {
            return this.items.filter(e => e.packingDate + 63158400000 < new Date().getTime())
        },
        isToken() {
            return this.$store.getters.getToken
        }
    },
    methods:{
        toDateString(date){
            return new Date(date).toLocaleDateString('en-GB', {month: 'numeric', year: 'numeric'})
        },
    },
}