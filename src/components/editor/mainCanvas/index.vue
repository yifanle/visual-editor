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
    background: radial-gradient(rgba(204, 209, 216, 0.3),#eeeeec );
    position: relative;

    .container {
      height: 800px;
      width: 390px;
      background-color: #fff;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      border-radius: 5px;
      position: absolute;
      top: 50%;
      left: 75%;
      transform: translate(-75%, -50%);
    }
  }
</style>