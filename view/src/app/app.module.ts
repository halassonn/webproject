import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, } from '@angular/core';
import { SidebarModule } from 'ng-sidebar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { XHRBackend, RequestOptions, HttpModule } from '@angular/http';
import { ApproutingModule } from './app-routing.module';
import { PagenotfoundComponent } from './pagenotfound.component';
import { HttpService } from './core/helper/_http/http.service';
import { httpServiceFactory } from './core/helper/_http/http-service.factory';
import { LoaderService } from './core/helper/_http/loader/loader.service';
import { LoginComponent } from './login/login.component';
import { LoaderComponent } from './core/helper/_http/loader/loader.component';
import { HalamanService } from './core/shared/halaman.service';
import { AlertService } from './core/alert/alert.service';
import { PostService } from './core/shared/post.service';
import { IndexService } from './frontend/page/index/index.service';
import { SettingDataPerusahaanService } from './core/shared/_settingDataperusahaan.service';
import { _HttpCustomService } from './core/shared/_http.service';
import { DaftarComponent } from './daftar/daftar.component';
import { CanDeactivateGuard } from './core/guard/CanDeactivateGuard';
import { CoreModule } from './core/core.module';
import { AlertloginComponent } from './login/shared/alertlogin/alertlogin.component';

import { RecaptchaModule } from 'ng-recaptcha';
import { PagenotfoundModule } from './pagenotfound.module';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DaftarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ApproutingModule,
    PagenotfoundModule,

  ],
  providers: [
    LoaderService, {
      provide: HttpService,
      useFactory: httpServiceFactory,
      deps: [XHRBackend, RequestOptions, LoaderService]
    }, HalamanService, AlertService, PostService, IndexService, Title, SettingDataPerusahaanService,
    _HttpCustomService, CanDeactivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
