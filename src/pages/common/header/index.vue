<template>
  <div class="header">
    <el-row style="height: 100%;">
      <el-col :span="4">
        <div class="logo">
          <span class="icon">
            <svg-icon name="tab-RotateRectangle" size="20" color="#f12"></svg-icon>
          </span>
          WorkFlow-Editor
        </div>
      </el-col>
      <el-col :span="16"><div style="background-color: green; height: 100%;" /></el-col>
      <el-col :span="4"><div style="background-color: red; height: 100%;" /></el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
</script>
<style scoped lang="scss">
.header {
  background-color: #fff;
  height: 60px;
  line-height: 60px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  .logo {
    color: #f12;
    font-size: 20px;
    font-weight: bold;
    svg-icon {
      margin: auto 0;
    }
  }
}
</style>