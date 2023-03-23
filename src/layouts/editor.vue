<template>
  <el-container>
    <el-aside class="left-materials" :class="isCollapse ? 'hide':'show'">
        <div class="collapse-btn" @click="()=> isCollapse = !isCollapse">
            <svg-icon v-if="!isCollapse" name="tab-CaretLeft" size="18" />
            <svg-icon v-else name="tab-CaretRight" size="18" />
        </div>
        <materials v-if="!isCollapse"/>
    </el-aside>
    <el-main>
        <main-canvas />
    </el-main>
    <el-aside>
        <config-area />
    </el-aside>
  </el-container>
</template>
<script setup lang="ts">
import Materials from '@/components/editor/materials/index.vue'
import MainCanvas from '@/components/editor/mainCanvas/index.vue'
import ConfigArea from '@/components/editor/configArea/index.vue'

import { ref } from 'vue'
const isCollapse = ref(false)

</script>
<style scoped lang="scss">
$collapseBtnWidth: 20px;
.left-materials {
    overflow: unset;
    position: relative;
    .collapse-btn {
        $height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        width: $collapseBtnWidth;
        height: $height;
        border-radius: 5px;
        z-index: 1;
        background-color: #fff;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        right: calc($collapseBtnWidth / -2);
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
    }
}
.hide {
  width: 0;
  transition: width 0.5s;
}
.show {
  width: 300px;
  transition: width 0.5s;
}
</style>