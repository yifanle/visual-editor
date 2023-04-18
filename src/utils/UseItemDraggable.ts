import IDragState from "@/interface/IDragState";

export default class UseItemDraggable {
  private dragState:IDragState;
  private focusData:any;
  private callback:Function
  constructor(focusData:any,callback:Function) {
    this.focusData = focusData;
    this.callback = callback;
    this.dragState = {
      startX: 0,
      startY: 0,
      startPos: []
    }
  }

  private onMouseMove = (e:any) => {
    let { clientX: moveX, clientY: moveY } = e;
    let durX = moveX - this.dragState.startX;
    let durY = moveY - this.dragState.startY;
    
    this.focusData.value.focus.forEach((item:any, index:number) => {
      item.style.top = this.dragState.startPos[index].top + durY + 'px';
      item.style.left = this.dragState.startPos[index].left + durX + 'px';
    })
      this.callback();
  }
  
  private onMouseUp = (e:any) => {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }
  
  public onMouseDown = (e:any,callback?:Function) => {
    this.dragState = {
      startX: e.clientX,
      startY: e.clientY,
      startPos: this.focusData.value.focus.map(({ style }:any) => {
        return {
          top: parseInt(style.top.split('px')[0]),
          left: parseInt(style.left.split('px')[0]),
        }
      })
    }
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }
}