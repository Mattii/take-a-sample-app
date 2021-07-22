export default {
    template: `
        <header>
            <router-link to="/" class="logo">
                <img src="/img/pie-chart.svg" alt="pie-chart">
                <h1><slot></slot></h1>
            </router-link>
            <nav class="header-nav">
                <router-link to="/">Home</router-link>
                <router-link to="/addsample">Add Sample</router-link>
            </nav>
        </header>
    `,
    data() {
        return {
            header: 'Take Sample',
        }
    },
    methods: {
    }
}