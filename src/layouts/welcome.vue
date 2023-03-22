<template>
  <el-container>
    <el-header>
      <we-header />
    </el-header>
    <el-main>
      <router-view ></router-view>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import weHeader from '@/components/common/header/index.vue'
</script>

<style scoped lang="scss">

</style>