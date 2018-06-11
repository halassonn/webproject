import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AlertAuthService } from '../../shared/alertlogin.service';
import { trigger, state, animate, transition, style } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/shared/auth.service';
import { environment } from '../../../../environments/environment';
//import * as env from '../../../../environments/environment';
//const rechapchasitekey = env.environment.recaptchaSiteKey;
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  animations: [
    trigger('panel', [
      state('show', style({
        opacity: 1
      })),
      state('hide', style({
        opacity: 0
      })),
      transition('show => hide', animate('200ms ease-out')),
      transition('hide => show', animate('600ms ease-in'))
    ])
  ],
})
export class PageComponent implements OnInit, AfterViewInit {

  option = { state: true, status: undefined, message: undefined, dialog: false };
  daftar = {
    email: undefined,
    password: undefined,
    retypepassword: undefined
  };
  login = {
    email: undefined,
    password: undefined
  };
  showloader = false;
  showpanel = false;
  loaderstatus: any;
  routeParam: any;

  emailReset: any;
  passwordReset: any;
  retypePasswordReset: any;
  kodeReset: any;
  alerttime: any;
  captcha: any;
  activatecode: any;
  recaptchaelement: any;
  user_exist_db = false;
  recaptchaKey: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private alertLoginService: AlertAuthService) {
    this.routeParam = 'login';
    this.route.params.subscribe(params => {
      if (params) {
        this.routeParam = params.p;
        if (this.routeParam === undefined) {
          this.routeParam = 'login';
          // this.togglePanel();
        }
      }
    });

    this.recaptchaKey = environment.recaptchaSiteKey;
    // tslint:disable-next-line:max-line-length
    this.recaptchaelement = ' <re-captcha (resolved)="resolved($event)" siteKey="' + this.recaptchaKey + '" theme = "' + 'dark' + '"></re-captcha>';
  }

  ngOnInit() {
    window.history.forward();
    this.checkuserdb();
    this.alertLoginService.openaktivasi.subscribe((data) => {
      this.togglePanel();
      setTimeout(() => {
        this.routeParam = data;
        this.togglePanel();
      }, 300);
    });
  }
  ngAfterViewInit(): void {
    console.log(this.recaptchaelement);
    // tslint:disable-next-line:max-line-length
   // document.getElementById('re-captcha').innerHTML = this.recaptchaelement;
  }
  get stateNamePanel() {
    return this.showpanel ? 'show' : 'hide';
  }


  toglealert() {
    this.alertLoginService.show(this.option);
    this.option.state = !this.option.state;
  }



  doLogin() {
    this.loaderstatus = 'Authenticating......';
    this.showloader = !this.showloader;
    const currentUser = { email: this.login.email, password: this.login.password, captcha: this.captcha };
    setTimeout(() => {
      this.authService.authenticate(currentUser).subscribe(
        (success) => {
          // console.log(JSON.parse(success._body).token);
          const token = JSON.parse(success._body).token;
          if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('isLogin', 'true');
            localStorage.setItem('user', currentUser.email);
            this.router.navigate(['administrator']);
            this.clearlogin();
          }
          this.showloader = !this.showloader;
        }, (error) => {
          this.showloader = !this.showloader;
          this.getError('Error', error);
        }
      );
    }, 1000);
  }
  doDaftar() {
    this.loaderstatus = 'Registering User.....';
    this.showloader = !this.showloader;
    // tslint:disable-next-line:max-line-length
    const datauser = { email: this.daftar.email, password: this.daftar.password, password_confirm: this.daftar.retypepassword, captcha: this.captcha };
    setTimeout(() => {
      this.authService.daftar(datauser).subscribe(
        (res) => {
          this.showloader = !this.showloader;
          this.togglePanel();
          setTimeout(() => {
            this.routeParam = 'aktivasi';
            this.togglePanel();
            this.getError('Success', res);
            this.cleardaftar();
          }, 600);
        }, (err) => {
          this.showloader = !this.showloader;
          this.getError('Error', err);
        }
      );
    }, 1000);
  }

  checkuserdb() {
    this.authService.checkuserdb().subscribe(
      (res) => {
         console.log(res);
        this.user_exist_db = JSON.parse(res._body).user_exists;
        if (!this.user_exist_db) {
          setTimeout(() => {
            this.router.navigate(['/index/login']);
            this.routeParam = 'daftar';
            this.togglePanel();
          }, 200);

        } else {
          //  this.routeParam = 'login';
          this.togglePanel();
        }
      }, (err) => { console.log(err); 
      }
    );
  }
  onActivated() {
    this.loaderstatus = 'Activating User.....';
    this.showloader = !this.showloader;
    const payload = { aktifasikode: this.activatecode, captcha: this.captcha };
    setTimeout(() => {
      this.authService.activasiUser(payload).subscribe(
        (res) => {
          this.showloader = !this.showloader;
          this.togglePanel();
          setTimeout(() => {
            this.router.navigate(['/index/login', { 'p': 'login' }]);
            this.togglePanel();
            this.clearAktivasi();
            this.getError('Success', res);
          }, 500);

        },
        (err) => { this.showloader = !this.showloader; this.getError('Error', err); }
      );
    }, 1000);

  }
  onBatalactivate() {
    this.togglePanel();
    setTimeout(() => {
      this.routeParam = 'login';
      this.togglePanel();
      this.clearAktivasi();
    }, 300);

  }

  forgotPassword() {

    this.togglePanel();
    setTimeout(() => {
      this.router.navigate(['/index/user/reset', { 'p': 'request reset' }]);
      this.togglePanel();
      this.clearlogin();
    }, 600);
  }

  batalkodereset() {
    this.togglePanel();
    setTimeout(() => {
      this.router.navigate(['/index/login', { 'p': 'login' }]);
      this.clearReqKodeReset();
      this.togglePanel();
    }, 600);
  }

  batalreset() {

    this.togglePanel();
    setTimeout(() => {
      this.router.navigate(['/index/login', { 'p': 'login' }]);
      this.clearReset();
      this.togglePanel();
    }, 600);
  }

  getResetKode() {
    this.loaderstatus = 'Request Reset Code Password.....';
    this.showloader = !this.showloader;
    const email = { email: this.emailReset, captcha: this.captcha };
    setTimeout(() => {
      this.authService.requestKodeResetPassword(email).subscribe(
        // tslint:disable-next-line:max-line-length
        (res) => {
          this.showloader = !this.showloader;
          this.togglePanel();
          setTimeout(() => {
            this.router.navigate(['/index/user/reset', { 'p': 'reset' }]);
            // this.routeParam ='reset';
            this.togglePanel();
            this.getError('Success', res);
          }, 600);
        }, (err) => { this.showloader = !this.showloader; this.getError('Error', err); }
      );
    }, 600);
  }
  resendKode() {
    this.loaderstatus = 'Request Reset Code Password.....';
    this.showloader = !this.showloader;
    const email = { email: this.emailReset, captcha: this.captcha };
    setTimeout(() => {
      this.authService.requestKodeResetPassword(email).subscribe(

        (res) => {
          this.showloader = !this.showloader;

          setTimeout(() => {
            this.getError('Success', res);
          }, 600);
        }, (err) => { this.showloader = !this.showloader; this.getError('Error', err); }
      );
    }, 600);
  }

  onResetPassword() {
    this.loaderstatus = 'Resetting Password.....';
    this.showloader = !this.showloader;
    // tslint:disable-next-line:max-line-length
    const data = { passwordresetkode: this.kodeReset, password: this.passwordReset, password_confirm: this.retypePasswordReset, captcha: this.captcha };
    setTimeout(() => {
      this.authService.resetPassword(data).subscribe(
        (res) => {

          this.showloader = !this.showloader;
          this.togglePanel();
          setTimeout(() => {
            this.routeParam = 'login';
            this.togglePanel();
            this.getError('Success', res);
            this.clearReqKodeReset();
            this.clearReset();
          }, 600);

        },
        (err) => {

          this.showloader = !this.showloader;
          this.getError('Error', err);
        }
      );
    }, 5000);
  }
  togglePanel() {
    this.showpanel = !this.showpanel;
  }
  clearlogin() {
    this.login.email = undefined;
    this.login.password = undefined;
  }
  cleardaftar() {
    this.daftar.email = undefined;
    this.daftar.password = undefined;
    this.daftar.retypepassword = undefined;
  }
  clearReqKodeReset() {
    this.emailReset = undefined;
  }
  clearReset() {
    this.passwordReset = undefined;
    this.retypePasswordReset = undefined;
    this.kodeReset = undefined;

  }
  clearAktivasi() {
    this.activatecode = undefined;
  }
  getError(status, e, dialog?: boolean) {
    console.log(e);
    if (this.alerttime !== undefined) {
      this.toglealert();
      clearTimeout(this.alerttime);
    }

    if (e.status === 0) {
      this.option = { state: true, status: 'Error', message: 'No Internet Connection', dialog: false };
    } else if (e.status === 401) {
      this.option = { state: true, status: 'Error', message: 'Email Or Password invalid', dialog: false };
    } else if (e.status === 405) {
      this.option = { state: true, status: 'Error', message: 'Your Account is not Activated', dialog: false };
    } else {
      if (JSON.parse(e._body).details === undefined) {
        this.option = { state: true, status: status, message: JSON.parse(e._body).message, dialog: false };
      } else {
        this.option = { state: true, status: status, message: JSON.parse(e._body).details[0].message, dialog: false };
      }
    }
    if (this.option.status === 'Success') {
      this.toglealert();
      this.alerttime = setTimeout(() => {
        this.toglealert();
      }, 4000);
    } else if (this.option.status === 'Error' && e.status === 405) {
      this.option.dialog = true;
      this.toglealert();
    } else {
      setTimeout(() => {
        this.toglealert();
        this.alerttime = setTimeout(() => {
          this.toglealert();
        }, 3000);
      }, 200);
    }


  }

  resolved(captchaResponse: string) {
    //  console.log(`Resolved captcha with response ${captchaResponse}:`);
    this.captcha = captchaResponse;
  }

}
