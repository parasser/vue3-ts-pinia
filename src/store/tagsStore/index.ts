import { defineStore } from "pinia";
import { RouteRecordName, _RouteRecordBase } from "vue-router";
interface TagViewState {
  cachedViews: string[];
  fixedVisitedViews: _RouteRecordBase[];
  visitedViews: _RouteRecordBase[];
}
export const tagsStore = defineStore("tags", {
  state: (): TagViewState => ({
    cachedViews: [],
    fixedVisitedViews: [],
    visitedViews: [],
  }),
  actions: {
    // 删除所有路由
    delVisitedView() {
      this.visitedViews = [...this.fixedVisitedViews];
      this.cachedViews = [];
    },

    // 添加缓存路由
    addCacheView(name: string) {
      if (!this.cachedViews.includes(name)) {
        this.cachedViews.push(name);
      }
    },
    // 删除缓存路由
    deleteCacheView(name: RouteRecordName | undefined) {
      if (!name) return;
      const index = this.cachedViews.indexOf(name.toString());
      if (index > -1) this.cachedViews.splice(index, 1);
    },
    // 添加访问过的路由
    addVisitedView(view: _RouteRecordBase) {
      if (
        view?.meta?.title &&
        !this.visitedViews.find((item) => item.name === view.name)
      ) {
        this.visitedViews.push(view);
      }
    },
    // 添加固定路由
    addFixedVisitedView(view: _RouteRecordBase) {
      if (!this.fixedVisitedViews.find((item) => item.name === view.name)) {
        this.fixedVisitedViews.push(view);
      }
    },
    // 添加固定路由
    handleAddFixedVisitedView(view: _RouteRecordBase) {
      this.addFixedVisitedView(view);
      this.addVisitedView(view);
    },
    // 删除访问的路由

    deleteVisitedView(name: RouteRecordName) {
      if (!name) return;
      const idx = this.visitedViews.findIndex((item) => {
        return item.name == name;
      });
      if (idx > -1) {
        this.visitedViews.splice(idx, 1);
      }
    },
    // 删除其他的路由
    deleteOtherVisitedView(view: _RouteRecordBase) {
      this.visitedViews = [...this.fixedVisitedViews];
      if (view.meta && !view.meta.fixed) this.visitedViews.push(view);
    },
  },
});
