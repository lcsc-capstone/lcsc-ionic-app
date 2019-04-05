import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HTTP } from '@ionic-native/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NewsPage } from '../pages/news/news';
import { CampusMapPage } from '../pages/campus-map/campus-map';
import { ClassSchedulePage } from '../pages/class-schedule/class-schedule';
import { CalendarPage } from '../pages/calendar/calendar';
import { CalendarDropdownPageModule } from '../pages/calendar/calendar-dropdown.module'
import { TutoringPage } from '../pages/tutoring/tutoring';
import { LoginPage } from '../pages/login/login';
import { BuildingHoursPage } from '../pages/building-hours/building-hours';
import { BuildingDetailsPage } from '../pages/building-details/building-details';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Calendar } from '@ionic-native/calendar';
import { SecureStorage } from '@ionic-native/secure-storage';
import { Network } from '@ionic-native/network';
import { ScheduleServiceProvider } from '../providers/schedule-service/schedule-service';
import { CredentialsProvider } from '../providers/credentials/credentials';
import { UserStateProvider } from '../providers/user-state/user-state';
import { AppAvailability } from '@ionic-native/app-availability';
import { DeviceInfoProvider } from '../providers/device-info/device-info';
import {CalendarSorter} from '../providers/event-calendar/calendarSort';

@NgModule({
	declarations: [
		MyApp,
		HomePage,
		NewsPage,
		CampusMapPage,
		ClassSchedulePage,
		CalendarPage,
		TutoringPage,
		LoginPage,
		BuildingHoursPage,
		BuildingDetailsPage
	],
	imports: [
		BrowserModule,
		HttpModule,
		HttpClientModule,
		IonicModule.forRoot(MyApp, {
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
		IonicStorageModule.forRoot(),
		CalendarDropdownPageModule
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		HomePage,
		NewsPage,
		CampusMapPage,
		ClassSchedulePage,
		CalendarPage,
		TutoringPage,
		LoginPage,
		BuildingHoursPage,
		BuildingDetailsPage
	],
	providers: [
		InAppBrowser,
		SecureStorage,
		StatusBar,
		SplashScreen,
		Calendar,
		Network,
		HTTP,
		CalendarSorter,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		ScheduleServiceProvider,
		CredentialsProvider,
		UserStateProvider,
		AppAvailability,
    DeviceInfoProvider
	]
})
export class AppModule { }
