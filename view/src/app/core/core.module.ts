import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'ng-sidebar';
import { ToastrModule } from 'ngx-toastr';
import { NavMenuServices } from './shared/navmenu.service';


import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorComponent } from './helper/editor/editor.component';
import { FileUploadModule } from 'ng2-file-upload';
import { AuthGuard } from './guard/auth.guard';
import { AuthService } from './shared/auth.service';
import { LoaderComponent } from './helper/_http/loader/loader.component';
import { LoaderService } from './helper/_http/loader/loader.service';
import { HttpService } from './helper/_http/http.service';
import { httpServiceFactory } from './helper/_http/http-service.factory';
import { XHRBackend, RequestOptions, HttpModule } from '@angular/http';
import { AlertComponent } from './alert/alert.component';
import { GroupByPipe } from './pipe/groupBy.pipe';
import { CapitalizeFirstPipe } from './pipe/capitalize.pipe';
import { orderByPipe } from './pipe/orderBy.pipe';
import { toArrayPipe } from './pipe/toArray.pipe';
import { FilterPipe } from './pipe/filterBy.pipe';
import { Decode64Pipe } from './pipe/decode64.pipe';
import { _HttpCustomService } from './shared/_http.service';
import { CanDeactivateGuard } from './guard/CanDeactivateGuard';
import { RecaptchaModule } from 'ng-recaptcha';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TrimPipe } from './pipe/trim.pipe';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../../environments/environment';
// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
    // for development
    // return new TranslateHttpLoader(http, '/start-angular/SB-Admin-BS4-Angular-5/master/dist/assets/i18n/', '.json');
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
    declarations: [EditorComponent,
        AlertComponent, GroupByPipe, CapitalizeFirstPipe, orderByPipe, toArrayPipe, FilterPipe, Decode64Pipe, TrimPipe],
    imports: [
        CommonModule,
        SidebarModule.forRoot(),
        ToastrModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        NgbDropdownModule.forRoot(),
        ModalModule.forRoot(),
        FormsModule,
        FileUploadModule,
        ReactiveFormsModule,
        RecaptchaModule.forRoot(),
        NgbModule.forRoot(),
        AgmCoreModule.forRoot({
            // please get your own API key here:
            // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
            apiKey: environment.api_map_google
          })
    ],
    exports: [
        SidebarModule,
        ToastrModule,
        TranslateModule,
        NgbDropdownModule,
        ModalModule,
        FormsModule,
        FileUploadModule,
        EditorComponent,
        ReactiveFormsModule,
        AlertComponent,
        GroupByPipe,
        CapitalizeFirstPipe,
        orderByPipe, toArrayPipe, FilterPipe, Decode64Pipe, RecaptchaModule, NgbModule, TrimPipe, AgmCoreModule
    ],
    providers: [
        NavMenuServices, AuthGuard, AuthService
    ]

})
export class CoreModule { }
