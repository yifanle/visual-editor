<template>
  <div class="tools" v-if="showToolbar">
    <el-tooltip :content="button.shortcut == '' ? `${button.label}` : `${button.label}(${button.shortcut})`"
      placement="bottom" effect="light" v-for="button in buttons">
      <div class="tool-btn" @click="button.handler()">
        <svg-icon :size="20" :name="button.icon" />
      </div>
    </el-tooltip>
  </div>
  <el-dialog v-model="dialogVisible" title="编辑JsonSchema" width="30%" draggable :modal="false" :before-close="closeDialog"
    :close-on-click-modal="false">
    <monaco-edit ref="monacoEditRef" :code="jsonCode" :language="IMonacoLanguage.JSON" :readonly="readOnly"
      @onDidChangeModelContent="(codereturn) => onDidChangeModelContent(codereturn)"></monaco-edit>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="() => editToggle()">{{ btnText }}</el-button>
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
import { ElMessage, ElMessageBox, messageType } from 'element-plus'

const openBox = (content: string, title: string, type: string = 'warning', success: () => any, fail: () => any) => {
  ElMessageBox.confirm(
    content,
    title,
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: type as messageType,
    }
  )
    .then(success)
    .catch(fail)
}

const dialogVisible = ref(false);
const readOnly = ref(true);
const save = ref(false);
const btnText = ref('编辑');
// todo: unmounted时调用 monacoEditRef.value.dispose();
const monacoEditRef = ref();
let dataRef = ref();
let jsonCode = ref();
let before: any = null;

// 用于接受jsonSchema数据
EmitterUtil.register('setData', (data: any) => {
  dataRef = data;
  jsonCode.value = JSON.stringify(dataRef.value);
  useCommands.setData(dataRef);
})

// monaco编辑器内容改变回调
const onDidChangeModelContent = (codereturn: any) => {
  jsonCode.value = codereturn;
  dataRef.value = JSON.parse(jsonCode.value);
}

// 切换编辑状态
const editToggle = () => {
  readOnly.value = !readOnly.value;
  // 用于标记是否保存
  save.value = false;
  if (readOnly.value) {
    btnText.value = '编辑';
    save.value = true;
    dataRef.value = before;
    // 保存更新画布，并将操作防止命令栈中
    useCommands.commands.updateCanvas(JSON.parse(jsonCode.value))
  } else {
    btnText.value = '保存';
  }
}
const openDialog = () => {
  dialogVisible.value = true;
  jsonCode.value = JSON.stringify(dataRef.value);
  // 记录当前数据，用于未保存时恢复数据
  before = dataRef.value;
}
const closeDialog = () => {
  // 如果没保存，在关闭对话框时恢复数据
  if (!save.value)
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
  {
    label: '清空', icon: 'tab-TrashX', shortcut: 'ctrl+Delete', handler: () => openBox('是否确认清空画布？', '确认', 'warning', () => {
      ElMessage({
        type: 'success',
        message: '清空成功',
        duration: 1500
      })
    }, () => {
      ElMessage({
        type: 'success',
        message: '已取消！',
        duration: 1500
      })
    })
  },
  { label: '查看json数据', icon: 'tab-FileCode', shortcut: '', handler: () => openDialog() },
  { label: '预览', icon: 'tab-Devices', shortcut: '', handler: command.other },
]

watch(route, () => {
  // 当路由变化时，判断是否显示工具栏
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