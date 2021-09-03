export default {
    template: `
        <div>
        <h1 class="card" style="margin:0 1rem; padding:2rem 1rem">Wysyłki sampli</h1>
        <base-section>
            <ul class="card-wrapper">
                <li class="card" v-for="(order, key) in orders" :key="key">
                    <h2>{{ order.orderCustomer }}</h2>
                </li>
            </ul>
        </base-section>
    </div>
    `,
    name: 'UserOrders',
    props: {
        id: {
            type: String,
            reqired: true
        }
    },
    data() {
        return {
            orders: {},
        }
    },
    computed:{
        idToken() {
            return this.$store.getters.getToken
        }
    },
    created() {
        fetch('https://tas-sample-app-default-rtdb.europe-west1.firebasedatabase.app/orders.json?orderBy="orderedBy"&equalTo="' + this.id + '"&auth=' + this.idToken, {
            method: 'GET',
            'Content-Type': 'application/json',
        })
        .then( res => res.json())
        .then(data => {
            this.orders = data
        })
        .catch(err => console.error(err))
    },
}