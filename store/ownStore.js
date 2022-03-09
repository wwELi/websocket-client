const stateKey = Symbol('state');

class Store {
    constructor(options) {
        this[stateKey] = options.state;
        this.mutations = options.mutations;
    }

    dispatch() {}

    commit(key, payload) {
        this.mutations[key](this[stateKey], payload);
        // this.$forceUpdate() 
    }
}


export default {
    install(_vue) {
        _vue.mixin({ beforeCreate });
    },
    Store
};


function beforeCreate() {
    this.$ownStore = this.$options.ownStore || this.$options.parent.$ownStore;
}


export const ownStore = new Store({ 
    state: {
        name: ''
    },
    mutations: {
        updateName(state, payload) {
            state.name = payload;
        }
    }
 })