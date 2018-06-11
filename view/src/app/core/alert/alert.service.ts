import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable()
export class AlertService {

    @Output() alertclass: EventEmitter<any> = new EventEmitter();
    @Output() textstatus: EventEmitter<any> = new EventEmitter();
    constructor() { }


    public open(e): any {
        return this.alertclass.emit(e);
    }
    public close(): any {
        return this.alertclass.emit('overlayOff');
    }

    public openDialog(e): any {
        return this.alertclass.emit(e);
    }
    public closeDialog(): any {
        return this.alertclass.emit('overlayOff');
    }



    getEmittedValue() {
        return this.alertclass;
    }
    getEmitStatusValue() {
        return this.textstatus;
    }

    public status(x: any): any {
        return this.textstatus.emit(x);
    }

    // alert-error
    // alert-success
    // alert-warn
}
