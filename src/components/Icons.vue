<template>
  <el-icon :size="size" :color="color" style="height: 100%">
    <component :is="name"></component>
  </el-icon>
</template>

<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "",
  },
});
</script>
