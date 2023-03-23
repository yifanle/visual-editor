<template>
  <div class="materials">
    <div class="empty">
      <el-empty description="暂无数据" />
    </div>
  </div>
</template>
<script setup lang="ts" name="Materials"></script>
<style scoped lang="scss">
  .materials {
    height: 100%;
    border-right: 1px solid #fff;
    .empty {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>