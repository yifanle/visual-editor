<template>
    <el-container>
      <el-aside class="left-materials" :class="isCollapse ? 'hide':'show'">
          <div class="collapse-btn" @click="()=> isCollapse = !isCollapse">
              <svg-icon v-if="!isCollapse" name="tab-CaretLeft" :size="18" />
              <svg-icon v-else name="tab-CaretRight" :size="18" />
          </div>
          <materials v-model="materials" v-if="!isCollapse"/>
      </el-aside>
      <el-main>
          <InfiniteViewerTest >
            <div class="viewport">
                <el-scrollbar :height="600">
                    <div class="content"></div>
                </el-scrollbar>
            </div>
          </InfiniteViewerTest>
      </el-main>
      <el-aside>
          <config-area />
      </el-aside>
    </el-container>
  </template>
  <script setup lang="ts">
  import Materials from '@/components/editor/materials/index.vue'
  import MainCanvas from '@/components/editor/mainCanvas/index.vue'
  import ConfigArea from '@/components/editor/configArea/index.vue'
  import InfiniteViewerTest from '@/pages/test/infiniteViewerTest.vue'

  import data from '@/mock/data.json'
  import materialsData from '@/mock/materials.json'


  import { provide, ref } from 'vue'

  import IDataModel from '@/interface/IDataModel'
  import { IMaterialsData } from '@/interface/IMaterialsData'
  // 用于控制左侧面板的折叠
  const isCollapse = ref(false)
  // 读取的渲染的模型数据
  const state:IDataModel = ref(data).value;
  const materials: IMaterialsData = ref(materialsData).value;

  // 如何在materials组件中为mainCanvas组件绑定事件？

  </script>
  <style scoped lang="scss">
  $collapseBtnWidth: 20px;

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

  .left-materials {
      overflow: unset;
      position: relative;
      .collapse-btn {
          $height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          width: $collapseBtnWidth;
          height: $height;
          border-radius: 5px;
          z-index: 2;
          background-color: #fff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          right: calc($collapseBtnWidth / -2);
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          transition: all 0.5s;
          &:hover {
              background-color: #ececec;
          }
      }
  }
  .hide {
    width: 0;
    transition: width 0.5s;
  }
  .show {
    width: 300px;
    transition: width 0.5s;
  }
  </style>