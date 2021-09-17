export default {
    template: `
        <li class="chart-card">
            <div>
                <p class="varietyLabel">{{ item.cropSegment }}</p>
                <h2>{{ item.cropName.toLocaleUpperCase() }}</h2>
                <p>{{ +item.cropPacking * chartItem.qty }} seeds</p>
                <base-button @click="deleteItemFromChart">
                    <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <g data-name="Layer 2">
                            <g data-name="close">
                                <rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/>
                                <path style="fill: var(--on-surface);" d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"/>
                            </g>
                        </g>
                    </svg>
                </base-button>
            </div>
            <img :src="'./img/vegetables/'+ item.cropSegment + '.png'" />
        </li>
    `,
    props: {
        chartItem: {
            type: Object,
            required: true,
        }
    },
    computed: {
        item() {
            return this.$store.getters.getItems.find(e => e.id === this.chartItem.id)
        }
    },
    methods: {
        deleteItemFromChart(){
            this.$store.dispatch('deleteItemFromChart', {
                id: this.item.id,
                qty: this.chartItem.qty,
            })
        }
    },
}