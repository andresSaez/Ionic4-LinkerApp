import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

// MapBox
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

// Cordova plugins
import { Camera } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';

// Interceptors
import { AuthTokenInterceptor } from './interceptors/auth-token/auth-token.interceptor';
import { BaseUrlInterceptor } from './interceptors/base-url/base-url.interceptor';




@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1IjoiYW5kc2MiLCJhIjoiY2p1c2k4cHl5MGp4eDQzcDVxMTUzdHQ5cSJ9.rCgKIFzn2MwFBb0RweW56A'
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthTokenInterceptor,
    //   multi: true,
    // },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: BaseUrlInterceptor,
    //   multi: true,
    // },
    Camera,
    Geolocation,
    Vibration
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
