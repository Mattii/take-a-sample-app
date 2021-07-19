export default {
    template: `
            <button v-if="btnType === 'button'"><slot></slot></button>
    `,
    name: 'BaseButton',
    props: {
        btnType: {
            type: String,
            default: 'button',
        }
    },
    data() {
        return {

        }
    },
}