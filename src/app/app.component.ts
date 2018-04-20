import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ClassSchedulePage } from '../pages/class-schedule/class-schedule';
import { NewsPage } from '../pages/news/news';
import { CampusMapPage } from '../pages/campus-map/campus-map';
import { TutoringPage } from '../pages/tutoring/tutoring';
import { RadioPage } from '../pages/radio/radio';
import { CalendarPage } from '../pages/calendar/calendar';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { BuildingHoursPage } from '../pages/building-hours/building-hours';

import { UserStateProvider, UserState } from '../providers/user-state/user-state';
import { CredentialsProvider } from '../providers/credentials/credentials';
import { ScheduleServiceProvider } from '../providers/schedule-service/schedule-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = LoginPage;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private inAppBrowser: InAppBrowser,
              private userState : UserStateProvider,
              private credentialsProvider : CredentialsProvider,
              private scheduleServiceProvider : ScheduleServiceProvider) {

    platform.ready().then(() => {
		statusBar.overlaysWebView(false);
      statusBar.styleLightContent();
		statusBar.backgroundColorByHexString('#003865');
      splashScreen.hide();
    });
  }

  goToHome(params){
    if (!params) params = {};
    this.navCtrl.setRoot(HomePage);
  }

  goToClassSchedule(params){
    if (!params) params = {};
    this.navCtrl.push(ClassSchedulePage);
  }

  goToLogin(params){
    if (!params) params = { reuse : true };
    this.navCtrl.setRoot(LoginPage, params);
  }

  goToLoginNoReuse() {
    let params = { reuse : false };
    this.goToLogin(params);
  }

  goToNews(params){
    if (!params) params = {};
    this.navCtrl.push(NewsPage);
  }

  goToCampusMap(params){
    if (!params) params = {};
    this.navCtrl.push(CampusMapPage);
  }

  goToTutoring(params){
    if (!params) params = {};
    this.navCtrl.push(TutoringPage);
  }

  goToRadio(params){
    if (!params) params = {};
    this.navCtrl.push(RadioPage);
  }

  goToCalendar(params){
    if( !params) params = {};
    this.navCtrl.push(CalendarPage);
  }
  
  goToBuildingHours(params){
	  if( !params) params = {};
	  this.navCtrl.setRoot(BuildingHoursPage);
  }

  openBrowser(link) {
	  this.inAppBrowser.create(link, '_system', 'location=yes');
  }

  isCredentialed() : boolean {
    return this.userState.getUserState() == UserState.Credentialed;
  }

  isGuest() : boolean {
    return this.userState.getUserState() == UserState.Guest;
  }

  logout() {
    this.credentialsProvider.clearWarriorWebCredentials();
    this.scheduleServiceProvider.clearCache();
    this.goToLogin({});
  }
}
