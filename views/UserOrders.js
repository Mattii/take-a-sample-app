export default {
    template: `
        <base-section>
            <h1 v-for="(order, key) in orders" :key="key">{{ order.orderCustomer }}</h1>
        </base-section>
    `,
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