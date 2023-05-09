<template>
  <div :ref="setItemRef" @mouseleave="(e: any) => useFocus.onMouseLeave(e, item)" @mouseenter="(e: any) => useFocus.onMouseEnter(e, item)"
    @mousedown.stop="(e: any) => useFocus.onMouseDown(e, item, i)" class="render-item" :class="item.focus ? 'render-item__focus' : ''"
    v-for="item,i in blocks" :key="item.id" :style="item.style">
    <component class="render-item_inner" :class="item.hover ? 'render-item__hover' : ''" :is="item.key" v-bind="item.props">
      {{ item.slotContent }}
    </component>
  </div>
  <div v-if="useItemDraggable.markLine.x > 0" class="line-x" :style="{left: useItemDraggable.markLine.x + 'px'}"></div>
  <div v-if="useItemDraggable.markLine.y > 0" class="line-y" :style="{top: useItemDraggable.markLine.y + 'px'}"></div>
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
      
    }
    if(blocks.value[i]?.focus == undefined || blocks.value[i]?.hover == undefined) {
      if(!blocks.value[i]) return;
      blocks.value[i].focus = false;
      blocks.value[i].hover = false;
    }
    blocks.value[i].style.width = listDom[i].offsetWidth + 'px';
    blocks.value[i].style.height = listDom[i].offsetHeight + 'px';
  }
})


const useFocus = new UseFocus(blocks, (e:any)=>{
  useItemDraggable.onMouseDown(e, useFocus.lastSelectItem);
});

const useItemDraggable = new UseItemDraggable(useFocus.focusData,dataRef.value.container);

// 用于container点击时，清除所有选中状态
EmitterUtil.register('containerMouseDown', useFocus.onContainerMouseDown);

</script>
<style scoped lang="scss">
.line-y {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  border-top: 2px dotted #4169e1;
  z-index: 10;
}

.line-x {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  border-left: 2px dotted #4169e1;
  z-index: 10;
}

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
.render-item_inner {
  width: 100%;
  height: 100%;
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