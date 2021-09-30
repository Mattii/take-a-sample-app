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
    async created() {
        const expiresAt = localStorage.getItem('expiresAt')
        const nowTime = new Date().getTime()
        console.log('[create App] Token is exp:', +expiresAt < nowTime, 'data can be fetched', expiresAt && !(+expiresAt < nowTime))
        if(expiresAt && !(+expiresAt < nowTime)){
            this.$store.commit('setToken', localStorage.getItem('idToken'))
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
