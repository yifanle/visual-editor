<template>
  <div>
    <el-result
        icon="warning"
        title="404提示"
        sub-title="抱歉，你访问的页面不存在"
      >
        <template #extra>
          <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
        </template>
      </el-result>
  </div>
</template>