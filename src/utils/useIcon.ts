import { defineAsyncComponent } from "vue";
import type { App } from "vue";
import * as ele from '@element-plus/icons-vue';
import * as tab from '@vicons/tabler';
import * as fluent from '@vicons/fluent';
import { Icon, IconConfigProvider } from '@vicons/utils'


const SvgIcon = defineAsyncComponent(() => import('@/components/svgIcon/index.vue'));

// 全局注册图标及图标相关组件
export function useIcon(app: App) {
  const eleIcons = ele as any;
  const tabIcons = tab as any;
  const fluentIcons = fluent as any;
  // 注册element-plus的图标
  for(const i in eleIcons) {
    const name = `ele-${eleIcons[i].name}`;
    app.component(name, eleIcons[i]);
  }
  // 注册xicons tabler的图标
  for(const i in tabIcons) {
    const name = `tab-${tabIcons[i].name}`;
    app.component(name, tabIcons[i]);
  }
  // 注册xicons fluent的图标
  for(const i in fluentIcons) {
    const name = `flu-${fluentIcons[i].name}`;
    app.component(name, fluentIcons[i]);
  }

  // 注册xicons utils组件
  app.component('Icon', Icon);
  app.component('IconConfigProvider', IconConfigProvider);
  // 注册自定义的svg组件
  app.component('SvgIcon', SvgIcon);
}