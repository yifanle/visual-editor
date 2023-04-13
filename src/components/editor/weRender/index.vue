<template>
  <div :ref="setItemRef" @mousedown.stop="(e:any) => onMouseDown(e,i)" class="render-item" :class="item.focus ? 'render-item__focus':''" v-for="item,i in dataRef.blocks" :key="item.id" :style="item.style">
    <component :is="item.key" v-bind="item.props" >
      {{ item.slotContent }}
    </component>
  </div>
  
</template>
<script setup lang="ts" name="WeRender">
import {inject,onBeforeUpdate, onUpdated } from 'vue';

const dataRef = inject('dataRef') as any;

let listDom:any[] = [];

onBeforeUpdate(() => {
  listDom = [];
}),
onUpdated(() => {
  for(let i=0; i<listDom.length; i++) {
    if(dataRef.value.blocks[i]?.alignCenter){
      const top = dataRef.value.blocks[i].style.top.split('px')[0];
      const left = dataRef.value.blocks[i].style.left.split('px')[0];
      dataRef.value.blocks[i].style.top = top - listDom[i].offsetHeight/2 + 'px';
      dataRef.value.blocks[i].style.left = left - listDom[i].offsetWidth/2 + 'px';
      dataRef.value.blocks[i].alignCenter = false;
      dataRef.value.blocks[i].focus = false;
    }
    
  }
})
const setItemRef = (el:any) => {
  listDom.push(el);
}

const onMouseDown = (e:any , index: number) => {
  e.stopPropagation();
  e.preventDefault();
  dataRef.value.blocks[index].focus = true;
}
</script>
<style scoped lang="scss">
.render-item {
  position: absolute;
  &::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
  }
}

.render-item__focus {
  &::after {
    border: 2px dotted #409eff;
    background-color: rgba(12, 138, 255, 0.1);
  }
}
</style>