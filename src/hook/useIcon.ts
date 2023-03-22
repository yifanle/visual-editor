import { defineAsyncComponent } from "vue";
import type { App } from "vue";
import * as ele from '@element-plus/icons-vue';
import * as tab from '@vicons/tabler'

const SvgIcon = defineAsyncComponent(() => import('@/components/svgIcon/index.vue'));

export function useIcon(app: App) {
  const eleIcons = ele as any;
  const tabIcons = tab as any;
  for(const i in eleIcons) {
    const name = `ele-${eleIcons[i].name}`;
    app.component(name, eleIcons[i]);
  }
  for(const i in tabIcons) {
    const name = `tab-${tabIcons[i].name}`;
    console.log(name)
    app.component(name, tabIcons[i]);
  }
  app.component('SvgIcon', SvgIcon);
}