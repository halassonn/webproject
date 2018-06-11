import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HalamanService } from '../../../core/shared/halaman.service';
import { fadeInAnimation } from '../../../core/_animations';

@Component({
  selector: 'app-publikasi',
  templateUrl: './publikasi.component.html',
  styleUrls: ['./publikasi.component.scss'],
  animations: [fadeInAnimation]
})
export class PublikasiComponent implements OnInit, AfterViewInit {


  idpage: any;
  idparam: any;
  id: any;
  constructor(private routeActive: ActivatedRoute, private halamanService: HalamanService) {
    this.idparam = halamanService.publiksummenu;
    if (this.idparam !== undefined) {
      this.showpage();


    } else {
      this.halamanService.getpublikasimenuEmittedValue().subscribe((data) => {
        this.halamanService.publiksummenu = data;
        this.idparam = halamanService.publiksummenu;
      });
      setTimeout(() => {
        this.showpage();
      }, 50);
    }
  }

  ngOnInit() {

  }
  ngAfterViewInit(): void {

  }

  showpage() {
    this.routeActive.params.forEach((params: Params) => {
      this.id = params['laporan'];
      const d = this.idparam.filter((x) => x === this.id)[0];
      if (this.idparam !== undefined) {
        this.idpage = d;
      }
    });
  }

}
