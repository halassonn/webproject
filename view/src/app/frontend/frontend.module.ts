import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FrontendLayoutComponent } from './frontendlayout.component';
import { Routes, RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { patch } from 'webdriver-js-extender';
import { ContactComponent } from './page/contact/contact.component';
import { IndexComponent } from './page/index/index.component';
import { PublikasiComponent } from './page/publikasi/publikasi.component';
import { PagenotfoundModule } from '../pagenotfound.module';
import { PagenotfoundComponent } from '../pagenotfound.component';
import { SimulatorprodukComponent } from './page/simulatorproduk/simulatorproduk.component';


const routes: Routes = [
    {
        path: '', component: FrontendLayoutComponent,
        children: [
            { path: '', component: IndexComponent },
            { path: 'index', component: IndexComponent },
            { path: 'index/page/:page', component: IndexComponent },
            { path: 'index/page/p/hubungi_kami/:param', component: ContactComponent },
            { path: 'index/page/p/publikasi', component: PublikasiComponent },
            { path: 'index/page/p/publikasi/:laporan', component: PublikasiComponent },
            { path: 'index/page/p/produk dan layanan/:simulator', component: SimulatorprodukComponent },
            {
                path: '****',
                component: PagenotfoundComponent
            }
        ]
    },
];

@NgModule({

    declarations: [
        FrontendLayoutComponent,
        ContactComponent,
        IndexComponent,
        PublikasiComponent,
        SimulatorprodukComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        CoreModule,
        PagenotfoundModule
    ],
    exports: [RouterModule],
    providers: []
})
export class FrontendModule { }
