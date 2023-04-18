<template>
  <div :ref="setItemRef" @mouseleave="(e: any) => useFocus.onMouseLeave(e, item)" @mouseenter="(e: any) => useFocus.onMouseEnter(e, item)"
    @mousedown.stop="(e: any) => useFocus.onMouseDown(e, item)" class="render-item" :class="item.focus ? 'render-item__focus' : ''"
    v-for="item in blocks" :key="item.id" :style="item.style">
    <component :class="item.hover ? 'render-item__hover' : ''" :is="item.key" v-bind="item.props">
      {{ item.slotContent }}
    </component>
  </div>
</template>
<script setup lang="ts" name="WeRender">
import EmitterUtil from '@/utils/EmitterUtil';
import UseFocus from '@/utils/UseFocus';
import UseItemDraggable from '@/utils/UseItemDraggable'
import { computed, inject, onBeforeUpdate, onUpdated } from 'vue';


const dataRef = inject('dataRef') as any;

const blocks = computed(() => dataRef.value.blocks);

let listDom: any[] = [];

const setItemRef = (el: any) => {
  listDom.push(el);
}

onBeforeUpdate(() => {
  listDom = [];
})
onUpdated(() => {
  for (let i = 0; i < listDom.length; i++) {
    if (dataRef.value.blocks[i]?.alignCenter) {
      const top = blocks.value[i].style.top.split('px')[0];
      const left = blocks.value[i].style.left.split('px')[0];
      blocks.value[i].style.top = top - listDom[i].offsetHeight / 2 + 'px';
      blocks.value[i].style.left = left - listDom[i].offsetWidth / 2 + 'px';
      blocks.value[i].alignCenter = false;
      blocks.value[i].focus = false;
      blocks.value[i].hover = false;
    }

  }
})


const useFocus = new UseFocus(blocks, (e:any)=>{
  useItemDraggable.onMouseDown(e);
});

const useItemDraggable = new UseItemDraggable(useFocus.focusData, (e:any) => {
  useFocus.disableFocus();
})

// 用于container点击时，清除所有选中状态
EmitterUtil.register('clearFocus', useFocus.clearFocus);

</script>
<style scoped lang="scss">
.render-item {
  position: absolute;

  &::after {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;

  }
}

.render-item__focus {
  &::after {
    border: 2px solid #66b2fd;
    background-color: rgba(12, 138, 255, 0.1);
  }
}

.render-item__hover {
  &::after {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    border: 2px solid #66b2fd;
  }
}
</style>