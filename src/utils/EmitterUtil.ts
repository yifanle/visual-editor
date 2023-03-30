import mitt from 'mitt';
import { Emitter,EventType } from 'mitt';

export default class EmitterUtil {
  private static emitter: Emitter<Record<EventType, unknown>>;
  private static registryList: string[] = [];

  public static register(name: string,handler:any) {
    if (!this.emitter) {
      this.emitter = mitt();
    }
    if (!this.registryList.includes(name)) {
      this.registryList.push(name);
      this.emitter.on(name,handler);
    }
  }
  public static emit(name: string, data: any):void {
    if (this.emitter) {
      data ? this.emitter.emit(name,data) : this.emitter.emit(name);
    }
  }

  public static destroy(names: string[],handler:any){
    if(this.emitter) {
      names.filter((name) => {
        if(this.registryList.includes(name)) {
          console.log('destroy',name);
          handler ? this.emitter.off(name,handler) : this.emitter.off(name);
          this.registryList.splice(this.registryList.indexOf(name),1);
        }
      });
    }
  }
}
