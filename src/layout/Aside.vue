<template>
  <el-aside :width="isCollapse ? `0px` : `200px`">
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      text-color="#fff"
      router
      unique-opened
      :default-active="route.path"
      :collapse="isCollapse"
    >
      <template v-for="item in routers" :key="item.name">
        <template v-if="!item['hidden']">
          <el-sub-menu
            v-if="item.children && item.children.length"
            :index="concatPath(item.path)"
          >
            <template #title>
              <Icons v-if="item.meta['icon']" :name="item.meta['icon']"/>
              <span>{{ item.meta.title }}</span>
            </template>
            <template v-for="sub in item.children" :key="sub.name">
              <el-menu-item :index="concatPath(item.path, sub.path)">
                <Icons v-if="sub.meta['icon']" :name="sub.meta['icon']" />
                <template #title>{{ sub.meta.title }}</template>
              </el-menu-item>
            </template>
          </el-sub-menu>
          <el-menu-item v-else :index="concatPath(item.path)">
            <Icons v-if="item.meta['icon']" :name="item.meta['icon']" />
            <template #title>{{ item.meta.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
    <!-- <div class="fold" @click="changeCollapse">
      <Icons v-if="!isCollapse" name="d-arrow-left" />
      <Icons v-else name="d-arrow-right" />
    </div> -->
  </el-aside>
</template>

<script setup lang="ts">
import {useRoute} from 'vue-router'
import { computed } from 'vue'
import appStore from "../store";
import { layoutStore } from '../store/layout'
const stores = layoutStore()
const route = useRoute();
const store = appStore.userStore;
// const state = reactive({ isCollapse: false });
const routers: any = computed(() => store.routers);
// 动态获取是否折叠
const isCollapse = computed(() => {
  return stores.isCollapse
})
const concatPath = (p_path: string, c_path = "") => {
  return `${p_path !== "" ? p_path : ""}${c_path !== "" ? "/" + c_path : ""}`;
};
</script>

<style lang="scss" scoped>
@mixin noScrollBar {
  overflow: hidden;
  overflow-y: scroll;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    width: 0 !important;
  }
}

@mixin noSelect {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@mixin line($n) {
  height: $n + px;
  line-height: $n + px;
}

.el-aside {
  box-sizing: border-box;
  height: calc(100vh - 55px);
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  background-color: var(--el-fill-color-blank);
  overflow: hidden;
  transition: width 0.3s ease-in-out,
    background-color var(--el-transition-duration), var(--el-transition-fade);
  -moz-transition: width 0.3s ease-in-out,
    background-color var(--el-transition-duration);
  -webkit-transition: width 0.3s ease-in-out,
    background-color var(--el-transition-duration);

  @include noSelect;
  .logo,
  .hid_logo {
    @include line(56);
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: space-around;
    background-color: #545c64;
    flex-wrap: nowrap;
    padding: 0 5px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #545c64;
    }
    p {
      margin: 0;
      text-align: center;
      min-width: 135px;
      word-wrap: break-word;
      line-height: 20px;
      font-size: 20px;
      color: #fff;
      // color: var(--el-text-color-primary);
      overflow: hidden;
    }
  }
  .hid_logo {
    animation: animate1 1s;
    p {
      display: none;
    }
  }
  .logo {
    animation: animate 1s;
  }
  @keyframes animate1 {
    0% {
      opacity: 1;
    }
    30% {
      opacity: 0.4;
    }
    50% {
      opacity: 0;
    }
    80% {
      opacity: 0.8;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes animate {
    0% {
      opacity: 1;
    }
    30% {
      opacity: 0.4;
    }
    50% {
      opacity: 0;
    }
    80% {
      opacity: 0.6;
    }
    100% {
      opacity: 1;
    }
  }

  .el-menu {
    flex: 1;
    border-right: none;
    @include noScrollBar;
    &:not(.el-menu--collapse) {
      width: 200px;
    }
  }
  .title {
    line-height: normal;
    min-width: 120px;
  }
}
// // /* 激活选中菜单 */
// .el-menu-item.is-active,
// .el-menu--popup .el-menu-item.is-active {
//   background-color: #1890ff !important;
// }
</style>
