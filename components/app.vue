<template>
    <div class="app">
        <div class="bac"></div>
        <div class="main">
            <Resize :width="800" :height="500" :minHeight="500" :minWidth="800" v-move="getTitleRef">
                <div class="content">
                    <div class="list">
                        <span>{{ user.name }}</span>
                        <div v-for="u of users" :key="u">{{u}}</div>
                    </div>
                    <div class="chat">
                        <div class="title" ref="titleRef">Chatroom</div>
                        <div class="dashbard">
                            <div :ref="index" v-for="(message, index) of messages" :key="index" :class="getLineClass(message.author)">
                                <span class="name">{{ message.author }}</span>
                                <span :class="getMessageClass(message.author)">{{ message.content }}</span>
                            </div>
                        </div>
                        <div class="input">
                            <textarea class="textarea" v-model="value" @keydown="keydown"/>
                            <button :disabled="!value" class="send" @click="onSend" title="Press Control + Enter send">Send</button>
                        </div>
                    </div>
                </div>
            </Resize>
        </div>
    </div>
    
</template>
<script>
import { mapState } from 'vuex'

import Ws from '../utils/ws';

import resize from './resize.vue';
import move from './move';
import tab from './tab.vue';

export default {
    data() {
        return {
            value: '',
            position: {},
        }
    },
    computed: {
        ...mapState({
            user: state => state.user,
            messages: state => state.messages
        }),
        users() {
            return [...new Set(this.messages.map(({ author }) => author))]
        }
    },
    components: { Resize: resize },
    directives: { move },
    created() {
        this.ws = new Ws(`ws://${IP}:8000/`, {
            onopen: this.onopen,
            onmessage: this.onmessage,
        });
    },
    mounted() {
        
        const name = String.fromCharCode(Math.round(Math.random() * 20901) + 19968);
        this.$store.dispatch('user', { name });

        this.ws.connect();
    },
    destroyed() {
        this.ws.close();
    },
    methods: {
        getLineClass(name) {
            return `${this.user.name === name ? 'line-reverse' : 'line-normal'}`;
        },
        getMessageClass(name) {
            return `${this.user.name === name ? 'message-reverse' : 'message-normal'}`;
        },
        getTitleRef() {
            return this.$refs['titleRef']
        },
        onmessage(evt) {

            try {
                const messages = JSON.parse(evt.data);

                this.$store.dispatch('messages', messages.map(JSON.parse));
                this.$nextTick(() => this.messages.length && this.$refs[this.messages.length - 1][0].scrollIntoView());

            } catch(err) {
                console.error(err);
            }
        },
        keydown(evt) {

            if (evt.code === 'Enter' && evt.ctrlKey) {
                this.value = this.value + '\n';
                evt.preventDefault();
                return;
            };

            if (evt.code === 'Enter') {
                this.onSend();
                evt.preventDefault();
                return;
            }

        },
        async onSend() {
            if (!this.value) return;

            if (this.ws.client.readyState !== this.ws.client.OPEN) {
                this.ws.connect();   
            }

            await this.ws.send(JSON.stringify({ author: this.user.name, content: this.value }));
            this.value = '';
        }
    }
}
</script>
<style lang="less" scoped>

.position {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
}

.title {
    background: #ffffff;
    padding: 4px 10px;
}

.bac {
    &:extend(.position);
    background-position: center;
    background-image: url('../assets/images/Hardy.jpg');
    filter: blur(10px);
}

.main {
    &:extend(.position);
}

.modal {
    position: absolute;
    top: 22%;
    left: 0%;
}

.content {
    background: #ffffff;
    border-radius: 2px;

    display: flex;
    width: 100%;
    height: 100%;

}

.message {
    position: relative;
    white-space: pre-line;

    min-width: 40px;
    display: inline-block;
    padding: 4px 5px;
    border-radius: 3px;
    font-size: 14px;

    min-height: 28px;
    line-height: 28px;
    max-width: 80%;
}

.message-normal {
    &:extend(.message);
    background: #ffffff;
    z-index: 1;
    &::before {
        content: '';
        width: 16px;
        height: 10px;
        position: absolute;
        left: -4px;
        background: #ffffff;
        transform: rotate(45deg);
        z-index: -1;
        top: 10px;
    }
}

.message-reverse {
    &:extend(.message);
    background: rgba(134, 236, 86);
    z-index: 1;

    &::before {
        content: '';
        width: 16px;
        height: 10px;
        position: absolute;
        right: -4px;
        background: rgba(134, 236, 86);
        transform: rotate(45deg);
        z-index: -1;
        top: 5px;
    }
}

.list {
    width: 20%;
    border-right: 1px solid #cccccc;
    padding: 10px;
    flex-shrink: 0;
}

.chat {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: #ededed;
}

.dashbard {
    flex: 1;
    overflow-y: auto;

    display: flex;
    flex-direction: column;

    margin: 20px;
    margin-right: 0;
}

.input {
    height: 200px;
    border-top: 1px solid #cccccc;
    background: #ffffff;

    display: flex;
    flex-direction: column;
}

.textarea {
    flex: 1;
    border: none;

    padding: 20px;
    font-size: 18px;

    resize: none;

    &:focus {
        outline: none;
    }
}

.name {
    width: 25px;
    height: 25px;
    display: inline-block;
    vertical-align: top;
    overflow: hidden;
    margin-right: 10px;
    background: #ffffff;
    border-radius: 2px;
}

.line {
    margin-bottom: 10px;
    display: flex;
}

.line-normal {
    &:extend(.line);
}

.line-reverse {
    &:extend(.line);
    flex-direction: row-reverse;

    > span {
        margin-right: 10px;
    }
}

.send {
    width: 80px;
    border: none;
    align-self: flex-end;
    line-height: 29px;
    color: #333;
    cursor: pointer;
    font-size: 16px;

    &:focus {
        outline: none;
    }
}

@media screen and (max-width: 768px){
    .chat {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }

    .bac {
        background-image: none;
    }

    .line {
        margin-bottom: 20px;
    }

    .dashbard {
        overflow: auto;

        flex: 1;
    }
}
</style>