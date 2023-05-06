import deepcopy from "deepcopy";
import EmitterUtil from "./EmitterUtil";
import { onUnmounted } from "vue";

export function useCommand(data:any) {
    const state = {
        current: -1,
        queue: [] as any,  // 操作队列
        commands: {} as any, // 命令和执行功能的映射表
        commandArray: [] as any[], // 命令列表
        destoryArray: [] as any[], // 销毁函数列表
    }

    const registry = (command:any) => {
        state.commandArray.push(command);
        state.commands[command.name] = () => {
            const {redo,undo} = command.execute();
            redo();
            if(!command.pushQueue) return;
            let {queue,current} = state;
            if(queue.length > 0) {
                queue = queue.slice(0,current+1);
                state.queue = queue;
            }
            queue.push({name:command.name,undo,redo});
            state.current = current + 1;
        }
    }

    registry({
        name: 'redo',
        keyboard: 'ctrl+y',
        execute: () => {
            return {
                redo() {
                    let item = state.queue[state.current+1];
                    if(item) {
                        item.redo && item.redo();
                        state.current++;
                    }
                }
            }
        }
    });

    registry({
        name: 'undo',
        keyboard: 'ctrl+z',
        execute: () => {
            return {
                redo() {
                    if(state.current === -1) return;
                    let item = state.queue[state.current];
                    if(item) {
                        item.undo && item.undo();
                        state.current--;
                    }
                }
            }
        }
    });

    registry({
        name: 'drag',
        pushQueue: true,
        init(){ // 初始化操作
            this.before = null;
            const start = () => this.before = deepcopy(data.value.blocks);
            const end = () => state.commands.drag();
            EmitterUtil.register('start',start);
            EmitterUtil.register('end',end);
            return () => {
                EmitterUtil.destroy(['start','end'],[start,end]);
            }
        },
        execute: () => {
            let before = this.before;
            let after = data.value.blocks;
            return {
                redo() {
                    data.value = {...data.value,blocks:after};
                },
                undo() {
                    data.value = {...data.value,blocks:before};
                }
            }
        }
    });

    (()=>{
        state.commandArray.forEach(command => command.init && state.destoryArray.push(command.init()));
    })();

    onUnmounted(() => {
        state.destoryArray.forEach(destroy => destroy&&destroy());
    });
}