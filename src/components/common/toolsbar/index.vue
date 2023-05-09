<template>
  <div class="tools" v-if="showToolbar">
    <el-tooltip :content="button.shortcut == '' ? `${button.label}` : `${button.label}(${button.shortcut})`"
      placement="bottom" effect="light" v-for="button in buttons">
      <div class="tool-btn" @click="button.handler()">
        <svg-icon :size="20" :name="button.icon" />
      </div>
    </el-tooltip>
  </div>
  <el-dialog v-model="dialogVisible" title="Tips" width="30%" draggable :modal="false" :close-on-click-modal="false">
    <monaco-edit
      ref="monacoEditRef"
      code="{console.log('123');console.log('456');}"
      :language="IMonacoLanguage.TypeScript"
      :readonly="readOnly"
    ></monaco-edit>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="()=> editToggle()">{{btnText}}</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts" name="ToolsBar">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import UseCommands from '@/utils/commands/UseCommands';
import monacoEdit from '@/components/monaco-edit/index.vue';
import { IMonacoLanguage } from '@/components/monaco-edit/model/model';

const dialogVisible = ref(false);
const readOnly = ref(true);
const btnText = ref('编辑');
const monacoEditRef = ref();
const editToggle = () => {
  readOnly.value = !readOnly.value;
  if(readOnly.value){
    btnText.value = '编辑';
  }else{
    btnText.value = '保存';
  }
}
const openDialog = () => {
  dialogVisible.value = true;
}
const closeDialog = () => {
  dialogVisible.value = false;
}

const route = useRoute();
const showToolbar = ref(false);
const useCommands = UseCommands.getInstance();
useCommands.assembl();
const command = {
  redo: () => useCommands.commands.redo(),
  undo: () => useCommands.commands.undo(),
  other: () => alert('正在努力开发中...')
}
const buttons = [
  { label: '保存', icon: 'tab-FileCheck', shortcut: 'ctrl+S', handler: command.other },
  { label: '复制', icon: 'tab-Files', shortcut: 'ctrl+C', handler: command.other },
  { label: '撤销', icon: 'tab-ArrowBackUp', shortcut: 'ctrl+Z', handler: command.undo },
  { label: '恢复', icon: 'tab-ArrowForwardUp', shortcut: 'ctrl+Y', handler: command.redo },
  { label: '清空', icon: 'tab-TrashX', shortcut: 'ctrl+Delete', handler: command.other },
  { label: '导入json数据', icon: 'tab-FileCode', shortcut: '', handler: command.other },
  { label: '导出json数据', icon: 'tab-FileDownload', shortcut: '', handler: ()=>openDialog() },
  { label: '预览', icon: 'tab-Devices', shortcut: '', handler: command.other },
]

watch(route, () => {
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