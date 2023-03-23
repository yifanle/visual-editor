<template>
  <div class="configArea">
    <el-scrollbar height="calc(100vh - 64px)" style="margin-top:5px">
      <div class="empty">
        <el-empty description="暂无数据" />
      </div>
      <div class="empty">
        <el-empty description="暂无数据" />
      </div>
      <div class="empty">
        <el-empty description="暂无数据" />
      </div>
      <div class="empty">
        <el-empty description="暂无数据" />
      </div>
      <div class="empty">
        <el-empty description="暂无数据" />
      </div>
    </el-scrollbar>
  </div>
</template>
<script setup lang="ts" name="ConfigArea"></script>
<style scoped lang="scss">
  .configArea {
    height: 100%;
    border-left: 1px solid #fff;
    overflow: hidden;
    .empty {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>