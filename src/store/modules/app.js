import Vue from "vue";

const state = {
    direction: ''
};
const getters = {
    updateDirection: (state) => state.updateDirection,
};
const mutations = {
    updateDirection(state, direction) {
        state.direction = direction
    }
};
const actions = {
};
export default { state, getters, mutations, actions };
