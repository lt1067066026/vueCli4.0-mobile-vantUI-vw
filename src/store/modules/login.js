import Vue from "vue";
import { login, logout } from "@/api/commonApi";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "@/common/accessToken";

const state = {
  accessToken: getAccessToken(),
};
const getters = {
  accessToken: (state) => state.accessToken,
};
const mutations = {
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken;
    setAccessToken(accessToken);
  },
};
const actions = {
  setPermissions({ commit }, permissions) {
    commit("setPermissions", permissions);
  },
  async login({ commit }, data) {
    return new Promise((resolve, reject) => {
      // login(data).then(response => {
      //   resolve(response)
      // }).catch(error => {
      //   reject(error)
      // })
      // commit("setAccessToken", "accessToken");
      resolve(true)
    })


  },

  async logout({ dispatch }) {
    // await logout();
    await dispatch("resetAccessToken");
  },
  resetAccessToken({ commit }) {
    commit("setAccessToken", "");
    removeAccessToken();
  },
};
export default { state, getters, mutations, actions };
