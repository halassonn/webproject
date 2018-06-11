import { EventEmitter, Injectable, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../helper/_http/http.service';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class HalamanService implements OnInit {

    // endpoint = 'api/menu';
    token: any;
    header = new Headers();
    options: any;
    parentlist = [];
    idhome = '';


    @Output() pulikasipage: EventEmitter<any> = new EventEmitter();
    publiksummenu:any;




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
        // this.getAllMenu();

    }

    ngOnInit(): void {

    }

    save(endpoint, e) {
        //  console.log('body request: ', e);
        return this._http.post(endpoint, JSON.stringify(e), this.options);
    }
    delete(endpoint) {
        return this._http.delete(endpoint, this.options);
    }

    get(endpoint) {
        return this._http.get(endpoint);
    }
    put(endpoint, e) {
        // console.log('body req update', e);
        return this._http.put(endpoint, JSON.stringify(e), this.options);
    }


    async getAllMenu() {
        this.get('api/menu').subscribe(
            (res) => {
                // tslint:disable-next-line:prefer-const
                let data = JSON.parse(res._body);
                for (let x = 0; x < data.length; x++) {
                    if (data[x].parentmenu !== undefined) {
                        this.parentlist.push(data[x].parentmenu.toUpperCase());
                    }
                }
            },
            (err) => {
                //   console.log(err);
            }
        );
    }

    setpublikasimenu(e) {
        return this.pulikasipage.emit(e);
    }

    getpublikasimenuEmittedValue() {
        return this.pulikasipage;
    }






}
