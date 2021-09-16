export default {
    template: `
    <div>
        {{ orderId }}
    </div>
    `,
    props: {
        orderId: {
            type: String,
            required: true,
        }
    }
}