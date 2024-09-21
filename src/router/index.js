import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import {  ButtonUser } from "stores/bundle";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> builds -> vueRouterMode
    // quasar.conf.js -> builds -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  });

  Router.beforeEach(async (to, from, next) => {
    const requiredAuth = to.meta.auth;
    const btnUser = ButtonUser();
    if (!btnUser.token && sessionStorage.getItem('user')) {
      await btnUser.refreshToken();
      if (requiredAuth && !btnUser.token) {
        return next("/login");
      }
    }
    return next();
  });

  return Router
})
