
export default {
    template: `
    <main>
        <base-section>
            <div class="base-section-header">
                    <h1>szczeguły odmiany...  </h1>
                    <p class="varietyLabel">wstawiona {{toDate(variety.createdAt)}} przez {{ variety.creator }}</p>
            </div>
            <div class="variety-details-wraper">
                <div class="variety-details">
                    <div class="card">
                        <p class="varietyLabel">nazwa</p>
                        <h2>{{ variety.cropName.toLocaleUpperCase() }}</h2>
                    </div>
                    <div class="variety-batch-details">
                        <div>
                            <p class="varietyLabel">batch</p>
                            <p>{{ variety.cropBatch }}</p>
                        </div>
                        <div>
                            <p class="varietyLabel">odmiana</p>
                            <p>{{ variety.cropSegment }}</p>
                        </div>
                        <div>
                            <p class="varietyLabel">pakowana</p>
                            <p>{{ toDateString(variety.packingDate) }}</p>
                        </div>
                        <div>
                            <p class="varietyLabel">pakowanych po</p>
                            <p>{{ variety.cropPacking }} nasion</p>
                        </div>
                        <div>
                            <p class="varietyLabel">ilość opakowań</p>
                            <p>{{ variety.cropQuantity }}</p>
                        </div>
                        <div>
                            <p class="varietyLabel">na stanie</p>
                            <p>{{ +variety.cropPacking * +variety.cropQuantity }} nasion</p>
                        </div>
                    </div>
                    <div class="card remarks" v-if="variety.remarks && variety.remarks.length > 0">
                        <h3>remarks</h3>
                        <ul v-for="remark in variety.remarks" :key="remark.createdAt">
                            <li>
                                <p class="varietyLabel">{{ remark.creatorOfRemark.name }}, {{ new Date(remark.createdAt).toLocaleString() }}</p>
                                <p>{{ remark.text }}</p>
                            </li>
                        </ul>
                    </div>
                    <div class="remark">
                        <textarea v-model="remarkText" placeholder="Add remark"></textarea> <br />
                        <button class="btn btn-primery" @click="addRemarkToVarietyt(id)">Add Remark</button>
                    </div>
                    <div style="padding:0 1rem" v-if="variety.updatedBy && variety.updatedAt">
                        <p class="varietyLabel">aktualizowane</p>
                        <p>{{ toDate(variety.updatedAt) }} przez {{ variety.updatedBy }}</p>
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
        toDate(date){
            return new Date(date).toLocaleString()
        },
        toDateString(date){
            return new Date(date).toLocaleDateString('en-GB', {month: 'numeric', year: 'numeric'})
        },
        addRemarkToVarietyt(id) {
            const remarks = {
                id: this.id, 
            }
            if(!this.variety.remarks){
                remarks['payload'] = [{
                            createdAt: new Date().getTime(),
                            creatorOfRemark: {
                                name: this.$store.getters.getLogedInUser.name,
                                localId: this.$store.getters.getLogedInUser.localId
                            },
                            text: this.remarkText,
                        }]
            } else {
                remarks['payload'] = [...this.variety.remarks, {
                        createdAt: new Date().getTime(),
                        creatorOfRemark: {
                            name: this.$store.getters.getLogedInUser.name,
                            localId: this.$store.getters.getLogedInUser.localId
                        },
                        text: this.remarkText,
                    }]
            }

            this.$store.dispatch('additionOfRemark', remarks)
            this.remarkText = ''
        },
    },
}