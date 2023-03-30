<template>
  <div class="main-canvas">
    <div ref="canvasContainer" class="container" :style="dataRef.container">
      <el-scrollbar :height="dataRef.container.height">
        <we-render ref="renderItem"></we-render>
      </el-scrollbar>
    </div>
  </div>
</template>
<script setup lang="ts" name="MainCanvas">
import WeRender from '@/components/editor/weRender/index.vue'
import {provide, computed,ref,onMounted, onUnmounted} from 'vue';
import EmitterUtil from '@/utils/EmitterUtil';
import deepcopy from 'deepcopy';
import { IMaterialsComponent } from '@/interface/IMaterialsData';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  }
});
const emit = defineEmits(['update:modelValue']);
const dataRef = ref(props.modelValue);
provide('dataRef', dataRef);

let data = computed({
  get() {
    return dataRef.value; 
  },
  set(newValue) {
    dataRef.value = newValue;
    emit('update:modelValue', deepcopy(newValue));
  }
});
// 注册一个组件区的拖拽事件监听
const canvasContainer = ref();
let currentComponent:IMaterialsComponent = {} as IMaterialsComponent;
const dragenter = (e:any) => {
  e.dataTransfer.dropEffect = 'move';
}

const dragover = (e:any) => {
  e.preventDefault();
}

const dragleave = (e:any) => {
  e.dataTransfer.dropEffect = 'none';
}

const drop = (e:any) => {
  let blocks = data.value.blocks;
  data.value = {
    ...data.value,
    blocks: [
      ...blocks,
      {
        id: currentComponent.id + new Date().getTime(),
        key: currentComponent.key,
        props: currentComponent.render.props,
        style: {
          top: e.offsetY+'px',
          left: e.offsetX+'px',
          "z-index": 1
        },
        slotContent: currentComponent.render.slotContent,
        alignCenter: true
      }
    ]
  }
  currentComponent = {} as IMaterialsComponent;
}
const onDragstart = () => {
  canvasContainer.value.addEventListener('dragenter', dragenter);
  canvasContainer.value.addEventListener('dragover', dragover);
  canvasContainer.value.addEventListener('dragleave', dragleave);
  canvasContainer.value.addEventListener('drop', drop);
}
const onDragend = () => {
  canvasContainer.value.removeEventListener('dragenter', dragenter);
  canvasContainer.value.removeEventListener('dragover', dragenter);
  canvasContainer.value.removeEventListener('dragleave', dragenter);
  canvasContainer.value.removeEventListener('drop', dragenter);
}

EmitterUtil.register('ondragstart', (data:any) => {
  const component = data as IMaterialsComponent;
  currentComponent = component;
  // 为container注册拖拽监听事件
  onDragstart();
});
EmitterUtil.register('ondragend',() => {
  onDragend();
})



onUnmounted(() => {
  EmitterUtil.destroy(['ondragstart','ondragend'],null);
});


</script>
<style scoped lang="scss">
.main-canvas {
  height: 100%;
  background-image: radial-gradient(circle, #e9e9e9, #ededed, #f1f1f1, #f5f5f5, #f9f9f9);
  position: relative;

  .container {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    border-radius: 5px;
    position: absolute;
    overflow: hidden;
  }

  .render-item {
    position: absolute;
  }
}
</style>