<template>
  <div class="header">
    <el-row style="height: 100%;">
      <el-col :span="4">
        <div class="logo">
          <span class="icon">
            <svg-icon name="tab-RotateRectangle" size="30" color="#f12"></svg-icon>
          </span>
          WorkFlow-Editor
        </div>
      </el-col>
      <el-col :span="16">
        <div class="tools"></div>  
      </el-col>
      <el-col :span="4">
        <div></div>
        <div class="profile">
          <div class="avatar">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          </div>
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              <span>李逸凡</span>
              <svg-icon class="arrow-down" size="20" name="tab-ChevronDown"/>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="a">个人信息</el-dropdown-item>
                <el-dropdown-item command="e" divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>  
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
const handleCommand = (command: string) => {
  console.log(command)
}

</script>
<style scoped lang="scss">
.header {
  background-color: #fff;
  height: 64px;
  line-height: 64px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  .logo {
    color: #f12;
    font-size: 18px;
    font-weight: bold;
    display: flex;
    align-items: center;
    .icon {
      height: 100%;
      padding: 0 10px 0 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
  .profile {
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 20px;
    .avatar {
      display: flex;
      align-items: center;
      margin-right: 10px;
    }
    .el-dropdown-link {
      cursor: pointer;
      display: flex;
      align-items: center;
      font-size: 16px;
      span {
        letter-spacing: 1px;
        margin-right: 5px;
      }
    }
  }
}
</style>