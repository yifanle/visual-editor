<template>
    <el-container>
        <el-aside class="left-materials" :class="isCollapse ? 'hide' : 'show'">
            <div class="collapse-btn" @click="() => isCollapse = !isCollapse">
                <svg-icon v-if="!isCollapse" name="tab-CaretLeft" :size="18" />
                <svg-icon v-else name="tab-CaretRight" :size="18" />
            </div>
            <we-menu :isCollapse="isCollapse"></we-menu>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import WeMenu from '@/components/admin/menu/index.vue'
// 用于控制左侧面板的折叠
const isCollapse = ref(false)


</script>
<style scoped lang="scss">
$collapseBtnWidth: 20px;
.left-materials {
    overflow: unset;
    position: relative;
    border-right: #efefef 1px solid;
    padding-top: 5px;

    .collapse-btn {
        $height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        width: $collapseBtnWidth;
        height: $height;
        border-radius: 5px;
        z-index: 2;
        background-color: #fff;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        right: calc($collapseBtnWidth / -2);
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        transition: all 0.5s;

        &:hover {
            background-color: #ececec;
        }
    }
    
}

.hide {
    width: calc(var(--el-menu-icon-width) + var(--el-menu-base-level-padding) * 2);
    transition: width 0.5s;
}

.show {
    width: 300px;
    transition: width 0.5s;
}</style>