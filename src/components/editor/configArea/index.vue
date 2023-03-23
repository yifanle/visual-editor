<template>
  <div class="configArea">
    <div class="empty">
      <el-empty description="暂无数据" />
    </div>
  </div>
</template>
<script setup lang="ts" name="ConfigArea"></script>
<style scoped lang="scss">
  .configArea {
    height: 100%;
    border-left: 1px solid #fff;
    .empty {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>