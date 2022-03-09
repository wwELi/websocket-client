<template>
    <div class="tab-nav">
        <span v-for="header of tabHeaders" :key="header.index" class="label">
            <input type="radio" :id="header.index" name="xx" @change="() => handerChange(header.index)"/>
            <label :for="header.index" class="text">{{header.name}}</label>
        </span>
    </div>
</template>
<script>
export default {
    props: ['tabHeaders', 'handerChange'],
}
</script>
<style lang="less" scoped>
.tab-nav {
    display: flex;
}

.label {

    .text {
        cursor: pointer;
        padding: 0 20px;
        border-bottom: 1px solid currentColor;
    }

    > input[type='radio'] {
        opacity: 0;
        position: absolute;

        &:checked ~ .text {
            color: #DB0011;
            border-bottom: 1px solid currentColor;
        }
    }
    
}
</style>