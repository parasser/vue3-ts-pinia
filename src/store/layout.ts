import { _RouteLocationBase, RouteLocation as Route } from 'vue-router'
import { defineStore } from 'pinia'

type state = {
  isCollapse: boolean
}

export const layoutStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: 'layoutStore',
  // state: 返回对象的函数
  state: (): state => ({
    isCollapse: false, // 侧边栏是否收起
  }),
  actions: {
    // 是否收起侧边栏
    set_isCollapse(data: boolean) {
      this.isCollapse = data
    },
  }
})
