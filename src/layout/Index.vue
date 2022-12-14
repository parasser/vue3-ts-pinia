<template>
  <div>
    <div style="width:100%;height:55px;border-bottom: 1px solid #c8ced3;">
      <Headers />
    </div>
    <el-container class="layout">
      <Aside />
      <el-container>
        <Header />
        <!-- <VisitedViews></VisitedViews> -->
        <Main />
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Aside from "./Aside.vue";
import Headers from "./headers.vue";
import Header from "./Header.vue";
import Main from "./Main.vue";
// import VisitedViews from "../components/VisitedViews.vue";
</script>

<style lang="scss" scoped>
.layout {
  box-sizing: border-box;
  width: 100%;
  height: calc(100vh - 56px);
  overflow: hidden;
  background-color: var(--el-fill-color-blank);
  transition: background-color var(--el-transition-duration);
  -moz-transition: background-color var(--el-transition-duration);
  -webkit-transition: background-color var(--el-transition-duration);
  .el-container {
    height: 100vh;
    overflow: hidden;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
  }
}
</style>
