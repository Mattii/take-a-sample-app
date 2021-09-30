import obj from '/dotenv.js'

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
        setLogedInUser(state, user) {
            state.logedInUser = { ...state.logedInUser, ...user}
        },
        clearLogedInUser(state){
            state.logedInUser = null
        },
        setEditedId(state, id) {
            state.editedItemId = id
        },
        setRemark(state, remarks){
            const itemIndex = state.items.findIndex(e => e.id === remarks.id)
            state.items[itemIndex].remarks = remarks.payload
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
        },
        addOrderToUser(state, id){
            if(state.logedInUser.orders){
                state.logedInUser.orders.push(id)
            }else{
                state.logedInUser['orders'] = [id]
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
            fetch(`https://tas-sample-app-default-rtdb.europe-west1.firebasedatabase.app/samples/${remark.id}.json?auth=${context.getters.getToken}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({remarks: remark.payload})
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                })
                .catch(err => console.error(err))
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
                const expiresAt = new Date().getTime() + +data.expiresIn * 1000
                context.commit('setLogedInUser', data)
                context.commit('setToken', data.idToken)
                localStorage.setItem('idToken', data.idToken)
                localStorage.setItem('expiresAt', expiresAt)
                window.expTimer = setTimeout(() => {
                    context.dispatch('logoutUser')
                }, +data.expiresIn * 1000)
                return data
            }).then(res => {
                return context.dispatch('dbUserData', res)
            })
            .catch(err => console.error(err))
        },
        logoutUser(context){
            console.log('log out timeout timer ')
            context.commit('clearLogedInUser')
            context.commit('setToken', null)
            context.commit('setItems', [])
            localStorage.removeItem('idToken')
            localStorage.removeItem('expiresAt')
            if(window.expTimer) clearTimeout(window.expTimer)
        },
        dbUserData(context, data){
            return fetch(`https://tas-sample-app-default-rtdb.europe-west1.firebasedatabase.app/users/${data.localId}.json?auth=${context.getters.getToken}`)
            .then(res => res.json()).then(data => {
                context.commit('setLogedInUser', data)
            })
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
                    const timeToExpires = +localStorage.getItem('expiresAt') - new Date().getTime()
                    context.commit('setLogedInUser', user)
                    context.commit('setToken', user.idToken)
                    if(!window.expTimer){
                        window.expTimer = setTimeout(() => {
                            console.log('log out timeout timer ');
                            context.dispatch('logoutUser')
                        }, timeToExpires)
                    }
                    return data.users[0]
            })
            .then(res => {
                return context.dispatch('dbUserData', res)
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
            fetch('https://tas-sample-app-default-rtdb.europe-west1.firebasedatabase.app/orders.json?auth=' + context.getters.getToken, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order.details)
            })
            .then(res => res.json())
            .then(data => {
                const obj = {}
                context.commit('addOrderToUser', data.name)
                obj[data.name] = order.chart
                const getLogedInUser = context.getters.getLogedInUser
                    fetch(`https://tas-sample-app-default-rtdb.europe-west1.firebasedatabase.app/users/${getLogedInUser.localId}/.json?auth=${context.getters.getToken}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({orders: getLogedInUser.orders})
                    })
                return fetch('https://tas-sample-app-default-rtdb.europe-west1.firebasedatabase.app/charts.json?auth=' + context.getters.getToken, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(obj)
                })
            })
            .then(res => res.json())
            .then(data => {
                context.dispatch('makeEmail', order)
            }).catch(err => console.error(err))
        },
        makeEmail(context, order) {
            window.location.href = 
            `mailto:zamowienia@enzazaden.pl?subject=Sample order&body=name:%0D%0A${order.orderedBy} `
        },
        fetchLastOrders(context){
            const monthTime = new Date().getTime() - 2592000000
            return fetch(`https://tas-sample-app-default-rtdb.europe-west1.firebasedatabase.app/orders.json?orderBy="orderedAt"&startAt=${monthTime}&auth=${context.getters.getToken}`)
            .then(res => res.json())
            .then(orders => {
                const arr = []
                for(let key in orders){
                    arr.unshift({
                        ...orders[key],
                        id: key
                    })
                }
                console.log('[Success]: fetch last orders');
                return arr
            }).catch(err => {
                console.log(err);
            })
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