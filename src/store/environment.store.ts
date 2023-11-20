import environment from "@/environments/environment";

export default {
  namespaced: true,

  state: {
    isApp: environment.isApp(),
  },
}
