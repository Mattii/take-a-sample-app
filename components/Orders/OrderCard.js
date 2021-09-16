import BoxSvg from "../UI/BoxSvg.js";
export default {
    template: `
        <li class="card order-list-item">
            <div>
                <p class="varietyLabel">{{ order.userName[0].toLocaleUpperCase() + order.userName.substring(1) }}, zamówione  {{ new Date(order.orderedAt).toLocaleDateString() }}</p>
                <h2>{{ order.orderCustomer.toLocaleUpperCase()}}</h2>
            </div>
            <div>
                <p class="varietyLabel">status</p>
                <p v-if="!order.confirm">do realizacji</p>
                <p v-else>zrealizowane</p>
            </div>
            <div>
                <p class="varietyLabel"> termin płatnośi</p>
                <p>{{ order.paymentTerm }}</p>
            </div>
            <div>
                <p class="varietyLabel">linie zamówienia</p>
                <p>{{ order.chartLines}}</p>
            </div>
            <box-svg></box-svg>
            <div v-if="order.orderRemark">
                <p class="varietyLabel">uwagi</p>
                <p>{{ order.orderRemark }}</p>
            </div>
        </li>
    `,
    components: {
        'BoxSvg': BoxSvg
    },
    props: {
        order:{
            type: Object,
            required: true
        }
    }
}