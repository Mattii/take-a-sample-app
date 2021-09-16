import OrderCard from "../components/Orders/OrderCard.js"

export default {
    template: `
        <div>
        <base-section>
        <div class="base-section-header">
                    <h1>wszystkie zamówienia...</h1>
                    <p class="varietyLabel">w sumie {{ orders.length }} zamówień </p>
                </div>
            <ul class="sample-list">
                        <router-link
                            v-for="order in orders"
                            :key="order.id"
                            :to="{name: 'order.show', params:{id: order.id}}"
                            >
                            <order-card :order="order"></order-card>
                        </router-link>
            </ul>
        </base-section>
    </div>
    `,
    name: 'UserOrders',
    components:{
        'OrderCard': OrderCard
    },
    data() {
        return {
            orders: {},
        }
    },
    computed:{
        idToken() {
            return this.$store.getters.getToken
        },
        userId() {
            return this.$store.getters.getLogedInUser.localId}
    },
    created() {
        fetch('https://tas-sample-app-default-rtdb.europe-west1.firebasedatabase.app/orders.json?orderBy="orderedBy"&equalTo="' + this.userId + '"&auth=' + this.idToken)
        .then( res => res.json())
        .then(orders => {
            const arr = []
            for(let key in orders){
                arr.unshift({
                    ...orders[key],
                    id: key
                })
            }
            this.orders = arr
        })
        .catch(err => console.error(err))
    },
}