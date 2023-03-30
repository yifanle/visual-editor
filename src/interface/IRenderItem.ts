export default interface IRenderItem {
  id: string;
  key: string;
  style: any;
  props?: Object;
  slotContent?: string;
  alignCenter?: boolean;
}