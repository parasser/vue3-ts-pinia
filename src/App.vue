<template>
  <el-config-provider :locale="locale">
      <router-view></router-view>
    </el-config-provider>
</template>

<script lang='ts' setup>
import permissionToken from "./utils/permissionToken";
import {onMounted,watchEffect, reactive} from 'vue'
import { userStore } from "./store/useStore";
import {useRoute} from 'vue-router'
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
const store = userStore();
const route = useRoute();
function handleBreadcrumb(breadcrumb: any[]) {
  store.setBreadcrumb(breadcrumb);
}
const { locale } = reactive({
  locale: zhCn,
});
watchEffect(() => {
  handleBreadcrumb(route.matched);
});
onMounted(() => {
  permissionToken()
});
</script>
<style>
@import "./assets/css/rebase.css";
html, body {
  height: 100%;
}
#app {
  height: 100%;
}
</style>
