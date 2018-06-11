import { Component, OnInit, AfterViewInit } from '@angular/core';
import { IndexService } from './index.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HalamanService } from '../../../core/shared/halaman.service';
import { Title } from '@angular/platform-browser';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { fadeInAnimation } from '../../../core/_animations';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [fadeInAnimation]
})
export class IndexComponent implements OnInit, AfterViewInit {

  pagecontent = '';
  idpage = '';
  idhome = '';
  title = 'PT BPR DIORI GANDA';
  show = false;
  constructor(private indexService: IndexService,
    private routeActive: ActivatedRoute,
    private router: Router,
    private halamanService: HalamanService, private serviceTitle: Title) {
  }

  ngOnInit() {
    this.show = !this.show;
    this.getHome();

    this.routeActive.params.forEach((params: Params) => {
      this.idpage = params['page'];
      if (this.idpage !== undefined) {
        this.showPage(this.idpage);
      }
    });
  }
  ngAfterViewInit(): void {
  }


  showPage(e) {
    this.halamanService.get('api/page/' + e).subscribe(
      (res) => {
        // tslint:disable-next-line:prefer-const
        this.pagecontent = JSON.parse(res._body).content;
        this.title = JSON.parse(res._body).namahalaman;
        document.getElementById('content').innerHTML = this.pagecontent;
        this.setTitle(this.title.toUpperCase());

      },
      (err) => {
        console.log(err);
      }
    );
  }

  async getHome() {
    this.halamanService.get('api/menu').subscribe(
      (res) => {
        // tslint:disable-next-line:prefer-const
        let data = JSON.parse(res._body);
        // tslint:disable-next-line:forin
        for (let x in data) {
          if (data[x].namamenu === 'Home') {
            if (this.router.isActive('/index', true) || this.router.isActive('/', true)) {
              // this.idhome = data[x]._id;
              this.showPage(data[x].page[0]);
            }
          }
        }
      },
      (err) => {
        console.log(err);
      }
    );

  }

  public setTitle(newTitle: string) {
    this.serviceTitle.setTitle(newTitle);
  }
}
