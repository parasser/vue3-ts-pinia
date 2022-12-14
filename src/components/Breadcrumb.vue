<template>
  <div style="display: flex; align-items: center">
    <Icons name="ArrowRight" size="18px" color="#ccc" />
    <el-breadcrumb separator="/">
      <transition-group name="breadcrumb" mode="out-in">
        <template v-for="item in breadcrumbNav" :key="item.name + '1'">
          <el-breadcrumb-item :to="{ path: item.path }">{{
            item.title
          }}</el-breadcrumb-item>
        </template>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { userStore } from "../store/useStore";
import { computed } from "vue";
import Icons from "./Icons.vue";

const store = userStore();
const breadcrumbNav = computed(() => store.getBreadName);

</script>

<style scoped lang="scss">
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.3s;
  opacity: 0;
  transform: translateX(20px);
}
</style>
