import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HalamanModel } from '../../../core/model/halaman.model';
import { HalamanService } from '../../../core/shared/halaman.service';
import { LoaderService } from '../../../core/helper/_http/loader/loader.service';
import { AlertService } from '../../../core/alert/alert.service';
import { fadeInAnimation } from '../../../core/_animations';
declare const tinymce: any;
@Component({
  selector: 'app-halaman',
  templateUrl: './halaman.component.html',
  styleUrls: ['./halaman.component.scss'],
  animations: [fadeInAnimation],
})
export class HalamanComponent implements OnInit, AfterViewInit {
  page: any;
  urlmenu: any;
  mainmenu = false;
  postbody: any;
  ideditor = 'contentdata';
  halamanmodel: HalamanModel = new HalamanModel;
  idmenu: any;
  response = { succes: false };
  pesan: any;
  parent: any = '';
  parentlist = [];
  addparent = false;
  cari = false;
  list = false;
  listAction = false;
  listPage: any;
  datalama: any;
  caridata: any;
  idPage: any;
  tambah = false;
  listmenu: any;
  nodex: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private halamanService: HalamanService,
    private loaderService: LoaderService,
    private alertService: AlertService,

  ) {
    this.getAllMenu();
    this.getAllPage();
  }

  ngOnInit() {
    // console.log( this.halamanService.xx);

  }
  ngAfterViewInit() {
    this.getSpanNodes();
  }
  chooseoptionmenu() {
    this.mainmenu = !this.mainmenu;
    this.parent = '';
    if (this.tambah) {
      // this.halamanmodel = new HalamanModel;
    }

  }

  selectparentmenu(e) {
    // if (this.halamanmodel.urlmenu === undefined) {
    if (e.target.value !== '0') {
      this.halamanmodel.parentmenu = (e.target.value).toLowerCase();
      this.addparent = false;
      const x = e.target.value;
      this.halamanmodel.urlmenu = '/index/'.concat(x.toLowerCase().concat('/').concat(this.halamanmodel.namamenu).toLowerCase());
    } else {
      this.parent = '';
      this.addparent = true;
    }
  }

  newparent(e) {
    const x = e.target.value;
    this.halamanmodel.parentmenu = x;
    this.halamanmodel.urlmenu = '/index/'.concat(x.concat('/').concat(this.halamanmodel.namamenu).toLowerCase());
  }


  onchangemenu(e) {
    if (this.mainmenu !== true) {
      this.halamanmodel.urlmenu = '/index/' + (e.target.value).toLowerCase();
    } else {
      this.halamanmodel.urlmenu = '/index/' + this.parent.toLowerCase() + '/' + (e.target.value).toLowerCase();
    }
    this.halamanmodel.namahalaman = e.target.value;

  }
  onBodyTextEditorKeyUp(e) {
    // this.postbody = e;
  }

  async savemenu() {
    const menu = { namamenu: this.halamanmodel.namamenu, urlmenu: this.halamanmodel.urlmenu, parentmenu: this.parent };
    this.loaderService.status('Saving data.....');
    setTimeout(() => {
      this.halamanService.save('api/menu', menu).subscribe(
        (response) => {
          // this.response = response;
          this.idmenu = JSON.parse(response._body).id;
          this.getMessageResponse(response);
         // console.log('before save page  when success: ', this.response);
          this.savepage();
        }, (error) => {
          //  this.response = error;
          this.getMessageResponse(error);
         // console.log('before save page when error : ', this.response);
          this.loaderService.loaderclose();
          this.openalert('alert-error alert-up');
        }
      );
    }, 1500);
  }
  async savepage() {
    const content = tinymce.get('ideditor').getContent();
    this.halamanmodel.content = content;
    const page = { namahalaman: this.halamanmodel.namahalaman, content: this.halamanmodel.content };
    this.loaderService.status('Saving page content ....');
    setTimeout(() => {
      this.halamanService.save('api/menu/'.concat(this.idmenu).concat('/page'), page).subscribe(
        (res) => {
          // this.response = res;

          this.getMessageResponse(res);
          this.loaderService.loaderclose();
          this.openalert('alert-succes alert-up');
          this.clearModel();
          this.list = !this.list;
        }, (err) => {
          // this.response = err;
          this.getMessageResponse(err);

          this.halamanService.delete('api/menu/'.concat(this.idmenu)).subscribe(
            (res2) => { console.log('delete menu', res2); }
            , (err2) => {
            //  console.log('delete menu', err2);
            }
          );
          this.loaderService.loaderclose();
          this.openalert('alert-error alert-up');
        }
      );

    }, 100);
  }

  async updatemenu() {
    const menu = { namamenu: this.halamanmodel.namamenu, urlmenu: this.halamanmodel.urlmenu, parentmenu: this.parent };
    this.loaderService.status('Updating data.....');
    setTimeout(() => {
      this.halamanService.put('api/menu/'.concat(this.idmenu), menu).subscribe(
        (response) => {
          // this.response = response;
          this.idmenu = JSON.parse(response._body).id;
          this.getMessageResponse(response);
      //    console.log('before update page  when success: ', this.response);
          this.updatepage();
        }, (error) => {
          //  this.response = error;
          this.getMessageResponse(error);
      //    console.log('before save page when error : ', this.response);
          this.loaderService.loaderclose();
          this.openalert('alert-error alert-up');
        }
      );
    }, 1500);
  }

  async updatepage() {
    const content = tinymce.get('ideditor').getContent();
    this.halamanmodel.content = content;
    const page = { namahalaman: this.halamanmodel.namahalaman, content: this.halamanmodel.content };
    this.loaderService.status('Updating page content ....');
    setTimeout(() => {
      this.halamanService.put('api/page/'.concat(this.idPage), page).subscribe(
        (res) => {
          // this.response = res;

          this.getMessageResponse(res);
          this.loaderService.loaderclose();
          this.openalert('alert-succes alert-up');
          this.clearModel();
          this.list = !this.list;
        }, (err) => {
          // this.response = err;
          this.getMessageResponse(err);

          /* this.halamanService.delete('api/menu/'.concat(this.idmenu)).subscribe(
             (res2) => { console.log('delete menu', res2); }
             , (err2) => {
               console.log('delete menu', err2);
             }
           );*/
          this.loaderService.loaderclose();
          this.openalert('alert-error alert-up');
        }
      );

    }, 100);
  }

  async save() {
    if (this.halamanmodel.namamenu !== undefined) {
      this.pesan = null;
      this.savemenu();
      this.loaderService.loaderOpen();
    }
  }
  async update() {
    if (this.halamanmodel.namamenu !== undefined) {
      this.pesan = null;
      this.updatemenu();
      this.loaderService.loaderOpen();
    }
  }

  async getAllMenu() {
    this.halamanService.get('api/menu').subscribe(
      (res) => {
        // tslint:disable-next-line:prefer-const

        let data = JSON.parse(res._body);
        this.listmenu = data;
        this.datalama = data;
      //  console.log(data);
        for (let x = 0; x < data.length; x++) {
          if (data[x].parentmenu !== undefined && data[x].parentmenu !== '' && data[x].parentmenu !== null) {
        //    console.log('p', data[x].parentmenu);
            if (data[x].parentmenu.length !== 0) {
              this.parentlist.push(data[x].parentmenu);
            }
          }
        }
        this.parentlist = this.parentlist.filter((elem, index, self) => index === self.indexOf(elem));
    //    console.log(this.parentlist);

      },
      (err) => {
     //   console.log(err);
      }
    );

  }
  async getAllPage() {
    this.halamanService.get('api/page').subscribe(
      (res) => {
        let data = JSON.parse(res._body);
        this.listPage = data;
        //  this.datalama = data;
        if (this.mainmenu) {
          this.mainmenu = !this.mainmenu;
        }
      },
      (err) => {
     //   console.log(err);
      }
    );
  }

  async hapusHalaman() {
    this.alertService.status('Yakin Ingin Menghapus Data ini ?');
    this.alertService.open('dialog');
    setTimeout(() => {
      const action = document.getElementById('yesDelete');
      action.addEventListener('click', (e) => {
        this.loaderService.status('Deleting data....');
        this.loaderService.loaderOpen();
        this.halamanService.delete('api/page/' + this.idPage).subscribe(
          (res) => {
            this.alertService.close();
            setTimeout(() => {
          //    console.log(res);
              this.clearModel();
              // this.parentlist = this.parentlist.filter((x)=>x !==)
              this.loaderService.loaderclose();
              this.alertService.status('Data Sudah di hapus');
              this.openalert('alert-succes alert-up');
              this.getSpanNodes();
            }, 1000);


          }, (error) => {
       //     console.log(error);
          }
        );
      });
    }, 500);
  }

  async details() {
    // get menu
    this.halamanService.get('api/menu/' + this.idmenu).subscribe(
      (res) => {
        let data = JSON.parse(res._body);
        this.halamanmodel = new HalamanModel;
        this.halamanmodel.namamenu = data.namamenu;
        this.halamanmodel.parentmenu = data.parentmenu;
        this.halamanmodel.urlmenu = data.urlmenu;
        this.halamanmodel.id = data._id;
        this.parent = data.parentmenu;
        this.halamanService.get('api/page/' + this.idPage).subscribe(
          (res2) => {
            let data = JSON.parse(res2._body);
            this.halamanmodel.content = data.content;
            this.halamanmodel.namahalaman = data.namahalaman;
            this.list = !this.list;
            setTimeout(() => {
              tinymce.get('ideditor').setContent(this.halamanmodel.content);
              this.tambah = true;
              // console.log(this.halamanmodel)
              // tslint:disable-next-line:max-line-length
              if (this.halamanmodel.parentmenu === '') {
                this.mainmenu = false;
                document.getElementById('mainmenu').setAttribute('checked', '');
              } else {
                this.mainmenu = true;
                document.getElementById('submenu').setAttribute('checked', '');
              }

            }, 500);
          }, (err2) => {
       //     console.log(err2);
          }
        );
      }, (error) => {
     //   console.log(error);
      }
    );
  }



  clearModel() {
    this.halamanmodel.namamenu = '';
    this.halamanmodel.urlmenu = '';
    this.halamanmodel.parentmenu = '';
    this.halamanmodel.namahalaman = '';
    this.halamanmodel.content = '';
    this.halamanmodel.id = '';
    this.postbody = '';
    this.parent = '';
    this.caridata = '';
    this.idPage = '';
    this.idmenu = '';
    this.addparent = false;
    this.parentlist = [];
    this.getAllMenu();
    this.getAllPage();
    if (tinymce.get('ideditor') !== null) {
      tinymce.get('ideditor').setContent('');
    }
    this.tambah = false;

  }

  getMessageResponse(e) {

    if (e.status === 201) {
      this.pesan = 'Data Sudah Disimpan....';
      //  this.response = { success: pesan };
      this.response.succes = true;
    } else if (e.status === 200) {
      this.pesan = 'Data Sudah Diupdate....';
      //  this.response = { success: pesan };
      this.response.succes = true;
    } else if (e.status === 403) {
      this.pesan = JSON.parse(e._body).error;
      // this.response = { error: pesan };
      this.response.succes = false;
    } else if (e.status === 401) {
      this.pesan = 'You must be authorized, to access this data';
      this.response.succes = false;
    } else {
      this.pesan = JSON.parse(e._body).details[0].message;
      // this.response = { error: pesan };
      this.response.succes = false;
    }
    console.log(e);
   // console.log(this.pesan);
    this.alertService.status(this.pesan);
  }

  openalert(e) {
    this.alertService.open(e);
    setTimeout(() => {
      this.alertService.open('alert-down overlayOff');
    }, 5000);
  }

  showListAction(e, idpage) {
  //  console.log(e);
 //   console.log(idpage);

    for (var d = 0; d < this.nodex.length; d++) {
      document.getElementById(this.nodex[d].id).setAttribute('style', 'display: none');
    }

    let cs = document.getElementById(e).getAttribute('style');
    if (cs) {
      document.getElementById(e).removeAttribute('style');
    } else {
      document.getElementById(e).setAttribute('style', 'display: none');
    }

    this.idPage = idpage;
    this.idmenu = e;

  }
  getSpanNodes() {
    setTimeout(() => {
      this.nodex = document.getElementById('parentzero').querySelectorAll('span');
   //   console.log(this.nodex);
    }, 100);

  }



  cariPage(e) {
   // console.log(this.listmenu);
    let datacari = this.listmenu.filter((x) => {
      return x.namamenu.toLowerCase() === e.target.value.toLowerCase();
    });
   // console.log(datacari);

    if (datacari.length !== 0) {
      this.listmenu = datacari;

    } else {
      this.listmenu = this.datalama;

    }
    this.getSpanNodes();
  }




}
