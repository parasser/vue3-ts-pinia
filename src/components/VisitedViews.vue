<template>
  <div class="tags_warp">
    <template v-for="item in visitedViews" :key="item.name">
      <div
        class="tags_item"
        :class="{ active: currentRoutePath === item.path }"
        @click="goTargetView(item)"
        @contextmenu.prevent="mouseRightClick(item, $event)"
      >
        <span style="margin-right: 3px">{{ item.meta?.title }}</span>
        <Icons
          v-if="item.meta && !item.meta.fixed"
          @click.stop="delTargetView(item.name!)"
          name="Close"
        />
      </div>
    </template>
    <ul v-show="visible" ref="menu" class="menu">
      <li @click="refresh">刷新</li>
      <li
        v-if="mouseRightView?.meta && !mouseRightView?.meta.fixed"
        @click="close"
      >
        关闭
      </li>
      <li @click="closeOther">关闭其他</li>
      <li @click="closeAll">关闭所有</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import Icons from "../components/Icons.vue";
import { tagsStore } from "../store/tagsStore";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { ref, VueElement, Ref } from "vue";
import {
  RouteRecordName,
  useRoute,
  useRouter,
  _RouteLocationBase,
  _RouteRecordBase,
} from "vue-router";
const route = useRoute();
const router = useRouter();
const { visitedViews } = storeToRefs(tagsStore());
const mouseRightView = ref<_RouteRecordBase>();
const visible = ref<boolean>(false);
const currentRoutePath = computed(() => route.path);
// 点击切换
const goTargetView = (e: Partial<_RouteLocationBase>) => {
  router.push(e.path!);
};
// 关闭卡片
const delTargetView = (name: RouteRecordName) => {
  tagsStore().deleteVisitedView(name!);
  if (name == route.name) {
    // router.go(-1);
    router.push({
      name: visitedViews.value[visitedViews.value.length - 1].name,
    });
  }
};
// 右键菜单html
const menu: Ref<VueElement | null> = ref(null);

// 关闭右键菜单
const hideMenu = () => {
  visible.value = false;
};
// 显示右键菜单
const showMenu = (left: number, top: number) => {
  // 浏览器添加click关闭右键菜单
  window.addEventListener("click", hideMenu);
  visible.value = true;
  if (menu.value) {
    menu.value.style.left = `${left}px`;
    menu.value.style.top = `${top + 10}px`;
  }
};
// 鼠标右击事件
// 鼠标右键点击
const mouseRightClick = (view: _RouteRecordBase, e: any) => {
  // 存储右键view
  mouseRightView.value = view;
  // 显示右键菜单
  showMenu(e.clientX, e.clientY);
};

// 关闭右键路由
const close = () => {
  delTargetView(mouseRightView.value?.name!);
};

// 右键关闭其他
const closeOther = () => {
  tagsStore().deleteOtherVisitedView(mouseRightView.value!);
  if (mouseRightView.value?.name !== route.name) {
    router.push({ name: mouseRightView.value?.name });
  }
};
// 右键关闭所有
const closeAll = async () => {
  await tagsStore().delVisitedView();
  router.push({
    name: visitedViews.value[visitedViews.value.length - 1]?.name,
  });
};

// 刷新右键路由
const refresh = async () => {
  tagsStore().deleteCacheView(mouseRightView.value?.name);
  if (mouseRightView.value?.name === route.name) {
    await router.push({ name: "Index" });
    router.replace({ name: mouseRightView.value?.name });
  } else {
    router.push({ name: mouseRightView.value?.name });
  }
};
</script>

<style scoped lang="scss">
.tags_item {
  font-size: 12px;
  border: 1px solid var(--el-border-color);
  color: var(--el-text-color-regular);
  cursor: pointer;
}
.tags_warp {
  height: 30px;
  line-height: 27px;
  padding: 0 20px;
  overflow-y: hidden;
  border-bottom: 1px solid var(--el-border-color-light);
  overflow-x: auto;
  white-space: nowrap;
  > div {
    margin-right: 5px;
    padding: 0 10px;
    display: inline-block;
    line-height: 24px;
    // border: 1px solid #ccc;
    border-radius: 2px;
    &.active {
      background-color: var(--el-color-primary);
      border: 1px solid transparent;
      color: #fff;
    }
    .el-icon {
      vertical-align: middle;
      margin-top: -3px;
    }
  }
  .menu {
    width: 100px;
    padding: 5px 10px;
    position: absolute;
    background-color: #fff;
    font-size: 13px;
    cursor: pointer;
    color: #333;
    z-index: 9999;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    > li {
      padding: 5px 2px;
      list-style: none;
      &:hover {
        color: #3477f2;
      }
    }
  }
}
</style>
