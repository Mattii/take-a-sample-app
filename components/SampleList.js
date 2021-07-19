
import SampleListItem from "./SampleListItem.js";

export default {
    template: `
    <div class="sample-list-wrapper">
        <h2><slot></slot> ({{ items.length }})</h2>
        <ul class="sample-list">
            <sample-list-item 
                v-for="item in items" 
                :key="item.id" 
                :item="item"
                @deleteVariety="deleteVariety"
                @editVariety="editVariety"
                @addRemarkToVarietyt="addRemarkToVarietyt"
            ></sample-list-item>
        </ul>
    </div>
    `,
    name: 'SampleList',
    components: { 'SampleListItem': SampleListItem },
    props: {
        items: {
            type: Array,
            required: true,
        }
    },
    methods: {
        deleteVariety(id) {
            this.$emit('deleteVariety', id)
        },
        editVariety(id) {
            this.$emit( 'editVariety', id)
        },
        addRemarkToVarietyt(id, remarkText) {
            this.$emit('addRemarkToVarietyt', id, remarkText)
        },
    },
}