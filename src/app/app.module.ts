import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Drivers } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage-angular';

import localeEs from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';
import { UnauthorizedInterceptorService } from './shared/interceptors/unauthorized-interceptor.service';
import { HeaderInterceptorService } from './shared/interceptors/header-interceptor.service';

import { environment } from 'src/environments/environment';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: environment.SOCKET_IO_URL, options: { } };

registerLocaleData(localeEs);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
    }),
    SocketIoModule.forRoot(config)
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-MX' },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
