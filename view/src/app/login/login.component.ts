import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../core/helper/_http/loader/loader.service';
import { fadeInAnimation } from '../core/_animations';
import { trigger, state, animate, transition, style } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
export class LoginComponent implements OnInit {
  constructor() {
     
  }


  ngOnInit() {
 
  }






}
