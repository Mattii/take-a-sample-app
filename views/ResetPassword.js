export default {
    template: `
    <main>
        <base-section>
	    <div class="login">
            <h1>Zmień swoje hasło</h1>
            <form @submit.prevent="resetPassword">
                <div>
                    <label for="userPassword">New password</label>
                        <input id="userPassword" v-model.trim="newPassword" type="password" placeholder="Enter your new password" required/>
                </div>
                <div>
                    <label for="confirmPassword">Confirm password</label>
                        <input id="confirmPassword" v-model.trim="confirmPassword" type="password" placeholder="Confirm your password" required/>
                    </div>
                <div>
                    <base-button class="btn btn-to-action" :disabled="!theSame">Zmień hasło</base-button>
                    <base-button class="btn btn-cancel" type="reset">Cancel</base-button>
                </div>	
            </form>
        </div>
	    </base-section>
    </main>
    `,
    name:'ResetPassword',
    data() {
        return {
            userEmail: '',
            newPassword: '',
            confirmPassword: '',
        }
    },
    computed:{
        theSame(){
            return this.newPassword === this.confirmPassword && this.newPassword !== '' && this.confirmPassword !== ''
        }
    },
    methods: {
        resetPassword(){
            this.$store.dispatch('resetPassword', this.newPassword).then(data => {
                console.log(data);
                this.$router.push({name: 'user'})
            })
        },
    },
}