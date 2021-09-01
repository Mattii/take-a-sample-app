export default {
  template: `
    <li  class="sample-list-item">
        <div>
            <p class="variety-segment varietyLabel">{{ item.cropSegment }}</p>
            <h3 class="variety-name">{{ item.cropName.toLocaleUpperCase() }}</h3>
        </div>
        <div>
            <p class="varietyLabel">rozmiar pakowania</p> 
            <p class="variety-packing">{{ item.cropPacking }}</p>
        </div>
        <div>
            <p class="varietyLabel">ilość opakowań</p>
            <p class="variety-quantity">{{ item.cropQuantity }}</p>
        </div>
        <div>
            <p class="varietyLabel">ilość nasion</p>
            <p class="variety-stoc=quantity">{{ +item.cropPacking * +item.cropQuantity }}</p>
        </div>
        <div>
            <p class="varietyLabel">data pakowania</p>
            <p class="variety-packing-date" :class="{'expired-date': expired(item.packingDate)}">{{ toDateString(item.packingDate) }}</p>
        </div>
        <p class="remark-counter" v-if="item.remarks && item.remarks.length > 0">
        there is {{ item.remarks.length }} remark
        </p>
        <div class="varietyImages">
            <img :src="'./img/vegetables/'+ item.cropSegment +'.png'" alt="lt_butter_leaf" >		
            <img :src="'./img/vegetables/'+ item.cropSegment +'.png'" alt="lt_butter_leaf" >
        </div>
    </li>
    `,
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    expired(date) {
        const now = new Date().getTime();
        const expDate = new Date(date).getTime()
        const expDatePlusTwoYears = expDate + 63158400000
        return expDatePlusTwoYears < now
    },
    toDateString(date){
      return new Date(1629158400000).toLocaleDateString('en-GB', {month: 'numeric', year: 'numeric'})
    }
  },
};
