<template>
  <div class="main-canvas">
    <div class="container">
      
    </div>
  </div>
</template>
<script setup lang="ts" name="MainCanvas"></script>
<style scoped lang="scss">
  .main-canvas {
    height: 100%;
    background-color: #ddd;
    position: relative;
    
    .container {
      height: 844px;
      width: 390px;
      background-color: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>