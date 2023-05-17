import { defineStore } from "pinia";

import { version } from "../../package.json";

// import { getBackendVersion } from '@/axios'

export const useAppInfoStore = defineStore("AppInfo", {
  state: () => ({
    appVersion: `Front-end Ver. ${version}`,
  }),
  getters: {
    appTitle() {
      return import.meta.env.VITE_APP_TITLE;
    },
  },
  actions: {
    // async getAppVersion() {
    //   const result = await getBackendVersion()
    //   this.appVersion += result.data.version
    //     ? ` | Back-end Ver. ${result.data.version}`
    //     : ''
    // },
  },
});
