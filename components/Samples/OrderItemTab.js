
import OrderSampleCard from "./OrderSampleCard.js";
export default {
    components: {
        'OrderSampleCard': OrderSampleCard,
    },
    template: `
        <div  class="tab">
            <ul class="order-sample-list" v-if="chartItems.length > 0">
                <order-sample-card class="samples-order-list-item" v-for="chartItem in chartItems" :key="chartItem.id" :chartItem="chartItem"></order-sample-card>
            </ul>
            <p v-else>There's no samples in order &#128533<br /> 
            <strong>Change that</strong> &#128522</p>
        </div>
    `,
    name:"OrderItemTab",
    props: {
        chartItems: {
            type: Object,
            required: true,
        }
    }
}