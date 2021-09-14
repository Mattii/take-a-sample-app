
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
                    <p>wstaione w ciągu 30 dni</p>
                </div>
                <ul class="sample-list" v-if="isToken">
                    <li 
                        v-for="(order, key) in orders"
                        :key="key">{{ order }}</li>
                </ul>
                <div v-if="!isToken" class="card">
                    <p>Najnowsze zamówienia możliwe do przeglądzeni jedynie po zalogowaniu</p>
                </div>
            </div>
        </base-section>
        <base-section id="newSampleVarietyList">
            <div class="sample-list-wrapper">
                <div class="base-section-header">
                    <h1>najnowsze pruby...  </h1>
                    <p>przyjęte w ciągu 30 dni</p>
                </div>
                <ul class="sample-list" v-if="newSample.length > 0 && isToken">
                    <router-link
                        v-for="item in newSample" 
                        :key="item.id" :to="{name: 'details.show', params: {id: item.id}}">
                        <small-sample-card :item="item" />
                    </router-link>
                </ul>
                <div v-else-if="newSample.length == 0 && isToken" class="card">
                    <p>w ostatnim czasie nie zostały prztyjęte żadne nowe pruby</p>
                </div>
                <div v-if="!isToken" class="card">
                    <p>Zaloguj się by móc oblądać najnowsze pruby</p>
                </div>
            </div>
        </base-section>
        <base-section id="sampleVarietyList">
            <div class="sample-list-wrapper">
                <div class="base-section-header">
                    <h1>przeterminowane pruby...  </h1>
                    <p>data ważności powyżej dwóch lat</p>
                </div>
                <ul class="sample-list" v-if="oldItems.length > 0 && isToken">
                    <router-link
                        v-for="item in oldItems" 
                        :key="item.id" :to="{name: 'details.show', params: {id: item.id}}">
                        <small-sample-card :item="item" />
                    </router-link>
                </ul>
                <div v-else-if="oldItems.length == 0 && isToken" class="card">
                    <p>Brak prub starszych niż dwa lata</p>
                </div>
                <div v-if="!isToken" class="card">
                    <p>Zaloguj się by móc oblądać przeterminowane pruby</p>
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
    created() {
        if(this.$store.getters.getToken){
            this.$store.dispatch('fetchSampleItems')
            fetch('https://tas-sample-app-default-rtdb.europe-west1.firebasedatabase.app/orders.json?auth=' + this.$store.getters.getToken)
            .then(res => res.json())
            .then(orders => {this.orders = orders})
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
    },
}