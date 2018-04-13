import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HTTP, HTTPResponse } from '@ionic-native/http'
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { NewsPage } from '../pages/news/news';
import { CampusMapPage } from '../pages/campus-map/campus-map';
import { ClassSchedulePage } from '../pages/class-schedule/class-schedule';
import { CalendarPage } from '../pages/calendar/calendar';
import { CalendarDropdownPage } from '../pages/calendar/calendar-dropdown';
import { TutoringPage } from '../pages/tutoring/tutoring';
import { RadioPage } from '../pages/radio/radio';
import { LoginPage } from '../pages/login/login';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Calendar } from '@ionic-native/calendar';
import { SecureStorage } from '@ionic-native/secure-storage';
import { Network } from '@ionic-native/network';
import { ScheduleServiceProvider } from '../providers/schedule-service/schedule-service';
import { CredentialsProvider } from '../providers/credentials/credentials';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProfilePage,
    NewsPage,
    CampusMapPage,
    ClassSchedulePage,
    CalendarPage,
	  CalendarDropdownPage,
    TutoringPage,
    RadioPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
      platforms: {
        android: {
    			backButtonText: "",
    			backButtonIcon: "md-arrow-back",
    			iconMode: "md",
    			modalEnter: "modal-md-slide-in",
    			modalLeave: "modal-md-slide-out",
    			pageTransition: "md",
	      },
        ios: {
          backButtonText: "",
			    backButtonIcon: "ios-arrow-back",
        	iconMode: "ios",
    			modalEnter: "modal-ios-slide-in",
    			modalLeave: "modal-ios-slide-out",
    			pageTransition: "ios",
        }
      }
    }),
    IonicStorageModule.forRoot()
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
	 CalendarDropdownPage,
    TutoringPage,
    RadioPage,
    LoginPage
  ],
  providers: [
    InAppBrowser,
    SecureStorage,
    StatusBar,
    SplashScreen,
	 Calendar,
	 Network,
	 HTTP,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ScheduleServiceProvider,
    CredentialsProvider
  ]
})
export class AppModule {}
