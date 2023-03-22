<template>
  <el-container>
    <el-main>
        <el-row style="height: 100%;">
            <el-col :span="4">
                <materials />
            </el-col>
            <el-col :span="16">
                <main-canvas />
            </el-col>
            <el-col :span="4">
                <config-area />
            </el-col>
        </el-row>
    </el-main>
  </el-container>
</template>
<script setup lang="ts">
import Materials from '@/components/editor/materials/index.vue'
import MainCanvas from '@/components/editor/mainCanvas/index.vue'
import ConfigArea from '@/components/editor/configArea/index.vue'
</script>
<style scoped lang="scss">
</style>