<template>
  <div :ref="setItemRef" @mouseleave="(e: any) => onMouseLeave(e, item)" @mouseenter="(e: any) => onMouseEnter(e, item)"
    @mousedown.stop="(e: any) => onMouseDown(e, item)" class="render-item" :class="item.focus ? 'render-item__focus' : ''"
    v-for="item in blocks" :key="item.id" :style="item.style">
    <component :class="item.hover ? 'render-item__hover' : ''" :is="item.key" v-bind="item.props">
      {{ item.slotContent }}
    </component>
  </div>
</template>
<script setup lang="ts" name="WeRender">
import { computed, inject, onBeforeUpdate, onUpdated } from 'vue';


const dataRef = inject('dataRef') as any;

const blocks = computed(() => dataRef.value.blocks);

let listDom: any[] = [];

onBeforeUpdate(() => {
  listDom = [];
}),
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
const clearFocus = () => {
  blocks.value.forEach((item: any) => {
    item.focus = false;
    item.hover = false;
  });
}

const setItemRef = (el: any) => {
  listDom.push(el);
}

const onMouseDown = (e: any, item: any) => {
  e.stopPropagation();
  e.preventDefault();
  if (e.shiftKey) {
    item.focus = !item.focus;
  } else {
    if (!item.focus) {
      clearFocus();
      item.focus = true;
    } else {
      item.focus = false;
    }
  }

}

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