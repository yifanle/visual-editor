export default interface ICommand {
  name: string;
  executeMethods: string[];
  keyboard?: string;
  pushQueue?: boolean;
  init?: () => Function;
  execute: (data?:any) => any;
}