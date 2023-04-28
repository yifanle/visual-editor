export default class UseCommands {
    private static instance: UseCommands;
    private data: any;
    // private current: number;
    // private queue: any[];
    // private commands: {}; //命令映射表
    // private commandArray: any[]; //命令数组
    private constructor () {}
    public static getInstance () {
        if (!this.instance) {
            this.instance = new UseCommands();
        }
        return this.instance;
    }

    public setData (data: any) {
        this.data = data;
    }

    public getData () {
        return this.data;
    }
}