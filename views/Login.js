export default {
    template: `
    <main>
        <base-section>
	    <div class="login">
            <h1>Hello &#x1F44B;<br /> please login</h1>
            <form @submit.prevent="loginUser">
                <div>
                    <label for="userEmail">User E-mail</label>
                    <input id="userEmail" v-model="userEmail" type="email" placeholder="Enter your e-mail" required/>
                </div>
                <div>
                    <label for="userPassword">User Password</label>
                    <input id="userPassword" v-model="userPassword" type="password" placeholder="Enter your password" required/>
                    </div>
                <div>
                    <base-button class="btn btn-to-action">Login</base-button>
                    <base-button class="btn btn-cancel" type="reset">Cancel</base-button>
                </div>	
            </form>
        </div>
	    </base-section>
    </main>
    `,
    data() {
        return {
            userEmail: '',
            userPassword: '',
        }
    },
    methods: {
        loginUser() {
            this.$store.dispatch('loginUser', { email: this.userEmail, password: this.userPassword })
            .then(res => this.$router.push('/'))
        }
    },
}