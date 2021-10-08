import SmallSampleCard from "../components/Home/SmallSampleCard.js"
import BoxSvg from "../components/UI/BoxSvg.js"
import EditSvg from "../components/UI/EditSvg.js"
import LogoutSvg from "../components/UI/LogoutSvg.js"
import VegetableSvgIcons from "../components/UI/VegetableSvgIcons.js"
import PasswordSvg from "../components/UI/PasswordSvg.js"
export default {
    template: `
    <main>
        <base-section class="user-details">
            <img v-if="!!userData" class="user-img" :src="'img/' + userData.imageUrl" :alt="userData.name"/>
            <div class="introduction" v-if="!!userData">
                <p class="varietyLabel">{{ userData.position }}</p>
                <p>{{ userData.name }}</p>
            </div>
            <div class="introduction-details card">
                <base-button @click="logoutUser">
                    <p>Wyloguj</p>
                    <logout-svg></logout-svg>
                </base-button>
                <router-link :to="{name: 'user.password'}">
                    <p>Zmień hasło</p>
                    <password-svg></password-svg>
                </router-link>
                <div class="my-crops" v-if="!!userData">
                    <p>Moje odmiany:</p>
                    <ul>
                        <li
                        v-for="(crop, index) in userData.crops"
                        :key="index"
                        ><vegetable-svg-icons :cropType="crop"></vegetable-svg-icons> <p>{{ toCropName(crop) }}</p> </li>
                    </ul>
                </div>
                <p v-if="!!userData">Rgion: {{ userData.region }}</p>
                <router-link v-if="!!userData && userData.privileges == 'admin'" :to="{ name: 'user.samples' }">
                    <p>Dodaj sample</p>
                    <edit-svg></edit-svg>
                </router-link> 
                <router-link v-if="!!userData && !!userData.orders" :to="{name: 'user.orders'}">
                    <p>Moje zamówienia</p>
                    <span style="display: flex;align-items: center;gap:.5rem">
                        <p>{{ userData.orders.length }}</p>
                        <box-svg></box-svg>
                    </span>
                </router-link>
            </div>
            <div class="user-actions">    
            </div>
	    </base-section>
        <base-section class="user-samples" v-if="!!userSamples">
            <div class="sample-list-wrapper">

                <div class="base-section-header">
                    <h1>moje sample...  </h1>
                    <p class="varietyLabel">opiekujesz się {{ userSamples.length }} prubami</p>
                </div>
                <ul class="sample-list">
                    <router-link
                            v-for="item in userSamples" 
                            :key="item.id" :to="{name: 'details.show', params: {id: item.id}}">
                            <small-sample-card :item="item" />
                    </router-link>
                </ul>
            </div>
        </base-section>
    </main>
    `,
    components: {
        SmallSampleCard,
        BoxSvg,
        EditSvg,
        LogoutSvg,
        VegetableSvgIcons,
        PasswordSvg
    },
    watch: {
        // żeby wylogowywało po uruchominiu timera trzeba zamontować watcher na karzdym views
        userData(newValue, oldValue){
            if(newValue === null){
                this.$router.push('/')
            }
        }
    },
    name: 'User',
    computed: {
        userData() {
            return this.$store.getters.getLogedInUser
        },
        userSamples() {
            return this.$store.getters.getItems.filter(e => e.cropSegment == 'pomidor') || []
        }
    },
    created() {
        
    },
    methods: {
        logoutUser(){
            this.$router.push('/')
            this.$store.dispatch('logoutUser')
        },
        toCropName(crop){
            let cropName = ""
            switch (crop) {
                case 'cc':
                    cropName = "ogórek"
                    break;
                case 'to':
                    cropName = "pomidor"
                    break;
                case 'all':
                    cropName = "wszystkie"
                    break;
                default:
                    console.error("brak takiej odmiany :[");
                    break;
            }
            return cropName
        }
    },
}