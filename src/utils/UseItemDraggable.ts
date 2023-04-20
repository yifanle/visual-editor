import IDragState ,{ ILines } from "@/interface/IDragState";
import type {ComputedRef} from "vue";
import { reactive } from "vue";

export default class UseItemDraggable {
  private dragState:IDragState;
  private focusData:any;
  private container:any;
  public markLine = reactive({
    x: -1,
    y: -1
  });
  constructor(focusData:any,container:any) {
    this.focusData = focusData;
    this.container = container;
    this.dragState = {
      startX: 0,
      startY: 0,
      startLeft: 0,
      startTop: 0,
      startPos: [],
      lines: {x:[],y:[]}
    }
  }

  private onMouseMove = (e:any) => {
    let { clientX: moveX, clientY: moveY } = e;
    let y=-1,x=-1; // 用于存放辅助线的位置
    // 先计算出最后一个选中的元素的位置
    let left = moveX - this.dragState.startX + this.dragState.startLeft;
    let top = moveY - this.dragState.startY + this.dragState.startTop;
    // 根据算出的最后一个园中元素的位置与触发辅助线的10中情况比较
    for(let i = 0 ; i < this.dragState.lines.y.length ; i++) {
      const { top: t, showTop: s} = this.dragState.lines.y[i];
      if (Math.abs(top - t) < 5) {
        y = s;
        if(!e.altKey) {
          // 吸附效果:让durY直接跳5像素
          moveY = this.dragState.startY + t - this.dragState.startTop;
        }
        break;
      }
    }
    for(let i = 0 ; i < this.dragState.lines.x.length ; i++) {
      const { left: l, showLeft: s} = this.dragState.lines.x[i];
      if (Math.abs(left - l) < 5) {
        x = s;
        if(!e.altKey) {
          // 吸附效果:让durY直接跳5像素
          moveX = this.dragState.startX + l - this.dragState.startLeft;
        }
        break;
      }
    }
    this.markLine.x = x;
    this.markLine.y = y;

    let durX = moveX - this.dragState.startX;
    let durY = moveY - this.dragState.startY;
    
    this.focusData.value.focus.forEach((item:any, index:number) => {
      item.style.top = this.dragState.startPos[index].top + durY + 'px';
      item.style.left = this.dragState.startPos[index].left + durX + 'px';
    })
  }
  
  private onMouseUp = (e:any) => {
    this.markLine.x = -1;
    this.markLine.y = -1;
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }
  
  public onMouseDown = (e:any,lastSelectItem:ComputedRef<any>) => {

    const {left,top,width,height } = lastSelectItem.value.style;
    const BWidth = parseInt(width.split('px')[0]);
    const BHeight = parseInt(height.split('px')[0]);

    this.dragState = {
      startX: e.clientX,
      startY: e.clientY,
      startLeft: parseInt(left.split('px')[0]),
      startTop: parseInt(top.split('px')[0]),
      startPos: this.focusData.value.focus.map(({ style }:any) => {
        return {
          top: parseInt(style.top.split('px')[0]),
          left: parseInt(style.left.split('px')[0]),
        }
      }),
      lines: (():ILines => {
        const { unfocused }  = this.focusData.value;

        let lines:ILines = {x:[],y:[]}; // y存放的是横线的位置，x存放的是竖线的位置

        [...unfocused,{
          style: {
            top: '0px',
            left: '0px',
            width: this.container.width,
            height: this.container.height
          }
        }].forEach((item:any) => {
          const { left,top,width,height } = item.style;
          const ALeft = parseInt(left.split('px')[0]);
          const ATop = parseInt(top.split('px')[0]);
          const AWidth = parseInt(width.split('px')[0]);
          const AHeight = parseInt(height.split('px')[0]);
          // 横线出现的5中情况
          lines.y.push({ showTop: ATop, top: ATop});  //上对上
          lines.y.push({ showTop: ATop, top: ATop - BHeight}); //上对下 
          lines.y.push({ showTop: ATop + AHeight/2, top: ATop + AHeight/2 - BHeight/2});  //中对中
          lines.y.push({ showTop: ATop + AHeight, top: ATop + AHeight});  //下对下
          lines.y.push({ showTop: ATop + AHeight, top: ATop + AHeight - BHeight});  //下对上
          // 竖线出现的5中情况
          lines.x.push({ showLeft: ALeft, left: ALeft});  //左对左
          lines.x.push({ showLeft: ALeft, left: ALeft - BWidth}); //左对右
          lines.x.push({ showLeft: ALeft + AWidth/2, left: ALeft + AWidth/2 - BWidth/2});  //中对中
          lines.x.push({ showLeft: ALeft + AWidth, left: ALeft + AWidth - BWidth});  //右对右
          lines.x.push({ showLeft: ALeft + AWidth, left: ALeft + AWidth});  //右对左
        })
        return lines;
      })()
    }
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }
}