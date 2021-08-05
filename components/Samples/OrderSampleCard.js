export default {
    template: `
        <li>
            <p class="varietyLabel">{{ item.cropSegment }}</p>
            <p>{{ item.cropName.toLocaleUpperCase() }}</p>
            <p>{{ +item.cropPacking * chartItem.qty }} seeds</p>
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
    }
}