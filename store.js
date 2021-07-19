const store = new Vuex.createStore({
    state() {
        return {
            items: [
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
                    id: 1625732986900,
                    packingDate: "2020-07-08",
                    remarks: [],
                }
            ],
        }
    },
    mutations: {

    },
    getters: {
        getItems(state) {
            return state.items
        }
    }
})

export default store