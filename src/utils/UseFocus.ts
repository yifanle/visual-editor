import { computed, ref } from "vue";
import type {ComputedRef} from "vue";

export default class UseFocus {
  private blocks: any;
  private callback: Function;
  // 表示当前选中的元素的索引
  private selectIndex = ref(-1);

  focusData = computed(() => {
    let focus:any[] = [];
    let unfocused:any[] = [];
    this.blocks.value.forEach((block:any) => block.focus ? focus.push(block) : unfocused.push(block));
    return {
      focus,
      unfocused
    }
  });

  lastSelectItem:ComputedRef<any> = computed(() => this.blocks.value[this.selectIndex.value]);

  constructor(blocks:any, callback: Function) {
    this.blocks = blocks;
    this.callback = callback;
  }

  private clearFocus = () => {
    this.blocks.value.forEach((item: any) => {
      item.focus = false;
      item.hover = false;
    });
  }

  onContainerMouseDown =(e: any) => {
    this.clearFocus();
    this.selectIndex.value = -1;
  }

  onMouseEnter = (e: any, item: any) => {
    if (item.focus) return;
    item.hover = true;
  }
  
  onMouseLeave = (e: any, item: any) => {
    item.hover = false;
  }

  onMouseDown = (e: any, item: any, index:number) => {
    e.stopPropagation();
    e.preventDefault();
    let { focus } = this.focusData.value;
    if (e.shiftKey) {
      if(focus.length <= 1) {
        item.focus = true;
      } else {
        item.focus = !item.focus;
      }
    } else {
      if (!item.focus) {
        this.clearFocus();
        item.focus = true;
      } 
    }
    this.selectIndex.value = index;
    this.callback(e);
  }

}