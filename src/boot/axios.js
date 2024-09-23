import { boot } from 'quasar/wrappers'
import axios from 'axios'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
// const link = 'http://localhost:4050'
// const link = process.env.BACK_URI1;
const link = process.env.BACK_URI;
console.log(link);
const nano = axios.create({
  baseURL: `${link}/nano/`
});

const api = axios.create({
  baseURL: `${link}/api/`,
  withCredentials: true
});

const links = axios.create({
  baseURL:  `${link}/links/`,
  withCredentials: true
});

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  app.config.globalProperties.$nano = nano
  app.config.globalProperties.$links = links
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api, nano, links }
