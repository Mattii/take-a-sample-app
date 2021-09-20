
import SampleListItem from "./SampleListItem.js";

export default {
    template: `
    <div class="sample-list-wrapper">
        <div class="base-section-header">
            <h1>dostępne próby...  </h1>
            <p class="varietyLabel"> ({{ items.length }}) batchy </p>
        </div>
        <ul class="sample-list">
            <sample-list-item 
                v-for="item in items" 
                :key="item.id" 
                :item="item"
                @show-form="showForm"
                :info="info"
            ></sample-list-item>
        </ul>
    </div>
    `,
    name: 'SampleList',
    components: { 'SampleListItem': SampleListItem },
    props: {
        info: {
            type: String
        },
        items: {
            type: Array,
            required: true,
        }
    },
    methods: {
        showForm(state) {
            this.$emit( 'showForm', state)
        }
    },
}