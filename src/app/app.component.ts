import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser, InAppBrowserEvent, InAppBrowserObject } from '@ionic-native/in-app-browser';
import { ClassSchedulePage } from '../pages/class-schedule/class-schedule';
import { NewsPage } from '../pages/news/news';
import { CampusMapPage } from '../pages/campus-map/campus-map';
import { TutoringPage } from '../pages/tutoring/tutoring';
import { RadioPage } from '../pages/radio/radio';
import { CalendarPage } from '../pages/calendar/calendar';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { BuildingHoursPage } from '../pages/building-hours/building-hours';
import { LoadingController } from 'ionic-angular';

import { UserStateProvider, UserState } from '../providers/user-state/user-state';
import { CredentialsProvider } from '../providers/credentials/credentials';
import { ScheduleServiceProvider } from '../providers/schedule-service/schedule-service';
import { AppAvailability } from '@ionic-native/app-availability';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) navCtrl: Nav;
	rootPage: any = LoginPage;
	hasFacebook: string = 'Dont know';

	readonly getInputByValueScript: string = "function getInputByValue(value){var inputs = document.getElementsByTagName('input');for(var i = 0; i < inputs.length; i++){if(inputs[i].value == value){return inputs[i];}}return null;}";
	readonly buttonClickSource: string = this.getInputByValueScript + "getInputByValue('Sign In').click();";
	student_planning_link = 'https://warriorwebss.lcsc.edu/Student/';

	constructor(private platform: Platform,
		statusBar: StatusBar,
		splashScreen: SplashScreen,
		private inAppBrowser: InAppBrowser,
		private userState: UserStateProvider,
		private credentialsProvider: CredentialsProvider,
		private scheduleServiceProvider: ScheduleServiceProvider,
		private appAvailability: AppAvailability,
		private loadingController: LoadingController) {

		platform.ready().then(() => {
			statusBar.overlaysWebView(false);
			statusBar.styleLightContent();
			statusBar.backgroundColorByHexString('#003865');
			splashScreen.hide();
		});
	}

	goToHome(params) {
		if (!params) params = {};
		this.navCtrl.setRoot(HomePage);
	}

	goToClassSchedule(params) {
		if (!params) params = {};
		this.navCtrl.push(ClassSchedulePage);
	}

	goToLogin(params) {
		if (!params) params = { reuse: true };
		this.navCtrl.setRoot(LoginPage, params);
	}

	goToLoginNoReuse() {
		let params = { reuse: false };
		this.goToLogin(params);
	}

	goToNews(params) {
		if (!params) params = {};
		this.navCtrl.push(NewsPage);
	}

	goToCampusMap(params) {
		if (!params) params = {};
		this.navCtrl.push(CampusMapPage);
	}

	goToTutoring(params) {
		if (!params) params = {};
		this.navCtrl.push(TutoringPage);
	}

	goToRadio(params) {
		if (!params) params = {};
		this.navCtrl.push(RadioPage);
	}

	goToCalendar(params) {
		if (!params) params = {};
		this.navCtrl.push(CalendarPage);
	}

	goToBuildingHours(params) {
		if (!params) params = {};
		this.navCtrl.setRoot(BuildingHoursPage);
	}

	openBrowser(link) {
		this.inAppBrowser.create(link, '_system', 'location=no');
	}

	async handleStudentPlanningOpen() {

		let loader = this.loadingController.create({ content: 'Accessing student planning...' });
		loader.present();

		let browser: InAppBrowserObject = this.inAppBrowser.create(this.student_planning_link, '_blank', 'clearcache=yes,hidden=yes');

		if (this.userState.getUserState() == UserState.Guest) {
			browser.show();
			loader.dismiss();
			return;
		}

		let username = await this.credentialsProvider.getWarriorWebUsername();
		let password = await this.credentialsProvider.getWarriorWebPassword();

		let load_count = 0;
		browser.on('loadstop').subscribe(async (ev: InAppBrowserEvent) => {
			load_count++;
			if (load_count == 1) {
				await this.loginToWarriorWeb(browser, username, password);
			}
			else if (load_count == 2) {
				browser.show();
				loader.dismiss();
			}
		});
	}

	async loginToWarriorWeb(browser, username, password): Promise<any> {
		return await
			browser.executeScript({ code: "document.getElementById('UserName').value = '" + username + "';" }).then(
				browser.executeScript({ code: "document.getElementById('Password').value = '" + password + "';" })).then(
					browser.executeScript({ code: this.buttonClickSource }));
	}

	checkFacebook() {
		let app;

		if (this.platform.is('ios')) {
			app = 'fb://';
		} else if (this.platform.is('android')) {
			app = 'com.facebook.katana';
		}

		this.appAvailability.check(app)
			.then(
				(yes: boolean) => this.hasFacebook = 'Available',
				(no: boolean) => this.hasFacebook = 'Not Available'
			);
	}

	openFacebook() {
		this.checkFacebook();
		if (this.hasFacebook == 'Available') {
			this.inAppBrowser.create("fb://page/59960515055", '_system', 'location=yes');
		}
		else {
			this.inAppBrowser.create("https://www.facebook.com/LewisClarkState/", '_system', 'location=no');
		}
	}

	isCredentialed(): boolean {
		return this.userState.getUserState() == UserState.Credentialed;
	}

	isGuest(): boolean {
		return this.userState.getUserState() == UserState.Guest;
	}

	logout() {
		this.credentialsProvider.clearWarriorWebCredentials();
		this.scheduleServiceProvider.clearCache();
		this.goToLoginNoReuse();
	}
}
