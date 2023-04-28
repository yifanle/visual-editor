<template>
    <div class="tools" v-if="showToolbar">
        <el-tooltip :content="button.shortcut == '' ?`${button.label}` : `${button.label}(${button.shortcut})`" placement="bottom" effect="light" v-for="button in buttons">
            <div class="tool-btn" @click="button.handler()">
                <svg-icon :size="20" :name="button.icon" />
            </div>
        </el-tooltip>
    </div>
</template>
<script setup lang="ts" name="ToolsBar">
import { ref ,watch} from 'vue';
import { useRoute } from 'vue-router';
import UseCommands from '@/utils/UseCommands';
const route = useRoute();
const showToolbar = ref(false);
const useCommands = UseCommands.getInstance();
const command = {
    redo: () => console.log(useCommands.getData().value),
    undo: () => alert('正在努力开发中...')
}
const buttons = [
    {label:'保存',icon:'tab-FileCheck',shortcut:'ctrl+S',handler:command.undo},
    {label:'复制',icon:'tab-Files',shortcut:'ctrl+C',handler:command.undo},
    {label:'撤销',icon:'tab-ArrowBackUp',shortcut:'ctrl+Z',handler:command.redo},
    {label:'恢复',icon:'tab-ArrowForwardUp',shortcut:'ctrl+Y', handler:command.undo},
    {label:'清空',icon:'tab-TrashX',shortcut:'ctrl+Delete', handler:command.undo},
    {label:'导入json数据',icon:'tab-FileCode',shortcut:'', handler:command.undo},
    {label:'导出json数据',icon:'tab-FileDownload',shortcut:'', handler:command.undo},
    {label:'预览',icon:'tab-Devices',shortcut:'', handler:command.undo},
]

watch(route,()=>{
  toggleToolbar();
})



const toggleToolbar = () => {
  const path = route.path.split('?')[0];
  showToolbar.value = path == '/editor';
}

(() => toggleToolbar())();
</script>
<style scoped lang="scss">
.tools {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .tool-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 8px 8px;
      margin-right: 30px;
      color: #4169e1;
      user-select: none;
      cursor: pointer;
    }
  }
</style>