import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ChamadoProvider } from '../providers/chamado/chamado';
import { SideMenuContentComponent } from '../shared/side-menu-content/side-menu-content.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { NovoChamadoPage } from '../pages/novo-chamado/novo-chamado';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    NovoChamadoPage,
    SideMenuContentComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBYnWNOHVpohjLFRnWEB3Ltso-ru0BgSHI",
      authDomain: "helpdesk-sw.firebaseapp.com",
      databaseURL: "https://helpdesk-sw.firebaseio.com",
      projectId: "helpdesk-sw",
      storageBucket: "helpdesk-sw.appspot.com",
      messagingSenderId: "624853994507"      
    }),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    NovoChamadoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ChamadoProvider
  ]
})
export class AppModule {
  static get(arg0: any): any {
      throw new Error("Method not implemented.");
  }
  static injector: typeof AppModule;
}
