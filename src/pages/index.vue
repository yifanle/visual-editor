<template>
  <div>
    <el-result
        icon="success"
        title="项目正在开发中"
        sub-title="点击下方按钮查看开发进展"
      >
        <template #extra>
          <el-button type="primary" @click="$router.push('/editor')">WorkFlow-Editor</el-button>
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