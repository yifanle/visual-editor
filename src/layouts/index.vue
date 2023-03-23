<template>
  <el-container>
    <el-header>
      <we-header />
    </el-header>
    <el-main class="layout-container">
      <router-view ></router-view>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import weHeader from '@/components/common/header/index.vue'
</script>

<style scoped lang="scss">
.layout-container {
  overflow: hidden;
}
</style>