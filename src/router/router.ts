import Layout from "../layout/Index.vue";
import { MenuProps } from "../model/userModel";
import { RouteRecordRaw } from "vue-router";

export const layoutMap: Array<RouteRecordRaw & MenuProps> = [
  {
    path: "/index",
    name: "Index",
    meta: { title: "首页", icon: "house", fixed: true },
    component: () => import("../views/index/index.vue"),
  },
  {
    path: "/compromise",
    name: "compromise",
    meta: { title: "上传", icon: "DataLine" },
    redirect: '/compromise/incidents',
    children: [
      {
        path: "incidents",
        name: "compromiseIncidents",
        meta: { title: "上传文件" },
        component: () => import("../views/compromise/index.vue"),
      },
      {
        path: "distribution",
        name: "compromiseDistribution",
        meta: { title: "文件列表" },
        component: () => import("../views/compromise/components/distribution/index.vue"),
      }
    ],
  },
  {
    path: "/userList",
    name: "user",
    // meta: { title: "用户管理", icon: "User", roles: ["admin"] },
    meta: { title: "用户管理", icon: "User" },
    redirect: '/userList/list',
    children: [
      {
        path: "list",
        name: "userList",
        meta: { title: "用户列表" },
        component: () => import("../views/userList/index.vue"),
      }
    ],
  },
  {
    path: "/error",
    name: "NotFound",
    hidden: true,
    meta: { title: "404" },
    component: () => import("../views/page404.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    hidden: true,
    redirect: { name: "NotFound" },
  },
];
export const routes: any = [
  {
    path: "/login",
    name: "Login",
    meta: { title: "登录", notNeedAuth: true },
    component: () => import("../views/login/login.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta: { title: "注册页面",  notNeedAuth: true },
    component: () => import("../views/login/register.vue"),
  },
  // {
  //   path: "/ResetPassword",
  //   name: "ResetPassword",
  //   meta: { title: "注册页面",  notNeedAuth: true },
  //   component: () => import("../views/login/ResetPassword.vue"),
  // },
  {
    path: "/",
    redirect: "index",
    name: "Layout",
    component: Layout,
  }
];
