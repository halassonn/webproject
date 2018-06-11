import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable()
export class AlertAuthService {
    @Output() state: EventEmitter<any> = new EventEmitter();
    @Output() message: EventEmitter<any> = new EventEmitter();
    @Output() showpanelaktivasi: EventEmitter<any> = new EventEmitter();
    constructor() { }

    public show(e): any {
        return this.state.emit(e);
    }

    public status(x: any): any {
        return this.message.emit(x);
    }

    public showaktivasi(e): any {
        return this.showpanelaktivasi.emit(e);
    }

    get openaktivasi() {
        return this.showpanelaktivasi;
    }

    getEmittedValue() {
        return this.state;
    }
    getEmitStatusValue() {
        return this.message;
    }
}
