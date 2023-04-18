<template>
  <div :ref="setItemRef" @mouseleave="(e: any) => onMouseLeave(e, item)" @mouseenter="(e: any) => onMouseEnter(e, item)"
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
import IDragState from '@/interface/IDragState';
import { computed, inject, onBeforeUpdate, onUpdated } from 'vue';


const dataRef = inject('dataRef') as any;

const blocks = computed(() => dataRef.value.blocks);

let listDom: any[] = [];
let dragState:IDragState;

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

const onMouseMove = (e:any) => {
  let { clientX: moveX, clientY: moveY } = e;
  let durX = moveX - dragState.startX;
  let durY = moveY - dragState.startY;
  
  useFocus.focusData.value.focus.forEach((item, index) => {
    item.style.top = dragState.startPos[index].top + durY + 'px';
    item.style.left = dragState.startPos[index].left + durX + 'px';
  })
  useFocus.disableFocus();

}

const onMouseUp = (e:any) => {
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
}

const useFocus = new UseFocus(blocks, (e:any)=>{
  dragState = {
    startX: e.clientX,
    startY: e.clientY,
    startPos: useFocus.focusData.value.focus.map(({style}) => {
      return {
        top: parseInt(style.top.split('px')[0]),
        left: parseInt(style.left.split('px')[0]),
      }
    })
  }
  console.log(dragState)
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

const setItemRef = (el: any) => {
  listDom.push(el);
}

// 用于container点击时，清除所有选中状态
EmitterUtil.register('clearFocus', useFocus.clearFocus);


const onMouseEnter = (e: any, item: any) => {
  if (item.focus) return;
  item.hover = true;
}

const onMouseLeave = (e: any, item: any) => {
  item.hover = false;
}
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