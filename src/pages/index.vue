<template>
  <div>
    <el-result
        icon="success"
        title="项目正在开发中"
        sub-title="点击下方按钮查看admin开发进展"
      >
        <template #extra>
          <el-button type="primary" @click="$router.push('/admin')">Admin</el-button>
        </template>
      </el-result>
    <el-result
        icon="success"
        title="项目正在开发中"
        sub-title="点击下方按钮查看编辑器开发进展"
      >
        <template #extra>
          <el-button type="primary" @click="$router.push('/editor')">Editor</el-button>
        </template>
      </el-result>
  </div>
</template>

<style scoped lang="scss">
  div {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>