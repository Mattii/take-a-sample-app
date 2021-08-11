const store = new Vuex.createStore({
    state() {
        return {
            items: [],
            chartItems: [],
            editedItemId: null,
            logedInUser: 'Mateusz Ś',
            tokenId: true,
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
        deleteItemFromChart(state, chartItem) {
            const chartItemIndex = state.chartItems.findIndex(e => e.id === chartItem.id)
            const itemIndex = state.items.findIndex(e => e.id === chartItem.id)
            if(chartItemIndex > -1 && itemIndex > -1){
                state.items[itemIndex].cropQuantity += chartItem.qty
                state.chartItems.splice(chartItemIndex, 1)
                localStorage.removeItem(chartItem.id)
            }
        }
    },
    actions: {
        fetchSampleItems(context) {
            fetch('https://tas-sample-app-default-rtdb.europe-west1.firebasedatabase.app/samples.json')
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
                    sampleArr.forEach(e => {
                        if(localStorage[e.id]) {
                            context.commit('addItemToChart', {
                                id: e.id,
                                qty: +localStorage.getItem(e.id)
                            })
                        }
                    })
                })
                .catch(err => console.log(err))
        },
        postSampleItem(context, item) {
            fetch('https://tas-sample-app-default-rtdb.europe-west1.firebasedatabase.app/samples.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    },
                body: JSON.stringify(item)
                }).then( res => {
                    return res.json();
                }).then(data => {
                    context.commit('addItem', {...item, id: data.name})
                }).catch(err => new Error(err))
        },
        editSampleItem(context, item) {
            context.commit('editItem', item)
        },
        deleteSampleItem(context, id) {
            fetch(`https://tas-sample-app-default-rtdb.europe-west1.firebasedatabase.app/samples/${id}.json`, {
                method: 'DELETE'
                }).then(res => {
                    context.commit('deleteItem', id)
                }).catch(err => new Error(err))
        },
        editedSampleId(context, id) {
            context.commit('setEditedId', id)
        },
        additionOfRemark(context, remark){
            context.commit('setRemark', remark)
        },
        setLogedinUser(context, user) {
            context.commit('setLogedInUser', user.email)
            context.commit('setToken', true)
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