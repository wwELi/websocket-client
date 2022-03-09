import Vuex from 'vuex';
import Vue from 'vue';

console.log(Vue);

Vue.use(Vuex);

const UPDATE_USER = 'UPDATE_USER';
const UPDATE_MESSAGE = 'UPDATE_MESSAGE';

export default new Vuex.Store({
    state: {
        user: { name: '', id: null },
        messages: []
    },
    mutations: {
        [UPDATE_USER](state, { name, id }) {
            state.user = { name, id };
        },
        [UPDATE_MESSAGE](state, messages = []) {
            state.messages = messages;
        } 
    },
    actions: {
        user({ commit }, user) {
            commit(UPDATE_USER, user);
        },
        messages({ commit }, messages) {
            commit(UPDATE_MESSAGE, messages);
        }
    }
});