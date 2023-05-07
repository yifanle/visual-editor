import ICommand from "./interface/ICommand";
export default class Command implements ICommand {
  name: string;
  executeMethods: string[];
  keyboard?: string | undefined;
  pushQueue?: boolean | undefined;
  init?: (() => Function) | undefined;
  execute: (data?:any) => any;
  constructor(name:string,executeMethods:string[] = [],execute: (data?:any) => any,keyboard?:string,pushQueue?:boolean,init?:() => Function) {
    this.name = name;
    this.keyboard = keyboard;
    this.pushQueue = pushQueue;
    this.executeMethods = executeMethods;
    this.init = init;
    this.execute = execute;
  }
  
}