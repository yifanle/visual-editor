<template>
  <div class="materials" style="margin-top: 5px">
    <div class="materials-title">
      <text>组件区</text>
    </div>
    <el-tabs tab-position="left" style="height: calc(100vh - 100px)">
      <el-scrollbar height="calc(100vh - 100px)">

        <el-tab-pane class="tab-pane" v-for="{ group } in metadatas">
          <template #label>
            <div class="tabs-label">
              <svg-icon :name="group.icon" :size="18"></svg-icon>
              <span>{{ group.label }}</span>
            </div>
          </template>
          <div class="material-list">
            <div class="component" v-for="component in group.components" :key="component.id">
              <div class="preview">
                <component :is="component.key" v-bind="component.preview.props">
                  {{ component.preview.slotContent }}
                </component>
              </div>
              <div class="title">{{ component.title }}</div>
            </div>
          </div>

        </el-tab-pane>
        <el-tab-pane class="tab-pane">
          <template #label>
            <div class="tabs-label">
              <svg-icon name="tab-Components" :size="18"></svg-icon>
              <span>更多</span>
            </div>
          </template>
          <el-empty description="敬请期待" />

        </el-tab-pane>
      </el-scrollbar>

    </el-tabs>
  </div>
</template>
<script setup lang="ts" name="Materials">
import IMaterialsData from '@/interface/IMaterialsData';
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object
  },
})
const emit = defineEmits(['update:modelValue'])
const materials = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
});

const metadatas = computed(() => {
  return (materials.value as IMaterialsData).metadatas;
})
</script>
<style scoped lang="scss">
.materials {
  height: 100%;
  overflow: hidden;
  border-right: 1px solid #fff;

  .materials-title {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;

    text {
      color: #6b778c;
      font-size: 16px;
      font-weight: bold;
      letter-spacing: 1px;
    }
  }
  .tabs-label {
    height: 60px;
    width: 28px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .material-list {
    height: 100%;
    width: 100%;
    display: grid;
    padding: 5px;
    grid-template-columns: repeat(2, 110px);

    .component {
      height: 110px;
      border: 2px solid hsla(0,0%,62%,.24);
      border-radius: 2px;
      box-sizing: border-box;
      margin: 4px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      cursor: move;
      transition: border ease-in-out 0.3s;

      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: -1px;
        background: rgba(255, 255, 255, .2);
        z-index: 2;
      }
      &:hover {
        border: 2px solid var(--materials-color);
      }
      .preview {
        height: 85px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 4px;
      }

      .title {
        height: 25px;
        width: 100%;
        color: var(--font-color);
        text-align: center;
        background-color: hsla(0,0%,62%,.24);
      }
    }
  }

}
</style>