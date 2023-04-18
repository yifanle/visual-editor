export default interface IDragState {
  // 鼠标起始位置
  startX: number;
  startY: number;
  // 选中元素起始位置
  startPos: {
    top: number;
    left: number;
  }[];
}