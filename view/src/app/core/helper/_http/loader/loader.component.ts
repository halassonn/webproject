import { Component, OnInit } from '@angular/core';
import { LoaderService } from './loader.service';
import { trigger, state, animate, transition, style } from '@angular/animations';
import { fadeInAnimation } from '../../../_animations/fade-in.animation';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  animations: [fadeInAnimation],
})
export class LoaderComponent implements OnInit {
  overlay_class = 'overlayOff';
  textstatus = '...';
  show = false;
  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.getEmittedValue().subscribe((data) => {
      this.overlay_class = data;
    });
    this.loaderService.getEmitStatusValue().subscribe((data) => {
      this.textstatus = data;
    });
  }

  get getloader() {
    return this.show ? 'show' : 'hide';
  }

}
