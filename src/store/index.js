import Vue from "vue";
import Vuex from "vuex";

import products from './products/index.js';
import cart from './cart/index.js';
import purchases from './purchases/index.js';

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function( /* { ssrContext } */ ) {
  const Store = new Vuex.Store({
    modules: {
      products,
      cart,
      purchases
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    // strict: process.env.DEV
  });

  return Store;
}