import deepcopy from "deepcopy";
import EmitterUtil from "../EmitterUtil";
import Command from "./Command";
import ICommand from "./Interface/ICommand";

export default class UseCommands {
  private static instance: UseCommands;

  private data: any;
  public assembleArray: ICommand[] = [];
  private before: any = null;
  private current: number = -1;
  private queue: any[] = [];  // 操作队列
  commands: any = {}; // 命令和执行功能的映射表
  private commandArray: ICommand[] = []; // 命令列表
  private destoryArray: any[] = []; // 销毁函数列表

  private constructor() { }
  public static getInstance(): UseCommands {
    if (!this.instance) {
      this.instance = new UseCommands();
    }
    return this.instance;
  }

  public setData(data: any) {
    this.data = data;
  }
  private registry(command: ICommand) {
    this.commandArray.push(command);
    this.commands[command.name] = () => {
      const executor = command.execute();
      executor.execute();
      
      if (!command.pushQueue) return;
      let { queue, current } = this;
      if (queue.length > 0) {
        queue = queue.slice(0, current + 1);
        this.queue = queue;
      }
      let queueDescript = {};
      Reflect.ownKeys(executor).forEach((key: string|symbol) => {
        if(key !== 'execute') {
          Reflect.set(queueDescript, key, executor[key]);
        }
      });
      queue.push(queueDescript);
      this.current = current + 1;
    };
  }

  private keyboardEvent() {

    const keyCodes:any = {
      90: 'z',
      89: 'y'
    };

    const onKeydown = (e:any) => {
      const {ctrlKey,keyCode} = e;
      let keyArray = [];
      let keyString:string;
      if(ctrlKey) keyArray.push('ctrl');
      keyArray.push(keyCodes[keyCode]);
      keyString = keyArray.join('+');

      this.commandArray.forEach(({keyboard,name}) => {
        if(!keyboard) return;
        if(keyboard === keyString) {
          this.commands[name]();
          e.preventDefault();
        }
      });
    }
    const init = () => {
      window.addEventListener('keydown',onKeydown);
      return () => {
        window.removeEventListener('keydown',onKeydown);
      }
    }

    return init;
  }

  public assembl() {
    const that = this;
    this.assembleArray.push(new Command('redo',[], () => {
      return {
        execute() {
          let item = that.queue[that.current + 1];
          if (item) {
            item.redo && item.redo();
            that.current++;
          }
        }
      }
    }, 'ctrl+y'));
    this.assembleArray.push(new Command('undo',[], () => {
      return {
        execute() {
          if (that.current === -1) return;
          let item = that.queue[that.current];
          if (item) {
            item.undo && item.undo();
            that.current--;
          }
        }
      }
    }, 'ctrl+z'));
    this.assembleArray.push(new Command('drag',['redo','undo'], () => {
      let before = that.before;
      let after = that.data.value.blocks;
      return {
        execute() {
          that.data.value = { ...that.data.value, blocks: after };
        },
        redo() {
          that.data.value = { ...that.data.value, blocks: after };
        },
        undo() {
          after = that.data.value.blocks;
          that.data.value = { ...that.data.value, blocks: before };
        }
      }
    }, undefined, true, () => {
      const start = () => that.before = deepcopy(this.data.value.blocks);
      const end = () => that.commands.drag();
      EmitterUtil.register('start', start);
      EmitterUtil.register('end', end);
      return () => {
        EmitterUtil.destroy(['start', 'end'], [start, end]);
      }
    }));
    this.assembleArray.forEach((command) => {
      this.registry(command);
    });
    this.destoryArray.push(this.keyboardEvent()());
    this.commandArray.forEach((command) => command.init && this.destoryArray.push(command.init()));
  }

  public destroy() {
    this.destoryArray.forEach(destroy => destroy&&destroy());
  }
}