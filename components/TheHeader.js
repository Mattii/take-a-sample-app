export default {
    template: `
        <header ref="myElement" id="header-element">
            <div class="main-nav-header">
                <router-link to="/" class="logo">
                    <img src="/img/pie-chart.svg" width="42" height="42" alt="pie-chart">
                    <h1><slot></slot></h1>
                </router-link>
                <nav class="header-nav">
                    <router-link to="/">Home</router-link>
                    <router-link :to="{name: 'samples'}">Samples</router-link>
                    <router-link v-if="!idToken" :to="{name: 'login.user'}">Login</router-link>
                    <router-link v-else :to="{name: 'user'}">User</router-link>
                </nav>
            </div>
        </header>
    `,
    data() {
        return {
            header: 'Take Sample',
        }
    },
    computed:{
        idToken(){
            return this.$store.getters.getToken
        }
    },
    methods: {
    },
    mounted() {
        //const el = document.querySelector(".myElement")
        const observer = new IntersectionObserver( 
        ([e]) => e.target.classList.toggle("is-pinned", e.intersectionRatio < 1),
        { threshold: [1] }
        );

        observer.observe(this.$refs.myElement);
    },
}