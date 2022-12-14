import { userStore } from "./../store/useStore/index";
import { tagsStore } from "../store/tagsStore";
import cookie from 'js-cookie'
import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
  _RouteRecordBase,
} from "vue-router";
import { layoutMap, routes } from "./router";
const whiteList = ['/login', '/auth-redirect', '/register', '/ResetPassword']
const router = createRouter({
  history: createWebHistory(),
  routes: [...routes],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

let hasRoles = true;
router.beforeEach(async (to, form, next) => {
  let token = cookie.get('jwt')
  if (token) {
    if (to.path == "/login") {
      next({ path: "/" });
    } else {
      // 获取处理好的路由
      let routes = userStore().routers;
      // 路由添加进去了没有及时更新 需要重新进去一次拦截
      if (hasRoles) {
        routes.forEach((item) => router.addRoute("Layout", item));
        hasRoles = false;
        next({ ...to, replace: true }); // 这里相当于push到一个页面 不在进入路由拦截
        // console.log(routes);
      } else {
        next(); // 如果不传参数就会重新执行路由拦截，重新进到这里
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      router.replace(`/login`);
    }
  }
});

router.afterEach((to: RouteLocationNormalized): void => {
  const tStore = tagsStore();
  // 添加缓存路由
  if (to.name && to.meta && to.meta.needCache) {
    tStore.addCacheView(to.name.toString());
  }
  const { name, path, meta, params, query } = to;
  if (to.meta && !to.meta.notNeedAuth) {
    tStore.addVisitedView({
      name,
      path,
      meta,
      params,
      query,
    } as _RouteRecordBase);
  }
});

export default router;
