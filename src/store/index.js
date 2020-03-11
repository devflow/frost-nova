import Vue from "vue"
import Vuex from 'vuex'
var moment = require('moment');
import { createPersistedState, createSharedMutations } from "vuex-electron"
import { getField, updateField } from 'vuex-map-fields';

const merge = require('deepmerge')

const DummyData = require("../plugins/ghost_data.json")


const overwriteMerge = (_x, sourceArray, _y) => sourceArray // eslint-disable-line no-unused-vars

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isServerRunning: false,
        serverPort: 8080,
        lastUpdatedAt: 0,
        playerData: DummyData
    },

    getters: {
        lastUpdate: s => {
            return s.lastUpdatedAt == 0 ? '-' : moment.unix(s.lastUpdatedAt).format('YYYY-MM-DD a h:mm:ss')
        },
        getField
    },

    actions: {
        changeServerPort({ commit }, data) { commit('serverPort', data) }
    },

    mutations: {
        updateField,
        updatePlayerData(state, payload) {
            state.playerData = merge(state.playerData, payload.data, {
                arrayMerge: overwriteMerge
            })
        },
        serverPort(state, data) { state.serverPort = data }
    },

    plugins: [
        createPersistedState(),
        createSharedMutations()
    ],

})