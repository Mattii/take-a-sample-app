
export default {
    template: `
    <main>
        <base-section>
            <div class="variety-details-wraper">
            <button class="btn"  @click="this.$router.back()">Go Back</button>
                <div class="variety-details">
                    <h1>Variety deatails</h1>
                    <div>
                        <p>{{ variety.cropSegment }}</p>
                        <h2>{{ variety.cropName.toLocaleUpperCase() }}</h2>
                        <p>{{ variety.cropBatch }}</p>
                    </div>
                    <p>Packing date: {{ variety.packingDate }}</p>
                    <p>Quantity: {{ variety.cropQuantity }}</p>
                    <p>Packing: {{ variety.cropPacking }}</p>
                    <div v-if="variety.remarks && variety.remarks.length > 0">
                        <h3>Remarks</h3>
                        <ul v-for="remark in variety.remarks" :key="remark.createdAt">
                            <li>{{ remark.text }}</li>
                        </ul>
                    </div>
                    <p v-if="variety.updatedBy && variety.updatedAt">Updated by {{ variety.updatedBy }} at {{ variety.updatedAt }}</p>
                    <p>Created by {{ variety.creator }} at {{variety.createdAt}}</p>
                    <div class="remark">
                        <textarea v-model="remarkText" placeholder="Add remark"></textarea> <br />
                        <button class="btn btn-primery" @click="addRemarkToVarietyt(id)">Add Remark</button>
                    </div>
                </div>
            </div>
        </base-section>
    </main>
    `,
    name: 'SampleDetails',
    props: {
        id: {
            type: String,
            required: true,
        }
    },
    data() {
        return {
            remarkText: '',
        }
    },
    computed: {
        variety() {
            return this.$store.getters.getItems.find(e => e.id === this.id)
        }
    },
    methods: {
        addRemarkToVarietyt(id) {
            const remark = {
                id: this.id, 
                payload:{
                    createdRemarkAt: new Date().toLocaleString(),
                    creatorOfRemark: this.$store.getters.getLogedInUser,
                    text: this.remarkText,
                }
            }
            this.$store.dispatch('additionOfRemark', remark)
            this.remarkText = ''
        },
    },
}