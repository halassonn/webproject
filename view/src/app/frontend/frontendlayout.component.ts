import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HalamanService } from '../core/shared/halaman.service';
import { environment } from '../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IndexService } from './page/index/index.service';
import { slideInOutAnimation, fadeInAnimation } from '../core/_animations';

@Component({
    templateUrl: './frontendlayout.component.html',
    styleUrls: ['./frontendlayout.component.scss'],
})
export class FrontendLayoutComponent implements OnInit, AfterViewInit {
    parentlist = [];
    allmenu: any;
    content: any;
    idhome: any;
    home: any;
    idpage: any;
    urlendpoint = '/index/page/';
    toggleSidebar = false;

    dataPerusahaan = {
        nama: 'BANK GANDA GROUP',
        alamat: 'Jalan Sakti no 32'
    };

    kommentar: any[] = [
        { nama: 'budi', pesan: 'Mantap', tglkomen: new Date() },
        { nama: 'dono', pesan: 'The NgForOf directive instantiates a template once per item from an iterable. The context for each instantiated template inherits from the outer context with the given loop variable set to the current item from the iterable.', tglkomen: new Date() },
        { nama: 'indro', pesan: 'The NgForOf directive instantiates a template once per item from an iterable. The context for each instantiated template inherits from the outer context with the given loop variable set to the current item from the iterable.', tglkomen: new Date() },
        { nama: 'indro', pesan: 'kembangkan', tglkomen: new Date() },
        { nama: 'indro', pesan: 'The NgForOf directive instantiates a template once per item from an iterable. The context for each instantiated template inherits from the outer context with the given loop variable set to the current item from the iterable.', tglkomen: new Date() }

    ];

    constructor(
        private halamanService: HalamanService,
        private translate: TranslateService,
        private router: Router,
        private route: ActivatedRoute,
        private indexService: IndexService) {
        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');
        this.getAllMenu();

        this.halamanService.getpublikasimenuEmittedValue().subscribe((data) => {
            this.halamanService.publiksummenu = data;
        });


    }
    ngAfterViewInit() {
        const data = document.getElementById('submenupublikasi').getElementsByTagName('a');
        let menu = [];
        for (var x = 0; x < data.length; x++) {
            menu.push(data[x].getAttribute('id'));
            this.halamanService.setpublikasimenu(menu);
        }

    }
    ngOnInit() {

    }





    async getAllMenu() {
        this.halamanService.get('api/menu').subscribe(
            (res) => {
                // tslint:disable-next-line:prefer-const
                this.allmenu = JSON.parse(res._body);
            },
            (err) => {
                console.log(err);
            }
        );

    }

    showSidebar() {
        this.toggleSidebar = !this.toggleSidebar;
        setTimeout(() => {
            if (this.toggleSidebar) {
                // tslint:disable-next-line:max-line-length
                document.getElementById('sidebarcomp').setAttribute('style', 'left:235px; background-color: #0d78c9;');
            } else {
                document.getElementById('sidebarcomp').removeAttribute('style');
            }
        }, 50);


    }

    navigatetokontak(e) {
        const element = e.target;
        const parameter = element.getAttribute('id');
        this.router.navigate(['index/page/p/hubungi_kami/' + parameter]);
    }

    navigatetopubliksi(e) {
        const element = e.target;
        const parameter = element.getAttribute('id');
        this.router.navigate(['index/page/p/publikasi/' + parameter]);
    }
    navigatetosimulasi(e) {
        const element = e.target;
        const parameter = element.getAttribute('id');
        this.router.navigate(['index/page/p/produk dan layanan/' + parameter]);
    }


}
