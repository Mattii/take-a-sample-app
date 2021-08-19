export default {
    components: {
    },
    template: `
        <div class="tab" id="orderCustomerTab">
            <form @submit.prevent="sendOrderToCustomerService">
                <div>
                    <label for="order-customer">Customer</label>
                    <input 
                        v-model="orderCustomer" 
                        type="text" 
                        id="order-customer"
                        placeholder="Enter a customer"/>
                </div>
                <div>
                    <label for="payment-term">Payment terms</label>
                    <input 
                        v-model="paymentTerm"
                        type="text" 
                        list="payment-terms" 
                        id="payment-term"
                        placeholder="Enter terms"/>
                    <datalist id="payment-terms">
                        <option v-for="(item, index) in paymentTerms" :key="index" :value="item"/>
                    </datalist>
                </div>
                <div class="order-remarks-wrapper">
                    <label for="order-remarks">Remarks</label>
                    <textarea 
                        v-model="orderRemark" 
                        type="text" 
                        id="payments-terms"
                        placeholder="Enter additional remark">
                    </textarea>
                </div>
                <base-button :disabled="isFilled === false" type="submit" class="btn btn-to-action">Send Order</base-button>
            </form>
        </div>
    `,
    name:'OrderCustomerTab',
    props: {
        chartItems: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            orderCustomer: '',
            paymentTerm: '',
            orderRemark: '',
            paymentTerms: [
                'standardowe',
                '7 dni',
                '70-tka',
                '14 dni',
                '30 dni',
                '90 dni',
            ]
        }
    },
    computed:{
        isFilled(){
            return this.orderCustomer !== '' && this.paymentTerm !== ''
        }
    },
    methods: {
        sendOrderToCustomerService(){
            if(this.isFilled){
                const chart = {}
                const items = this.$store.getters.getItems
                let numOfLines = 0
                this.chartItems.forEach(element => {
                    const item = items.find(e => element.id === e.id)
                    if(item){
                        numOfLines++
                        chart[item.id] = {
                            ...item,
                            chartQty: element.qty
                        }
                    }
                });
                const details = {
                    paymentTerm: this.paymentTerm,
                    orderCustomer: this.orderCustomer.toUpperCase(),
                    orderRemark: this.orderRemark,
                    orderedBy: this.$store.getters.getLogedInUser.localId,
                    userEmail: this.$store.getters.getLogedInUser.email,
                    orderedAt: new Date().toLocaleString(),
                    chartLines: numOfLines
                }
                this.paymentTerm = ''
                this.orderRemark = ''
                this.orderCustomer = ''
                this.$store.dispatch('makeOrder', {details, chart})
            }
        }
    },
}