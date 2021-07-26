export default {
    template: `
    <main>
        <base-section>
            <button class="btn"  @click="this.$router.back()">Go Back</button>
	    <div class="login">
            <h1>Hello please login</h1>
            <form @submit.prevent="loginUser">
                <div>
                    <label for="userEmail">User E-mail</label>
                    <input id="userEmail" v-model="userEmail" type="email" placeholder="Enter your e-mail"/>
                </div>
                <div>
                    <label for="userPassword">User Password</label>
                    <input id="userPassword" v-model="userPassword" type="password" placeholder="Enter your password"/>
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
            console.log({email: this.userEmail, password: this.userPassword});
            this.$store.dispatch('setLogedinUser', this.userEmail)
        }
    },
}