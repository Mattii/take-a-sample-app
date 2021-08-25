import store from "./store.js";
import router from "./router.js";
// components
import BaseButton from "./components/UI/BaseButton.js";
import BaseSection from "./components/UI/BaseSection.js";
import TheHeader from "./components/TheHeader.js";
import TheMobileNav from "./components/TheMobileNav.js";

const shoppingListApp = Vue.createApp({
    watch: {
        // żeby wylogowywało po uruchominiu timera trzeba zamontować watcher na karzdym views
        idToken(newValue, oldValue){
            if(newValue === null){
                this.$router.push('/')
            }
        }
    },
    created() {
            const expiresAt = localStorage.getItem('expiresAt')
            const nowTime = new Date().getTime()
            if(expiresAt && !+expiresAt < nowTime){
                console.log('Token is exp:', +expiresAt < nowTime);
                this.$store.dispatch('getUserData').then(() => {
                this.$store.dispatch('fetchSampleItems')
              })
            }
    },
})
.component('TheHeader', TheHeader)
.component('TheMobileNav', TheMobileNav)
.component('BaseButton', BaseButton)
.component('BaseSection', BaseSection);
shoppingListApp.use(store);
shoppingListApp.use(router);
shoppingListApp.mount('#shopping-list');
