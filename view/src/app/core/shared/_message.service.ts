import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {


    constructor() {

    }

    getDataMessageResponse(e) {
        var pesan;
        if (e.status === 201) {
            pesan = 'Data Sudah Disimpan....';
        } else if (e.status === 200) {
            pesan = 'Data Sudah Diupdate....';
        } else if (e.status === 403) {
            pesan = JSON.parse(e._body).error;
        } else if (e.status === 401) {
            pesan = 'You must be authorized, to access this data';
        } else {
            pesan = JSON.parse(e._body).details[0].message;
        }
        // console.log(e);
        console.log(pesan);
    }
    getLoginMessage(e) {

    }

}
