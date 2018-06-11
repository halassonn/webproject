import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PagenotfoundComponent } from './pagenotfound.component';
import { AuthGuard } from './core/guard/auth.guard';
import { AuthService } from './core/shared/auth.service';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './core/helper/_http/loader/loader.component';
import { DaftarComponent } from './daftar/daftar.component';
import { CanDeactivateGuard } from './core/guard/CanDeactivateGuard';

const routes: Routes = [
    {
        path: '', // loadChildren: 'app/backend/backend.module#BackendModule', canActivate: [AuthGuard]
        loadChildren: 'app/frontend/frontend.module#FrontendModule',
       
        
    },
   {
        path: 'administrator',
        loadChildren: 'app/backend/backend.module#BackendModule', canActivate: [AuthGuard]
   },
    {
        path: 'index/login',
       loadChildren: 'app/login/login.module#LoginModule'
    },
    {
        path: 'index/user/login',
       loadChildren: 'app/login/login.module#LoginModule'
    },
    {
        path: 'index/user', component: LoginComponent
    },
    {
        path: 'index/user/req reset', loadChildren: 'app/login/login.module#LoginModule'
    },
    {
        path: 'index/user/reset', loadChildren: 'app/login/login.module#LoginModule'
    },
    {
        path: '**',
        component: PagenotfoundComponent
    }
];


@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        FormsModule
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthGuard,
        AuthService
    ]
})
export class ApproutingModule { }
