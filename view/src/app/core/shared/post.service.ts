import { Injectable } from '@angular/core';
import { HttpService } from '../helper/_http/http.service';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class PostService {

    token: any;
    header = new Headers();
    options: any;
    parentlist = [];

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
       // console.log('body request: ', e);
        return this._http.post(endpoint, JSON.stringify(e), this.options);
    }
    delete(endpoint) {
        return this._http.delete(endpoint, this.options);
    }

    get(endpoint) {
        return this._http.get(endpoint);
    }
}
