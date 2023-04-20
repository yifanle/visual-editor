<template>
  <div class="main-canvas">
    <div ref="canvasContainer" @mousedown="containerMouseDown()" class="container" :style="dataRef.container">
      <el-scrollbar :height="dataRef.container.height">
        <we-render ref="renderItem"></we-render>
      </el-scrollbar>
    </div>
  </div>
</template>
<script setup lang="ts" name="MainCanvas">
import WeRender from '@/components/editor/weRender/index.vue'
import {provide, computed,ref,onMounted, onUnmounted, watch} from 'vue';
import EmitterUtil from '@/utils/EmitterUtil';
import deepcopy from 'deepcopy';
import UseMenuDraggable from '@/utils/UseMenuDraggable'
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

watch(data, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    console.log('data changed:',data.value)
  }
},
{ deep: true });

// 注册一个组件区的拖拽事件监听
const canvasContainer = ref();
const draggable = new UseMenuDraggable(canvasContainer,data);

EmitterUtil.register('ondragstart', (data:any) => {
  const component = data as IMaterialsComponent;
  draggable.setCurrentComponent(component);
  // 为container注册拖拽监听事件
  draggable.onDragstart();
});
EmitterUtil.register('ondragend',() => {
  draggable.onDragend();
})

const containerMouseDown = () => {
  EmitterUtil.emit('containerMouseDown',null);
}

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