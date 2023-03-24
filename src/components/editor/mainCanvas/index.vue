<template>
  <div class="main-canvas">
    <div class="container" :style="container">

    </div>
  </div>
</template>
<script setup lang="ts" name="MainCanvas">
  import { defineProps } from 'vue'
  const props = defineProps({
    data: {
      type: Object,
      required: true
    }
  })
  const { container } = props.data;
  console.log(container)
</script>
<style scoped lang="scss">
  .main-canvas {
    height: 100%;
    background: radial-gradient(rgba(204, 209, 216, 0.3),#eeeeec );
    position: relative;

    .container {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      border-radius: 5px;
      position: absolute;
    }
  }
</style>