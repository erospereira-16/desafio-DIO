import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from '../app/helpers/auth-Interceptor';
import { HttpRequestInterceptor } from '../app/helpers/http-request.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { MainLayoutComponent } from '../app/layouts/main-layout/main-layout.component';
import { MainHeaderComponent } from '../app/layouts/main-header/main-header.component';
import { SharedModule } from './shared.module';
import { MasterHeaderComponent } from './layouts/master-header/master-header.component';
import { MasterLayoutComponent } from './layouts/master-layout/master-layout.component';
import { IConfig, NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask, provideNgxMask } from 'ngx-mask'
import { PartnerHeaderComponent } from './layouts/partner-header/partner-header.component';
import { PartnerLayoutComponent } from './layouts/partner-layout/partner-layout.component';
registerLocaleData(ptBr);
const maskConfig: Partial<IConfig> = {
  validation: false,
};
@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    MainHeaderComponent,
    MasterLayoutComponent,
    MasterHeaderComponent,
    PartnerHeaderComponent,
    PartnerLayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    NgxSpinnerModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgxMaskDirective, NgxMaskPipe
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideNgxMask(),
    provideEnvironmentNgxMask(maskConfig),
    // CurrencyPipe,
    BsModalService,
    BsModalRef,
    { provide: LOCALE_ID, useValue: 'pt' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
