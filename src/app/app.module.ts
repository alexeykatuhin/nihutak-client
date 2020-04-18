import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

// used to create fake backend

import { AppComponent } from './app.component';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './components/home';
import { appRoutingModule } from './app-routing.module';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import {MultiTranslateHttpLoader} from "ngx-translate-multi-http-loader";
import { ExternalLoginCallbackComponent } from './components/auth/external-login-callback/login-callback.component';

import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

registerLocaleData(en);
export function HttpLoaderFactory(http: HttpClient) {
    return new MultiTranslateHttpLoader(http, [
        {prefix: "./assets/i18n/", suffix: ".json"}
    ]);
}

let config = new AuthServiceConfig([
    {
       id: GoogleLoginProvider.PROVIDER_ID,
       provider: new GoogleLoginProvider('1023105569360-9opdg0vp5r8arc481fuevhglc61a7v0h.apps.googleusercontent.com')
    },

]);
export function provideConfig()
   {
      return config;
   }

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        IconsProviderModule,
        NgZorroAntdModule,
        FormsModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),       
    SocialLoginModule.initialize(config)
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        ExternalLoginCallbackComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: NZ_I18N, useValue: en_US },
        {
            provide: AuthServiceConfig,
            useFactory: provideConfig
          }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }