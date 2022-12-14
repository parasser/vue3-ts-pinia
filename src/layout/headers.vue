<template>
  <div class="box">
    <div class="box1">
      <div class="fold">
        <el-icon @click="handleCollapse(false)" v-if="isCollapse" size="20" class="fold">
          <Expand />
        </el-icon>
        <el-icon @click="handleCollapse(true)" v-else size="20" class="fold">
          <Fold />
        </el-icon>
      </div>
      <span class="tit">HuntingBox </span>
    </div>
    <div>
      <el-dropdown size="medium" @command="handleCommand">
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
      </el-dropdown>
    </div>
  </div>
</template>

<script lang='ts' setup>
import {} from 'vue'
import cookie from 'js-cookie'
import {useRouter, useRoute,} from 'vue-router'
import { ComponentInternalInstance,  reactive, computed } from 'vue';
import avatar from "../assets/img/admin.png";
import appStore from "../store";
import { layoutStore } from '../store/layout'
import { encodeParam } from "../utils/encrypt";
const store = appStore.userStore;
const tStore = appStore.tagsStore;
const router = useRouter();
const route = useRoute();
const userName = computed(() => store?.getUserName);
console.log(userName);
const handleCommand = (command: string) => {
  if (command === "user") {
    router.push("/user");
  } else {
    store.clearUser();
    tStore.delVisitedView();
    router.replace(`/login?redirect=${encodeParam(route.fullPath)}`);
    cookie.remove('jwt')
    // sessionStorage.clear();
    localStorage.clear();
  }
};
// 侧边栏
const stores = layoutStore()
// 动态监听收缩侧边栏
const isCollapse = computed(() => {
  return stores.isCollapse
})
// 收缩侧边栏
const handleCollapse = (data: boolean) => {
  stores.set_isCollapse(data)
}
</script>
<style scoped lang="scss">
.box1 {
  display: flex;
  align-items: center;
  justify-content: center;
  .tit {
    margin-left:30px;
    font-size: 30px;
    font-weight: bold;
    color: #4a4b4c;
  }
}
.box{
  height:55px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.user_info {
  margin: 0 25px 0 16px;
  width: auto;
  text-align: right;
  cursor: pointer;
}
.el-avatar {
  vertical-align: middle;
}
span.username {
  margin-left: 8px;
  vertical-align: middle;
  &:hover {
    color: #409eff;
  }
}
.fold {
  line-height: 40px;
  height: 55px;
  margin-left: 10px;
  float: left;
  cursor: pointer;
  transition: background .3s;
  -webkit-tap-highlight-color:transparent;
}
</style>
