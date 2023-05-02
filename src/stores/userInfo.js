import { defineStore } from "pinia";

export const useUserInfoStore = defineStore("UserInfo", {
  state: () => ({
    userInfo: null,
  }),
  getters: {},
  actions: {},
});
