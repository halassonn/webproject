import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../core/alert/alert.service';
import { trigger, state, animate, transition, style } from '@angular/animations';
import { AlertAuthService } from '../alertlogin.service';
@Component({
  selector: 'app-alertlogin',
  templateUrl: './alertlogin.component.html',
  styleUrls: ['./alertlogin.component.scss'],
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
export class AlertloginComponent implements OnInit {
  alert = { status: undefined, message: undefined, dialog: false };
  showalert : boolean;
  constructor(
    private alertService: AlertAuthService
  ) { 
    this.showalert = false;
  }

  ngOnInit() {

    this.alertService.getEmittedValue().subscribe((data) => {
      this.showalert = data.state;
      this.alert.status = data.status;
      this.alert.message = data.message;
      this.alert.dialog = data.dialog;
      console.log('status : ', this.alert.status);
    });
  }

  get messageData() {
    return this.alert.message;
  }

  get statusName() {
    return this.alert.status === 'Error' ? 'alert-panel alert alert-danger' : 'alert-panel alert alert-success';
  }
  get stateName() {
    return this.showalert ? 'show' : 'hide';
  }

  klickAktivate() {
    console.log('ok');
    this.showalert = !this.showalert;
    this.alertService.showaktivasi('aktivasi');
  }

}
