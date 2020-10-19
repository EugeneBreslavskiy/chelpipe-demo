import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        zoom: {
            status: false,
            index: null
        }
    },
    getters: {
        getZoomIndex(state) {
            return state.zoom.index;
        }
    },
    mutations: {
        changeZoom(state, payload) {
            state.zoom.status = payload.status;
            state.zoom.index = payload.index;
        }
    },
    actions: {
    },
    modules: {
    },
});