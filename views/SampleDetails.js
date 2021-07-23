
export default {
    template: `
    <main>
        <base-section>
            <div>
                <h1>Variety deatails</h1>
                <div>
                    <p>{{ variety.cropSegment }}</p>
                    <h2>{{ variety.cropName }}</h2>
                    <p>{{ variety.cropBatch }}</p>
                </div>
                <p>Packing date: {{ variety.packingDate }}</p>
                <p>Quantity: {{ variety.cropQuantity }}</p>
                <p>Packing: {{ variety.cropPacking }}</p>
                <ul v-if="variety.remarks.length > 0" v-for="remark in variety.remarks" :key="remark.createdAt">
                    <li>{{ remark }}</li>
                </ul>
                <p v-if="variety.updatedBy && variety.updatedAt">Updated by {{ variety.updatedBy }} at {{ variety.updatedAt }}</p>
                <p>Created by {{ variety.creator }} at {{variety.createdAt}}</p>
            </div>
        </base-section>
    </main>
    `,
    data() {
        return {
            variety: {
                createdAt: "7/15/2021, 10:29:46 AM",
                creator: "Mateusz Ś",
                cropBatch: "555555",
                cropName: "dabi",
                cropPacking: "500",
                cropQuantity: "7",
                cropSegment: "sałata",
                id: 1625732986900,
                packingDate: "2020-07-15",
                remarks: [],
            }
        }
    }
}