
<script>
import tabNav from './tabNav.vue';
import tabPanel from './tabPanel.vue';

export default {
    name: 'tab',
    props: ['active'],
    data() {
        return {
            component: 'a-c'
        }
    },
    mounted() {
        this.cache = Object.create(null);
    },
    methods: {
        handerChange(index) {
            this.$emit('onChange', index);
        }
    },
    render(createElement) {
        const nodes = [...this.$slots.default];
        let viewNode = null;
        const tabHeaders = [];

        while(nodes.length) {
            const node = nodes.shift();

            if (!node.componentOptions || node.componentOptions.tag !== tabPanel.name) {
                continue;
            }

            const { index, name } = node.componentOptions.propsData;

            if (index === this.active) {
                viewNode = node;
            }

            tabHeaders.push({ index, name });
        }
    
        return createElement(
            'div',
            {class: 'tab' },
            [
                createElement(tabNav, { attrs: { tabHeaders, handerChange: index => this.handerChange(index) } }),
                viewNode
            ]);
    }
}
</script>
<style lang="less">
    .tab {
        box-sizing: border-box;
    }
</style>