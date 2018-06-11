import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../../../core/_animations';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [fadeInAnimation]
})
export class ContactComponent implements OnInit {
  idparam: any;


  // initial center position for the map
  lat: number = 2.9218702;
  lng: number = 99.7131013;
  zoom: number = 18;

  latsinaksak: number = 3.034806;
  lngsinaksak: number = 99.085444;

  constructor(private routeActive: ActivatedRoute) {
    this.showpage();
  }

  ngOnInit() {
  }

  showpage() {
    this.routeActive.params.forEach((params: Params) => {
      const idparam = params['param'];
      if (idparam !== undefined) {
        this.idparam = idparam;
      }
    });
  }






}

