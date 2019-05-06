import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

// MapBox
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

// Cordova plugins
import { Camera } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';

// Authentification
import { GooglePlus } from '@ionic-native/google-plus/ngx';

// Interceptors
import { AuthTokenInterceptor } from './interceptors/auth-token/auth-token.interceptor';
import { BaseUrlInterceptor } from './interceptors/base-url/base-url.interceptor';

// NgRx
import { StoreModule } from '@ngrx/store';
import { appReducers } from './store/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { effectsArray } from './store/effects';

// Environtment
import { environment } from '../environments/environment'; // Angular CLI environemnt

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    HttpClientModule,
    StoreModule.forRoot( appReducers ),
    EffectsModule.forRoot( effectsArray ),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    SharedModule,
    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1IjoiYW5kc2MiLCJhIjoiY2p1c2k4cHl5MGp4eDQzcDVxMTUzdHQ5cSJ9.rCgKIFzn2MwFBb0RweW56A'
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true,
    },
    Camera,
    Geolocation,
    Vibration,
    LaunchNavigator,
    GooglePlus
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
