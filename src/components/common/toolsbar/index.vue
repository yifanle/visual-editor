<template>
  <div class="tools" v-if="showToolbar">
    <el-tooltip :content="button.shortcut == '' ? `${button.label}` : `${button.label}(${button.shortcut})`"
      placement="bottom" effect="light" v-for="button in buttons">
      <div class="tool-btn" @click="button.handler()">
        <svg-icon :size="20" :name="button.icon" />
      </div>
    </el-tooltip>
  </div>
  <el-dialog v-model="dialogVisible" title="编辑JsonSchema" width="30%" draggable :modal="false" :before-close="closeDialog" :close-on-click-modal="false">
    <monaco-edit
      ref="monacoEditRef"
      :code="jsonCode"
      :language="IMonacoLanguage.JSON"
      :readonly="readOnly"
      @onDidChangeModelContent="(codereturn) => onDidChangeModelContent(codereturn)"
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
import EmitterUtil from '@/utils/EmitterUtil';

const dialogVisible = ref(false);
const readOnly = ref(true);
const btnText = ref('编辑');
const monacoEditRef = ref();
let dataRef = ref();
let jsonCode = ref();
let before:any = null;

EmitterUtil.register('setData',(data:any)=> {
  dataRef = data;
  jsonCode.value = JSON.stringify(dataRef.value);
  useCommands.setData(dataRef);
})


const onDidChangeModelContent = (codereturn:any)=> {
  jsonCode.value = codereturn;
  dataRef.value = JSON.parse(jsonCode.value);
}

const editToggle = () => {
  readOnly.value = !readOnly.value;
  if(readOnly.value){
    btnText.value = '编辑';
    useCommands.commands.updateCanvas(JSON.parse(jsonCode.value))
  }else{
    btnText.value = '保存';
  }
}
const openDialog = () => {
  dialogVisible.value = true;
  jsonCode.value = JSON.stringify(dataRef.value);
  before = dataRef.value;
}
const closeDialog = () => {
  dataRef.value = before;
  dialogVisible.value = false;
  readOnly.value = true;
  btnText.value = '编辑';
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
  { label: '查看json数据', icon: 'tab-FileCode', shortcut: '', handler: ()=>openDialog() },
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