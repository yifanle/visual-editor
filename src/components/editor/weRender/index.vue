<template>
  <component :ref="setItemRef" class="render-item" v-for="item in dataRef.blocks" :key="item.id" :is="item.key" v-bind="item.props" :style="item.style">
    {{ item.slotContent }}
  </component>
</template>
<script setup lang="ts" name="WeRender">
import {ref, inject,onBeforeUpdate, onUpdated, computed } from 'vue';

const dataRef = inject('dataRef') as any;
const data = computed({
  get() {
    return dataRef.value;
  },
  set(newValue) {
    dataRef.value = newValue;
  }
});
let listDom:any[] = [];

onBeforeUpdate(() => {
  listDom = [];
}),
onUpdated(() => {
  for(let i=0; i<listDom.length; i++) {
    if(dataRef.value.blocks[i]?.alignCenter){
      console.log(i,listDom.length)
      const top = dataRef.value.blocks[i].style.top.split('px')[0];
      const left = dataRef.value.blocks[i].style.left.split('px')[0];
      dataRef.value.blocks[i].style.top = top - listDom[i].$el.offsetHeight/2 + 'px';
      dataRef.value.blocks[i].style.left = left - listDom[i].$el.offsetWidth/2 + 'px';
      dataRef.value.blocks[i].alignCenter = false;
    }
    
  }
})
const setItemRef = (el:any) => {
  listDom.push(el);
}
</script>
<style scoped lang="scss">
.render-item {
  position: absolute;
}
</style>