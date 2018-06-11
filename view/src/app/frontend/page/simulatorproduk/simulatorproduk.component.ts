import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { fadeInAnimation } from '../../../core/_animations';

@Component({
  selector: 'app-simulatorproduk',
  templateUrl: './simulatorproduk.component.html',
  styleUrls: ['./simulatorproduk.component.scss'],
  animations:[fadeInAnimation]
})
export class SimulatorprodukComponent implements OnInit {

  param: any;
  constructor(private routeActive: ActivatedRoute) {
   
  }

  ngOnInit() {
    this.showpage();
  }


  showpage() {
    this.routeActive.params.forEach((params: Params) => {
      var p = params['simulator'];
      if (p !== undefined) {
        this.param = p;
        console.log(this.param);
      }
    });
  }
}
