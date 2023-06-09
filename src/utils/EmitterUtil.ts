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
  public static emit(name: string, data?: any):void {
    if (this.emitter) {
      data ? this.emitter.emit(name,data) : this.emitter.emit(name);
    }
  }

  public static destroy(names: string[],handlers:any[]){
    if(this.emitter) {
      for(let i = 0; i < names.length; i++) {
        if(this.registryList.includes(names[i])) {
          console.log('destroy',names[i]);
          handlers&&handlers.length>0 ? this.emitter.off(names[i],handlers[i]) : this.emitter.off(names[i]);
          this.registryList.splice(this.registryList.indexOf(names[i]),1);
        }
      }
    }
  }
}
