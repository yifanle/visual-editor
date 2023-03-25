<template>
  <component class="render-item" v-for="item in blocks" key="item.id" :is="item.key" v-bind="item.props" :style="item.style">
    text
  </component>
</template>
<script setup lang="ts" name="WeRender">
import IRenderItem from '@/interface/IRenderItem'
import { inject } from 'vue';

const blocks = inject('blocks') as IRenderItem[];

console.log(blocks)

</script>
<style scoped lang="scss">
.render-item {
  position: absolute;
}
</style>