export default class UseCommands {
    private static instance: UseCommands;
    private data: any;
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