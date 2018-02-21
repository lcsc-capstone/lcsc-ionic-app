import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CalendarDropdownPage } from '../pages/calendar-dropdown/calendar-dropdown';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { NewsPage } from '../pages/news/news';
import { CampusMapPage } from '../pages/campus-map/campus-map';
import { ClassSchedulePage } from '../pages/class-schedule/class-schedule';
import { CalendarPage } from '../pages/calendar/calendar';
import { AboutPage } from '../pages/about/about';
import { RadioPage } from '../pages/radio/radio';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProfilePage,
    NewsPage,
    CampusMapPage,
    ClassSchedulePage,
    CalendarPage,
    AboutPage,
    RadioPage,
    CalendarDropdownPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProfilePage,
    NewsPage,
    CampusMapPage,
    ClassSchedulePage,
    CalendarPage,
    AboutPage,
    RadioPage,
    CalendarDropdownPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
