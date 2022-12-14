<template>
  <el-header height="40px">
    <div class="header_left">
      <Breadcrumb></Breadcrumb>
    </div>
    <div class="header_right">
      <!-- <button @click="toggleDark()">Is Dark: {{ isDark }}</button> -->
      <!-- <el-switch
        v-model="isDark"
        inline-prompt
        style="margin-right: 10px"
        :active-icon="Sunny"
        :inactive-icon="Moon"
      >
      </el-switch> -->
      <!-- <el-tooltip :content="state.isFullScreen ? '退出全屏' : '全屏'">
        <Icons name="full-screen" @click.stop="handleFullScreen" />
      </el-tooltip> -->
      <!-- <el-dropdown size="medium" @command="handleCommand">
        <div class="user_info">
          <el-avatar :size="36" :src="avatar" />
          <span class="username">{{ userName }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="user">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown> -->
    </div>
  </el-header>
</template>

<script setup lang="ts">
// import { ComponentInternalInstance,  reactive, computed } from 'vue';
// import screenfull from "screenfull";
// import {useRouter, useRoute,} from 'vue-router'
// import avatar from "../assets/img/admin.png";
import Breadcrumb from "../components/Breadcrumb.vue";
// import { encodeParam } from "../utils/encrypt";
// import appStore from "../store";
// import cookie from 'js-cookie'
// const router = useRouter();
// const route = useRoute();

// const store = appStore.userStore;
// const tStore = appStore.tagsStore;
// const state = reactive({
//   isFullScreen: false,
  // avatar,
  // screenfull,
// });
// const userName = computed(() => store.getUserName);

// const handleCommand = (command: string) => {
//   if (command === "user") {
//     router.push("/user");
//   } else {
//     store.clearUser();
//     tStore.delVisitedView();
//     router.replace(`/login?redirect=${encodeParam(route.fullPath)}`);
//     cookie.remove('jwt')
//     // sessionStorage.clear();
//     localStorage.clear();
//   }
// };

// const handleFullScreen = () => {
//   state.isFullScreen = !state.isFullScreen;
//   // if (screenfull.isEnabled) {
//   //   state.isFullScreen = !state.isFullScreen;
//   //   screenfull.toggle();
//   // }
// };
</script>

<style lang="scss" scoped>
.el-header {
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  padding: 0 16px;
  border-bottom: 1px solid var(--el-border-color-light);
  background-color: var(--el-fill-color-blank);
  display: flex;
  display: -webkit-flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  transition: background-color var(--el-transition-duration);
  -moz-transition: background-color var(--el-transition-duration);
  -webkit-transition: background-color var(--el-transition-duration);
  .el-icon {
    color: var(--el-text-color-regular);
  }
  .header_left {
    flex: 1;
    font-size: 24px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .header_right {
    display: flex;
    align-items: center;
    padding-left: 8px;
    width: auto;
    & > i {
      padding: 8px 6px;
      font-size: 18px;
      cursor: pointer;
    }
  }
}
</style>
