import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { HttpService } from '../helper/_http/http.service';
import { _HttpCustomService } from './_http.service';


@Injectable()
export class AuthService {
    private isUserLoggedIn: boolean;
    private endpoint = 'api/signin';
    constructor(
        private router: Router,
        private _http: HttpService,
        private customHttp: _HttpCustomService

    ) {
        this.isUserLoggedIn = Boolean(localStorage.getItem('isLogin'));
    }
    setUserLoggedIn() {
        this.isUserLoggedIn = Boolean(localStorage.getItem('isLogin'));
    }

    getUserLoggedIn() {
        return this.isUserLoggedIn;
    }



    authenticate2(e) {
        console.log('do authenticate');
        localStorage.setItem('currentUser', JSON.stringify(e));
        localStorage.setItem('isLogin', 'true');
        this.setUserLoggedIn();
        console.log(this.getUserLoggedIn());
        this.router.navigate(['administrator']);
    }

    requestKodeResetPassword(e) {
        return this._http.post('api/get_kode_reset', JSON.stringify(e));
    }

    resetPassword(e) {
        console.log(e.kode);
        return this._http.post('api/user/reset', JSON.stringify(e));
    }
    daftar(e) {
        return this._http.post('api/signup', JSON.stringify(e));
    }


    authenticate(e): Observable<any> {
        return this._http.post('api/signin', JSON.stringify(e));
    }

    captcha(e): any {
        return this._http.post('captcha', JSON.stringify(e));
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('isLogin');
        this.setUserLoggedIn();
        console.log('User logout');
        console.log(this.getUserLoggedIn());
    }

    checkuserdb() {
        return this._http.get('api/checkuser');
    }

    activasiUser(e) {
        return this._http.put('api/activate', JSON.stringify(e));
    }





    private handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;

        if (error instanceof Response) {
            if (error.status !== 0) {
                const errbody = error.json() || '';
                errMsg = `${errbody.message}`;
            } else {
                errMsg = 'Connection Error';
            }
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);

        return Observable.throw(errMsg);
    }
}
