import Vue from 'vue';

import store from './store';
import router from './router';
import Main from './main.vue';
import OwnStore, { ownStore } from './store/ownStore';

import './base.less';

/** 
* const components = require.context('./components', false, /\.vue$/);
* const keys = components.keys();
* const config = components(keys[3]);
*/

Vue.use(OwnStore);


new Vue({
  router,
  store,
  ownStore,
  render: createElement => createElement(Main)
}).$mount('#app')