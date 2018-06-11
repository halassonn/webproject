import { Injectable, Output, EventEmitter } from "@angular/core";

@Injectable()
export class IndexService {
    @Output()
    pagecontent: EventEmitter<any> = new EventEmitter();
    constructor() {

    }

    public status(x: any): any {
        return this.pagecontent.emit(x);
    }
   public getEmitStatusValue() {
        return this.pagecontent;
    }
}
