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
import WeHeader from '@/layouts/components/weHeader/index.vue'
</script>