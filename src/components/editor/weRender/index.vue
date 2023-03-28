<template>
  <component class="render-item" v-for="item in dataRef.blocks" :key="item.id" :is="item.key" v-bind="item.props" :style="item.style">
    {{ item.slotContent }}
  </component>
</template>
<script setup lang="ts" name="WeRender">
import IDataModel from '@/interface/IDataModel';
import {ref, inject } from 'vue';

const dataRef = inject('dataRef') as IDataModel;
</script>
<style scoped lang="scss">
.render-item {
  position: absolute;
}
</style>