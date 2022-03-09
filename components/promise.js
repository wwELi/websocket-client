const STARUS = {
    PENDING: 'pending',
    RESOLVE: 'resolve',
    REJECT: 'reject'
};

export default {
    name: 'promise',
    props: ['promise'],
    data() {
        return { status: STARUS.PENDING, data: null };
    },
    mounted () {
        this.$watch('promise', () => this.handlerPromiseChnage())
    },
    methods: {
        handlerPromiseChnage() {
            if (!(this.promise instanceof Promise)) return;

            this.status = STARUS.PENDING;
            this.promise
                .then(data => {
                    this.data = data;
                    this.status = STARUS.RESOLVE;
                })
                .catch((e) => {
                    this.data = e;
                    this.status = STARUS.REJECT;
                });
        }
    },
    render: function () {
        const renderNodeFn = this.$scopedSlots[this.status];
        return typeof renderNodeFn === 'function' ? renderNodeFn(this.data) : null;
    }
}