import { filterAsyncRouter } from "../../utils/permission";
import { layoutMap } from "./../../router/router";
import { defineStore, StoreGeneric } from "pinia";
import { UserModel,userMolde1 } from "../../model/userModel";
import { _RouteRecordBase } from "vue-router";
import { markRaw } from "vue";
import { tagsStore } from "../tagsStore";
import {SendVerifyCode} from './../../api/user'
// 将访问过的路由固定到visited views bar
function handleFixedVisitedViews(
  tagsViewStore: StoreGeneric,
  routes: _RouteRecordBase[]
) {
  routes.forEach((route) => {
    if (route.meta && route.meta.fixed) {
      tagsViewStore.handleAddFixedVisitedView(route);
    }
    if (route.children && route.children.length)
      handleFixedVisitedViews(tagsViewStore, route.children);
  });
}
export const userStore = defineStore("user", {
  state: (): {
    users: string | undefined;
    routers: any[];
    currentRouteName: any[];
  } => ({
    users: '',
    routers: [],
    currentRouteName: [],
  }),
  getters: {
    getUserName: (state) => {
      return !!state.users && state.users
    },
    getBreadName: (state) => state.currentRouteName,
  },
  actions: {
    clearUser() {
      this.users = '';
      this.routers = [];
    },
    setUser(user: UserModel) {
      const routers = markRaw(layoutMap);
      let roles:string = user.roles?.length === 1 ? user.roles[0].name : ''
      const accessedRouters = filterAsyncRouter(routers, roles);
      this.users = user.username
      this.routers = accessedRouters;
      handleFixedVisitedViews(tagsStore(), routers);
    },

    setBreadcrumb(arr: any[]) {
      const newBreadArr = arr?.filter((item) => {
        return item.meta && JSON.stringify(item.meta) != "{}";
      });
      const titles = newBreadArr?.map((item) => {
        return {
          title: item?.meta?.title,
          path: item?.path,
        };
      });
      this.currentRouteName = titles;
    },
    // 发送验证码
    SendVerify(email:string) {
      return new Promise((resolve, reject) => {
        SendVerifyCode({ email: email }).then(res => {
          console.log(res)
          resolve(res)
          // if (res.code === 200) {
          //   resolve(res)
          // } else {
          //   Message({
          //     message: res.message,
          //     type: 'error',
          //     duration: 5 * 1000
          //   })
          // }
        })
      })
    }
  }
  // persist: {
  //   // 修改存储中使用的键名称，默认为当前 Store的 id
  //   key: 'username',
  //   // 修改为 sessionStorage，默认为 localStorage
  //   storage: window.sessionStorage,
  //   // 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
  //   paths: ['users'],
  // }
})
