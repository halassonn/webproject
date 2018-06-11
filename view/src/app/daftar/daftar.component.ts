import { Component, OnInit, AfterViewInit } from '@angular/core';
import { trigger, state, animate, transition, style } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../core/shared/auth.service';

@Component({
  selector: 'app-daftar',
  templateUrl: './daftar.component.html',
  styleUrls: ['./daftar.component.scss'],
  animations: [
    trigger('alert', [
      state('show', style({
        opacity: 1
      })),
      state('hide', style({
        opacity: 0
      })),
      transition('show => hide', animate('200ms ease-out')),
      transition('hide => show', animate('500ms ease-in'))
    ]),
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
export class DaftarComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,) {
    this.route.params.subscribe(params => {
      if (params) {
        this.routeparam = params.aktivasi;
      }
      console.log(this.routeparam);
      if (this.routeparam === 'aktivasi') {
        this.showpanelactive = !this.showpanelactive;
      }
    }
    );
  }
  daftar = {
    email: undefined,
    password: undefined,
    retypepassword: undefined
  };
  alert = { status: '', message: '' };
  showalert = false;
  showpanel = false;
  showpanelactive = false;
  showloader = false;
  user_exist_db = false;
  routeparam: any;
  loaderstatus: any;
  alerttime: any;
  activatecode: any;



  ngOnInit() {
    this.checkuserdb();
     this.togglePanel();

  }

  togglealert() {
    this.showalert = !this.showalert;
  }
  togglePanel() {
    this.showpanel = !this.showpanel;
  }

  doDaftar() {
    this.loaderstatus = 'Registering User.....';
    this.showloader = !this.showloader;
    const datauser = { email: this.daftar.email, password: this.daftar.password };
    setTimeout(() => {
      this.authService.daftar(datauser).subscribe(
        (res) => {
          this.showloader = !this.showloader;
          this.togglePanel();
          setTimeout(() => {
            this.showpanelactive = !this.showpanelactive;
            this.togglePanel();
            this.getError('Success', res);
          }, 600);
        }, (err) => {
          this.showloader = !this.showloader;
          this.getError('Error', err);
        }
      );
    }, 1000);
  }

  onActivated() {
    this.loaderstatus = 'Activating User.....';
    this.showloader = !this.showloader;
    const payload = { kode: this.activatecode };
    setTimeout(() => {
      this.authService.activasiUser(payload).subscribe(
        (res) => {
          this.showloader = !this.showloader;
          this.togglePanel();
          setTimeout(() => {
           this.showpanelactive = !this.showpanelactive;
           this.router.navigateByUrl('/index/login');
            this.togglePanel();
            this.getError('Success', res);
          }, 500);

        },
        (err) => { this.showloader = !this.showloader; this.getError('Error', err); }
      );
    }, 1000);

  }

  checkuserdb() {
    this.authService.checkuserdb().subscribe(
      (res) => {
        console.log(res);
        this.user_exist_db = JSON.parse(res._body).user_exists;
        if (this.user_exist_db) {
          this.router.navigateByUrl('/index/login');
          this.togglePanel();}
      }, (err) => { console.log(err); }
    );
  }


  getError(status, e, option?: any) {
    // error.message ? error.message : error.toString();
    console.log(e);
    if (e.status === 0) {
      this.alert = { status: 'Error', message: 'No Internet Connection' };
    } else if (e.status === 401) {
      this.alert = { status: 'Error', message: 'Email Or Password invalid' };
    } else if (e.status === 405) {
      this.alert = { status: 'Error', message: 'Your Account is not Activated' };
    } else {
      if (JSON.parse(e._body).details === undefined) {
        this.alert = { status: status, message: JSON.parse(e._body).message };
      } else {
        this.alert = { status: status, message: JSON.parse(e._body).details[0].message };
      }
    }
    if (this.alert.status === 'Success') {
      this.togglealert();
      this.alerttime = setTimeout(() => {
        this.togglealert();
      }, 5000);
    } else if (this.alert.status === 'Error' && e.status === 405) {
      this.togglealert();
    } else {
      setTimeout(() => {
        this.togglealert();
        this.alerttime = setTimeout(() => {
          this.togglealert();
        }, 5000);

      }, 200);
    }


  }
}
