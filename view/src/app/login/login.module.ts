import { NgModule, Component } from '@angular/core';
import { PageComponent } from './component/page/page.component';
import { Routes, RouterModule } from '@angular/router';
import { AlertloginComponent } from './shared/alertlogin/alertlogin.component';
import { AlertAuthService } from './shared/alertlogin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';

const routes: Routes = [
    {
        path: '', component: PageComponent
    }
];

@NgModule({
    declarations: [PageComponent, AlertloginComponent],
    imports: [CommonModule, RouterModule.forChild(routes), CoreModule],
    exports: [RouterModule],
    providers: [AlertAuthService]
})

export class LoginModule { }
