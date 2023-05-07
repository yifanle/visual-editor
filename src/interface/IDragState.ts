export default interface IDragState {
  // 鼠标起始位置
  startX: number;
  startY: number;
  // 最后一个选中元素的起始位置
  startLeft: number;
  startTop: number;
  // 选中元素起始位置
  startPos: {
    top: number;
    left: number;
  }[];
  dragging: boolean;
  lines: ILines;
}

/**
 * @description: 用于存放对齐线的位置
 * @param {x: {showTop: number; top: number;}[]} x存放的是竖线的位置
 * @param {showLeft: number} showLeft表示的是辅助线将要展示的位置
 * @param {left: number} left表示的是用于比较的位置
 * @param {y: {showTop: number; top: number;}[]} y存放的是横线的位置
 * @param {showTop: number} showTop表示的是辅助线将要展示的位置
 * @param {top: number} top表示的是用于比较的位置
 */
export interface ILines {
  x: {
    showLeft: number;
    left: number;
  }[];
  y: {
    showTop: number;
    top: number;
  }[];
}