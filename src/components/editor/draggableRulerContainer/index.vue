<template>
  <div class="viewContainer">
    <div class = "box"></div>
    <div class="ruler horizontal">
      <Guides ref="horizontalGuides" backgroundColor="#F5F5F5" textColor="#ccc" lineColor="#ccc" type="horizontal" displayDragPos="true" :dragPosFormat="(pos: any) => `${pos}px`"
        v-bind:rulerStyle="{
            left: '30px',
            width: 'calc(100% - 30px)',
            height: '30px',
          }" />
    </div>
    <div class="ruler vertical">
      <Guides ref="verticalGuides" backgroundColor="#F5F5F5" textColor="#ccc" lineColor="#ccc" type="vertical" displayDragPos="true" :dragPosFormat="(pos: any) => `${pos}px`"
        v-bind:rulerStyle="{
            top: '30px',
            height: 'calc(100% - 30px)',
            width: '30px',
          }" />
    </div>
    <vue-infinite-viewer ref="viewer" :useMouseDrag="true" :useAutoZoom="false" :useWheelScroll="true" v-on:scroll="(e: any) => viewerScroll(e)" class="viewer">
      <slot></slot>
    </vue-infinite-viewer>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const horizontalGuides = ref();
const verticalGuides = ref();
const viewer = ref();

const viewerScroll = (e: any) => {
  const zoom = viewer.value.getZoom();
  horizontalGuides.value.scroll(e.scrollLeft, zoom);
  horizontalGuides.value.scrollGuides(e.scrollTop, zoom);

  verticalGuides.value.scroll(e.scrollTop, zoom);
  verticalGuides.value.scrollGuides(e.scrollLeft, zoom);
}

</script>

<style lang="scss">
.viewContainer {
  position: relative;
  height: calc(100% - 5px);
  margin-top: 5px;
  padding: 0;
  .box {
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 30px;
    background-color: #F5F5F5;
    cursor: pointer;
  }
  .viewer {
    position: relative;
    top: 30px;
    left: 30px;
    height: calc(100% - 30px);
    width: calc(100% - 30px);
    background-color: #f7f7f7;
    overflow: hidden;
  }



  .ruler {
    position: absolute;
    top: 0;
    left: 0;
  }

  .ruler.horizontal {
    left: 0px;
    width: 100%;
    height: 30px;
  }

  .ruler.vertical {
    top: 0px;
    width: 30px;
    height: 100%;
  }
}
</style>