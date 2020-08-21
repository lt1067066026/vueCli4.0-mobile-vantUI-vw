import Vue from "vue";
import { login, getUserInfo, logout } from "@/api/commonApi";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "@/common/accessToken";

const state = {
  accessToken: getAccessToken(),
  userInfo: {}
};
const getters = {
  accessToken: (state) => state.accessToken,
  userInfo: (state) => state.userInfo,
};
const mutations = {
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken;
    setAccessToken(accessToken);
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo;
  },
};
const actions = {
  login({ commit }, data) {
    return new Promise((resolve, reject) => {
      login(data).then(response => {
        commit("setAccessToken", response.data.token);
        resolve(response)
      }).catch(error => {
        reject(error)
      })

    })
  },
  async getInfo({ commit, state }) {
    const { data } = await getUserInfo();
    commit("setUserInfo", data);
  },
  async logout({ dispatch }) {
    // await logout();
    await dispatch("resetAccessToken");
  },
  resetAccessToken({ commit }) {
    commit("setAccessToken", "");
    removeAccessToken();
  },
  refreshToken({ commit }, token) {
    commit("setAccessToken", token);
  }
};
export default { state, getters, mutations, actions };
