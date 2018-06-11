import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, AfterViewInit {

  overlay_class = 'overlayOff';
  textstatus = '';
  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.getEmittedValue().subscribe((data) => {
      this.overlay_class = data;
    });

    this.alertService.getEmitStatusValue().subscribe((data) => {
      this.textstatus = data;
    });


  }
  ngAfterViewInit() {

  }
  closeDialog() {
    this.alertService.close();
  }

}
