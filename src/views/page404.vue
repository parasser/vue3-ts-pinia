<template>
  <el-card style="text-align: center">
    <el-image :src="noAuthImg"></el-image>
    <div style="color: #aaa">没有找到要访问的页面</div>
  </el-card>
</template>

<script setup lang="ts">
import noAuthImg from "../assets/img/404.png";
</script>

<style scoped lang="scss"></style>
