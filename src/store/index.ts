import Vue from 'vue';
import Vuex from 'vuex';

import environmentStore from "@/store/environment.store";


Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    featureFlags: null,
    loadingFeatureFlags: false,
  },
  mutations: {
    setFeatureFlags(state, payload) {
      state.featureFlags = payload;
    },

    setLoadingFeatureFlags(state, payload) {
      state.loadingFeatureFlags = payload;
    }
  },
  modules: {
    environment: environmentStore,
  },
});

export default store;
