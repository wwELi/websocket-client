<template>
    <div v-if="true"><slot></slot></div>
</template>
<script>
export default {
    name: 'tab-panel',
    props: {
        name: String,
        index: [String, Number]
    }
}
</script>
<style lang="less" scoped>

</style>