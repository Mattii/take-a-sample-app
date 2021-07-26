const items = [
    {
        createdAt: "7/8/2021, 10:29:46 AM",
        creator: "Mateusz Ś",
        cropBatch: "555555",
        cropName: "adanto",
        cropPacking: "100",
        cropQuantity: "4",
        cropSegment: "sałata",
        id: 1625732986787,
        packingDate: "2019-07-08",
        remarks: [],
    },
    {
        createdAt: "7/15/2021, 10:29:46 AM",
        creator: "Mateusz Ś",
        cropBatch: "555555",
        cropName: "fairly",
        cropPacking: "100",
        cropQuantity: "4",
        cropSegment: "sałata",
        id: 1625732986790,
        packingDate: "2021-07-15",
        remarks: [],
    },
    {
        createdAt: "7/15/2021, 10:29:46 AM",
        creator: "Mateusz Ś",
        cropBatch: "555555",
        cropName: "dabi",
        cropPacking: "500",
        cropQuantity: "7",
        cropSegment: "sałata",
        id: 1625732986900,
        packingDate: "2020-07-15",
        remarks: [],
    },
    {
        createdAt: "7/6/2021, 10:29:46 AM",
        creator: "Mateusz Ś",
        cropBatch: "555555",
        cropName: "dabi",
        cropPacking: "500",
        cropQuantity: "7",
        cropSegment: "sałata",
        id: 1625732988900,
        packingDate: "2020-07-08",
        remarks: [],
    }
]
const store = new Vuex.createStore({
    state() {
        return {
            items: [],
            editedItemId: null,
            logedInUser: 'Mateusz Ś',
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
        setLogedInUser(state, name) {
            state.logedInUser = name
        },
        setEditedId(state, id) {
            state.editedItemId = id
        },
        setRemark(state, remark){
            const itemIndex = state.items.findIndex(e => e.id === remark.id)
            state.items[itemIndex].remarks.unshift(remark.payload)
        }
    },
    actions: {
        fetchSampleItems(context) {
            setTimeout(() => {
                context.commit('setItems', items)
            }, 1000)
        },
        postSampleItem(context, item) {
            context.commit('addItem', item)
        },
        editSampleItem(context, item) {
            context.commit('editItem', item)
        },
        deleteSampleItem(context, id) {
            context.commit('deleteItem', id)
        },
        editedSampleId(context, id) {
            context.commit('setEditedId', id)
        },
        additionOfRemark(context, remark){
            context.commit('setRemark', remark)
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
        }
    }
})

export default store