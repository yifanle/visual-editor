<template>
  <el-menu default-active="1" class="el-menu-vertical" :collapse="porps.isCollapse">
    <el-sub-menu index="1">
      <template #title>
        <svg-icon name="ele-Location" :size="16" />
        <span>Navigator One</span>
      </template>
      <el-menu-item-group>
        <template #title><span>Group One</span></template>
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="Group Two">
        <el-menu-item index="1-3">item three</el-menu-item>
      </el-menu-item-group>
      <el-sub-menu index="1-4">
        <template #title><span>item four</span></template>
        <el-menu-item index="1-4-1">item one</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="2">
      <svg-icon name="ele-Menu" :size="16" />
      <template #title>Navigator Two</template>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <svg-icon name="ele-Document" :size="16" />
      <template #title>Navigator Three</template>
    </el-menu-item>
    <el-menu-item index="4">
      <svg-icon name="ele-Setting" :size="16" />
      <template #title>Navigator Four</template>
    </el-menu-item>
  </el-menu>
</template>
<script setup lang="ts" name="WeMenu">
const porps = defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
});

</script>
<style scoped lang="scss">
.el-menu-vertical {
  width: 100%;
  height: 100%;
  border-right: none;
}
</style>