<template>
    <div class="main">
        <component v-bind:is="'bC'"></component>
        <tab :active="active" @onChange="onChange">
            <tab-panel name="tab1" index="1">name1</tab-panel>
            <tab-panel name="tab2" index="2"><b-c/><a-c/></tab-panel>
        </tab>

        <promise :promise="promise">
            <template v-slot:pending>
                loading....
            </template>
            <template v-slot:resolve="data">
                <button @click="view">view {{data.name}}</button>
            </template>
            <template v-slot:rejected="error">
                {{ error }}
            </template>
        </promise>
    </div>
</template>
<script>
import aC from './a.vue';
import bC from './b.vue';
import tab from './tab.vue';
import tabPanel from './tabPanel.vue';
import promise from './promise';

export default {
    components: { aC, bC, tab, tabPanel, promise },
    data() {
        return { active: '1', promise: null }
    },
    mounted () {
        console.log(this);
        setTimeout(() => {
            this.promise = Promise.resolve({ name: 'first' })
        }, 5000)
    },
    methods: {
        onChange(index) {
            this.active = index;
            this.promise = Promise.resolve({ name: index });
            this.$ownStore.commit('updateName', 'text');
        },
        async view () {
            const co = {
                audio: true,
                video: {
                    width: { min: 1024, ideal: 1280, max: 1920 },
                    height: { min: 776, ideal: 720, max: 1080 }
                }
            }

            const stream = navigator.mediaDevices.getUserMedia(co);

            console.log(stream);
        }
    }
}
</script>
<style lang="less">

.main {
    transform: scale(1);
}
    
</style>