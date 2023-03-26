<template>
  <div class="main-canvas">
    <div class="container" :style="container">
      <el-scrollbar :height="container.height">
        <we-render></we-render>
      </el-scrollbar>
    </div>
  </div>
</template>
<script setup lang="ts" name="MainCanvas">
import WeRender from '@/components/editor/weRender/index.vue'
import { computed, inject } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  }
});
const emit = defineEmits(['update:modelValue']);
const container = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  }
});
console.log(container.value)
</script>
<style scoped lang="scss">
.main-canvas {
  height: 100%;
  background: radial-gradient(rgba(204, 209, 216, 0.3), #eeeeec);
  position: relative;

  .container {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    border-radius: 5px;
    position: absolute;
    overflow: hidden;
  }
}
</style>