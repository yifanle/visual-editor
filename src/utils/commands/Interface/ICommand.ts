export default interface ICommand {
  name: string;
  keyboard?: string;
  pushQueue?: boolean;
  init?: () => Function;
  execute: (data?:any) => any;
}