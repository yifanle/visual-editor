export default interface IRenderItem {
  id: string;
  key: string;
  style: Object;
  props?: Object;
  slotContent?: string;
}