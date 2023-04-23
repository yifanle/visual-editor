<template>
  

  <div class="viewContainer">
    <div class="ruler horizontal">
      <Guides
        ref="horizontalGuides"
        type="horizontal"
        displayDragPos="true"
        :dragPosFormat="(pos:any)=> `${pos}px`"
        v-bind:rulerStyle="{
          left: '30px',
          width: 'calc(100% - 30px)',
          height: '30px',
        }"
      />
    </div>
    <div class="ruler vertical">
      <Guides
        ref="verticalGuides"
        type="vertical"
        displayDragPos="true"
        :dragPosFormat="(pos:any)=> `${pos}px`"
        v-bind:rulerStyle="{
          top: '30px',
          height: 'calc(100% - 30px)',
          width: '30px',
        }"
        v-on:changeGuides="onChange"
      />
    </div>
    <vue-infinite-viewer ref="viewer"
     :useMouseDrag="true"
     :useAutoZoom="true" 
     :useWheelScroll="true"
     :zoomRange="[0.1, 10]"
     :maxPinchWheel=10
     v-on:scroll="(e:any) => viewerScroll(e)"
     v-on:pinch="(e:any) => pinch(e)"
     class="viewer">
      <div class="viewport" >
        <el-scrollbar  :height="600">
          <div class="content"></div>
        </el-scrollbar>
      </div>
    </vue-infinite-viewer>
  </div>

</template>
<script setup lang="ts">
import { ref, onMounted,onUpdated, onUnmounted,computed,watch } from 'vue';
import { VueInfiniteViewer } from 'vue3-infinite-viewer';
import Guides from 'vue3-guides';

const horizontalGuides = ref();
const verticalGuides = ref();
const viewer = ref();

const viewerScroll = (e:any) => {
  const zoom = viewer.value.getZoom();
  horizontalGuides.value.scroll(e.scrollLeft, zoom);
  horizontalGuides.value.scrollGuides(e.scrollTop, zoom);

  verticalGuides.value.scroll(e.scrollTop, zoom);
  verticalGuides.value.scrollGuides(e.scrollLeft, zoom);
}
const pinch = (e:any) => {
  // console.log(horizontalGuides.value)
  // const zoom = Math.max(0.1, e.zoom);
  const zoom = viewer.value.getZoom();
  horizontalGuides.value.zoomTo(zoom);

  verticalGuides.value.zoomTo(zoom);
}

function onChange(e:any) {
  console.log(e.guides);
}
onMounted(() => {
  // viewer.value.infiniteViewer.on('click', pinch);
});

</script>

<style lang="scss">
.viewContainer {
  position: relative;
  height: 100vh;
  margin: 0;
  padding: 0;
  .viewer {
  position: relative;
  top: 30px;
  left: 30px;
  height: calc(100vh - 30px);
  width: calc(100vw - 30px);
  overflow: hidden;
}
.viewport {
  position: absolute;
  top: calc(50% - 300px);
  left: calc(50% - 200px);
  width: 400px;
  height: 600px;
  background: #f55;
  .content {
    height: 10000px;
  }
}
.ruler {
  position: absolute;
  top: 0;
  left: 0;
  transform: translateZ(1px);
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