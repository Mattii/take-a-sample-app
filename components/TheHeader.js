export default {
    template: `
        <header>
	        <img src="/img/pie-chart.svg" alt="pie-chart">
            <h1><slot></slot></h1>
            <nav>
		        <base-button @click="showAddForm" class="btn">Add</base-button>
	        </nav>
        </header>
    `,
    data() {
        return {
            header: 'Take Sample',
        }
    },
    methods: {
        showAddForm() {
            this.$emit('showAddForm')
        }
    }
}