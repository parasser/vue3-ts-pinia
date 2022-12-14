<template>
  <div class="app_wrap">
    <el-main class="app_main">
      <router-view v-cloak v-slot="{ Component }">
        <template v-if="Component">
          <transition name="slide-fade" mode="out-in">
            <keep-alive :include="cachedViews">
              <component :is="Component" :key="key" />
            </keep-alive>
          </transition>
        </template>
      </router-view>
    </el-main>
    <!-- backtop -->
    <el-backtop target=".app_wrap"></el-backtop>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { tagsStore } from "../store/tagsStore";
import { storeToRefs } from "pinia";
const { cachedViews } = storeToRefs(tagsStore());
const route = useRoute();
const key = computed(() => route.fullPath);
</script>

<style scoped lang="scss">
// 滚动条样式
@mixin zdy_scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #e5e5e5 #f7f7f9;
  &::-webkit-scrollbar {
    width: 10px;
    height: 8px;
    // background-color: #f5f5f5;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--el-bg-color-overlay);
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: var(--el-menu-active-color);
    border-radius: 10px;
  }
}
.app_wrap {
  flex: 1;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: var(--main-bg-color);
  transition: background-color var(--el-transition-duration);
  -moz-transition: background-color var(--el-transition-duration);
  -webkit-transition: background-color var(--el-transition-duration);
  @include zdy_scrollbar;
  .app_main {
    overflow-x: hidden;
    min-height: calc(100% - 48px) !important;

    @include zdy_scrollbar;
  }
  .el-main {
    padding: 16px;
    // min-height: calc(100vh - 105px);
    height: 100%;
  }
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.2s;
    opacity: 0;
    transform: translateX(30px);
  }

  .el-footer {
    line-height: 48px;
    font-size: 14px;
    width: 100%;
    color: rgba(0, 0, 0, 0.5);
    text-align: center;
    overflow: hidden;
    user-select: none;
  }
}
</style>
