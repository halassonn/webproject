import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendLayoutComponent } from './backendlayout.component';
import { Routes, RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { HeaderlayoutComponent } from './component/header/headerlayout.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { KategoriComponent } from './page/kategori/kategori.component';
import { PostinganComponent } from './page/postingan/postingan.component';
import { HalamanComponent } from './page/halaman/halaman.component';
import { AuthGuard } from '../core/guard/auth.guard';
import { SettingComponent } from './page/setting/setting.component';
import { LoaderComponent } from '../core/helper/_http/loader/loader.component';



const routes: Routes = [
    {
        path: '', component: BackendLayoutComponent,
        children: [
            { path: '', redirectTo: 'index/dashboard' },
            { path: 'index/dashboard', component: DashboardComponent },
            { path: 'index/kategori', component: KategoriComponent },
            { path: 'index/postingan', component: PostinganComponent },
            { path: 'index/page', component: HalamanComponent },
            { path: 'index/setting', component: SettingComponent },
        ]
    }
];


@NgModule({
    declarations: [
        HeaderlayoutComponent,
        SidebarComponent,
        BackendLayoutComponent,
        DashboardComponent,
        KategoriComponent,
        PostinganComponent,
        HalamanComponent,
        SettingComponent,
        LoaderComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
        RouterModule.forChild(routes)
    ],

    exports: [RouterModule],
    providers: []
})
export class BackendModule { }
