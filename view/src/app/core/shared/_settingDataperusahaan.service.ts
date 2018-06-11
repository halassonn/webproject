import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../helper/_http/http.service';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class SettingDataPerusahaanService {
    token: any;
    header = new Headers();
    options: any;
    constructor(
        private router: Router,
        private _http: HttpService
    ) {
        this.token = localStorage.getItem('token');
        this.header.append('enctype', 'multipart/form-data');
        this.header.append('Content-Type', 'application/json');
        this.header.append('X-Requested-With', 'XMLHttpRequest');
        this.header.append('Authorization', this.token);
        this.header.append('Access-Control-Allow-Origin', ' *');
        this.options = new RequestOptions({ headers: this.header });
    }

    save(endpoint, e) {
        console.log('body request: ', e);
        return this._http.post(endpoint, JSON.stringify(e), this.options);
    }
    delete(endpoint) {
        return this._http.delete(endpoint, this.options);
    }

    get(endpoint) {
        return this._http.get(endpoint);
    }
    put(endpoint, e) {
        console.log('body req update', e);
        return this._http.put(endpoint, JSON.stringify(e), this.options);
    }
}
