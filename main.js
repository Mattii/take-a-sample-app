import store from "./store.js";
import router from "./router.js";
// components
import BaseButton from "./components/UI/BaseButton.js";
import BaseSection from "./components/UI/BaseSection.js";
import TheHeader from "./components/TheHeader.js";


const shoppingListApp = Vue.createApp({
    created() {
        this.$store.dispatch('fetchSampleItems')
    }
})
.component('TheHeader', TheHeader)
.component('BaseButton', BaseButton)
.component('BaseSection', BaseSection);
shoppingListApp.use(store);
shoppingListApp.use(router);
shoppingListApp.mount('#shopping-list');