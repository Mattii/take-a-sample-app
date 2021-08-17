import obj from './dotenv.js'

const store = new Vuex.createStore({
    state() {
        return {
            items: [],
            chartItems: [],
            editedItemId: null,
            logedInUser: null,
            tokenId: null,
        }
    },
    mutations: {
        setItems(state, items) {
            state.items = items
        },
        addItem(state, item) {
            state.items.unshift(item)
        },
        editItem(state, item) {
            const itemIndex = state.items.findIndex(e => e.id === item.id)
            state.items[itemIndex] = item
        },
        deleteItem(state, id) {
            state.items = state.items.filter(e => e.id !== id)
        },
        setToken(state, token) {
            state.tokenId = token
        },
        setLogedInUser(state, name) {
            state.logedInUser = name
        },
        setEditedId(state, id) {
            state.editedItemId = id
        },
        setRemark(state, remark){
            const itemIndex = state.items.findIndex(e => e.id === remark.id)
            state.items[itemIndex].remarks.unshift(remark.payload)
        },
        addItemToChart(state, chartItem) {
            const chartItemIndex = state.chartItems.findIndex(e => e.id === chartItem.id)
            const itemIndex = state.items.findIndex(e => e.id === chartItem.id)
            if(chartItemIndex === -1 && itemIndex > -1){
                // chartItem.name = state.items[itemIndex].cropName
                // chartItem.packingSize = state.items[itemIndex].cropPacking
                state.items[itemIndex].cropQuantity -= +chartItem.qty
                state.chartItems.unshift(chartItem)
                localStorage.setItem(chartItem.id, chartItem.qty)
            }else if( chartItemIndex > -1 && itemIndex > -1){
                    state.chartItems[chartItemIndex].qty += +chartItem.qty
                    state.items[itemIndex].cropQuantity -= +chartItem.qty
                    localStorage.setItem(chartItem.id,  state.chartItems[chartItemIndex].qty)
            }else{
                throw new Error("some thing went wrong in adding to chart functon")
            }
        },
        initializeChart(state, chartItem){
            const chartItemIndex = state.chartItems.findIndex(e => e.id === chartItem.id)
            const itemIndex = state.items.findIndex(e => e.id === chartItem.id)
            if( chartItemIndex > -1 && itemIndex > -1){
                    state.items[itemIndex].cropQuantity -= +chartItem.qty
            }else{
                throw new Error("some thing went wrong in initialize to chart functon")
            }
        },
        deleteItemFromChart(state, chartItem) {
            const chartItemIndex = state.chartItems.findIndex(e => e.id === chartItem.id)
            const itemIndex = state.items.findIndex(e => e.id === chartItem.id)
            if(chartItemIndex > -1 && itemIndex > -1){
                state.items[itemIndex].cropQuantity += +chartItem.qty
                state.chartItems.splice(chartItemIndex, 1)
                localStorage.removeItem(chartItem.id)
            }
        }
    },
    actions: {
        fetchSampleItems(context) {
            fetch('https://tas-sample-app-default-rtdb.europe-west1.firebasedatabase.app/samples.json?auth=' + context.getters.getToken)
                .then(res => res.json())
                .then(items => {
                    let arr = [];
                    for(let key in items){
                        arr.unshift({...items[key], id: key })
                    }
                    console.log('[Success]: fetch data from data base');
                    context.commit('setItems', arr)
                    return arr
                }).then(sampleArr => {
                    const lengthOfChart = context.getters.getChartItems.length
                        sampleArr.forEach(e => {
                            if(lengthOfChart === 0){
                                if(localStorage[e.id]) {
                                    context.commit('addItemToChart', {
                                        id: e.id,
                                        qty: +localStorage.getItem(e.id)
                                    })
                                }
                            }else if(lengthOfChart > 0){
                                if(localStorage[e.id]) {
                                    context.commit('initializeChart', {
                                        id: e.id,
                                        qty: +localStorage.getItem(e.id)
                                    })
                                }
                            }
                        })

                })
                .catch(err => console.log(err))
        },
        postSampleItem(context, item) {
            fetch('https://tas-sample-app-default-rtdb.europe-west1.firebasedatabase.app/samples.json?auth=' + context.getters.getToken, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    },
                body: JSON.stringify(item)
                }).then( res => {
                    return res.json();
                }).then(data => {
                    context.commit('addItem', {...item, id: data.name})
                    console.log('[Success]: fetch data to data base');
                }).catch(err => new Error(err))
        },
        editSampleItem(context, item) {
            fetch(`https://tas-sample-app-default-rtdb.europe-west1.firebasedatabase.app/samples/${item.id}.json?auth=${context.getters.getToken}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
                })
                .then(res => res.json())
                .then(data => {
                    context.commit('editItem', data)
                    console.log('[Success]: updated data to data base');
                })
                .catch(err => console.error(err))
        },
        deleteSampleItem(context, id) {
            const item = context.getters.getItems.find(e => e.id === id) 
            const result = confirm('Are You shure to delete '+ item.cropName)
            if(result){
                fetch(`https://tas-sample-app-default-rtdb.europe-west1.firebasedatabase.app/samples/${id}.json?auth=${context.getters.getToken}`, {
                    method: 'DELETE'
                    }).then(res => {
                        context.commit('deleteItem', id)
                        console.log('[Success]: deleted data from data base');
                    }).catch(err => new Error(err))
            } else {
                alert('Operation was canceld!')
            }
        },
        editedSampleId(context, id) {
            context.commit('setEditedId', id)
        },
        additionOfRemark(context, remark){
            context.commit('setRemark', remark)
        },
        loginUser(context, { email, password }) {
            return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${obj.API_KEY}`, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password,
                    returnSecureToken: true
                }),
            })
            .then(res => res.json())
            .then(data => {
                const expiresAt = new Date().getTime() + +data.expiresIn * 100
                context.commit('setLogedInUser', data)
                context.commit('setToken', data.idToken)
                localStorage.setItem('idToken', data.idToken)
                localStorage.setItem('expiresAt', expiresAt)
                window.expTimer = setTimeout(() => {
                    context.dispatch('logoutUser')
                }, +data.expiresIn * 100)
            })
            .catch(err => console.error(err))
        },
        logoutUser(context){
            context.commit('setLogedInUser', null)
            context.commit('setToken', null) 
            localStorage.removeItem('idToken')
            localStorage.removeItem('expiresAt')
            if(window.expTimer) clearTimeout(window.expTimer)
        },
        getUserData(context){
            const idToken = localStorage.getItem('idToken')
            if(idToken){
            return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${obj.API_KEY}`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idToken: idToken
                })
            })
            .then(res => res.json())
            .then(data => {
                const user = {...data.users[0], idToken}
                console.log(user);
                    const timeToExpires = +localStorage.getItem('expiresAt') - new Date().getTime()
                    context.commit('setLogedInUser', user)
                    context.commit('setToken', user.idToken)
                    console.log(timeToExpires);
                    window.expTimer = setTimeout(() => {
                        context.dispatch('logoutUser')
                    }, timeToExpires)
            })
            .catch(err => console.error(err))
            }
        },
        addItemToChart(context, chartItem) {
            context.commit('addItemToChart', chartItem)
        },
        deleteItemFromChart(context, chartItem) {
            context.commit( 'deleteItemFromChart', chartItem)
        },
        makeOrder(context, order){
            context.dispatch('makeEmail', order)
        },
        makeEmail(context, order) {
            console.log(order);
            window.location.href = 
            `mailto:zamowienia@enzazaden.pl?subject=Sample order&body=name:%0D%0A${order.orderedBy} `
        }
    },
    getters: {
        getItems(state) {
            return state.items
        },
        getLogedInUser(state) {
            return state.logedInUser
        },
        editedItemId(state) {
            return state.editedItemId
        },
        getToken(state) {
            return state.tokenId
        },
        getChartItems(state) {
            return state.chartItems
        }
    }
})

export default store