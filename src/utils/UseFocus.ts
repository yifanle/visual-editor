import { computed } from "vue";

export default class UseFocus {
  private blocks: any;
  private callback: Function;

  public focusData = computed(() => {
    let focus:any[] = [];
    let unfocus:any[] = [];
    this.blocks.value.forEach((block:any) => block.focus ? focus.push(block) : unfocus.push(block));
    return {
      focus,
      unfocus
    }
  });

  private focusable: boolean = true;

  constructor(blocks:any, callback: Function) {
    this.blocks = blocks;
    this.callback = callback;
  }

  clearFocus = () => {
    this.blocks.value.forEach((item: any) => {
      item.focus = false;
      item.hover = false;
    });
  }
  
  // 用于判断是否是连续点击
  disableFocus = () => {
    this.focusable = false;
  }

  onMouseEnter = (e: any, item: any) => {
    if (item.focus) return;
    item.hover = true;
  }
  
  onMouseLeave = (e: any, item: any) => {
    item.hover = false;
  }

  onMouseDown = (e: any, item: any) => {
    e.stopPropagation();
    e.preventDefault();
    let { focus } = this.focusData.value;
    if (e.shiftKey) {
      item.focus = !item.focus;
    } else {
      if (!item.focus) {
        this.clearFocus();
        item.focus = true;
        this.disableFocus();
      } else {
        // todo: 存在连续点击与拖拽切换的问题
        if(!this.focusable){
          this.focusable = true;
        }else {
          if (focus.length >= 2) {
            this.clearFocus();
            item.focus = true;
            return;
          }
          item.focus = false;
        }
      }
      
      
    }
    this.callback(e);
  }

}