<template>
  <div class="materials">
    <el-scrollbar height="calc(100vh - 60px)" style="margin-top: 5px">
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
<script setup lang="ts" name="Materials">

</script>
<style scoped lang="scss">
  .materials {
    height: 100%;
    overflow: hidden;
    border-right: 1px solid #fff;
    .empty {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
  }
</style>