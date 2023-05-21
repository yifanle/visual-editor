<template>
  <div class="menu">
    <div class="menu-item">
      <svg-icon color="#4169e1" class="menu-item-icon" :size="20" name="tab-BoxMultiple" />
      <div class="menu-item-text">向上一层</div>
    </div>
    <div class="menu-item">
      <svg-icon color="#4169e1" :size="20" name="tab-SquaresFilled" />
      <div class="menu-item-text">向下一层</div>
    </div>
    <div class="menu-item">
      <svg-icon color="#4169e1" :size="20" name="tab-LayoutAlignTop" />
      <div class="menu-item-text">置顶</div>
    </div>
    <div class="menu-item">
      <svg-icon color="#4169e1" :size="20" name="tab-LayoutAlignBottom" />
      <div class="menu-item-text">置底</div>
    </div>
  </div>
</template>
<script setup lang="ts" name="Menu">
</script>
<style lang="scss">
.menu {
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 10086;
    padding: 5px 5px;
    .menu-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;
      padding: 2px 6px;
      border-radius: 5px;
      cursor: pointer;
      &:hover {
        background-color: #f0f0f0;
      }
      &:last-child {
        margin-bottom: 0;
      }
      &-text {
        flex: 1;
        margin-left: 8px;
        text-align:justify;
        text-justify:distribute-all-lines;
        text-align-last:justify;
      }
    }
  }
</style>