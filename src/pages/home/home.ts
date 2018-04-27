import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { Storage } from '@ionic/storage';
import { ClassSchedulePage } from '../class-schedule/class-schedule';
import { CalendarPage } from '../calendar/calendar';
import { NewsPage } from '../news/news';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Calendar } from '@ionic-native/calendar';
import { Network } from '@ionic-native/network';
import { ScheduleServiceProvider } from '../../providers/schedule-service/schedule-service';
import { AlertController } from 'ionic-angular';
import { UserStateProvider, UserState } from '../../providers/user-state/user-state';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	public news = { '1': {}, '2': {}, '3': {}, '4': {}, '5': {}, '6': {}, '7': {}, '8': {}, '9': {}, '10': {} };
	public Academics;
	public Entertainment;
	public Athletics;
	public StudentActivities;
	public ResidentLife;
	public CampusRec;
	public Events = [{}, {}, {}];
	public AcademicArr = [{}, {}, {}];

	private scheduleItems: any = [];

	schedulePulled = false;

	constructor(
		public atrCtrl: AlertController,
		public navCtrl: NavController,
		public navParams: NavParams,
		private http: HTTP,
		private storage: Storage,
		private inAppBrowser: InAppBrowser,
		private zone: NgZone,
		private calendar: Calendar,
		private network: Network,
		private scheduleServiceProvider: ScheduleServiceProvider,
		private userStateProvider: UserStateProvider) {

		this.zone.run(() => {
			this.schedulePulled = false;
		});

		if (this.isCredentialed()) {

			this.scheduleServiceProvider.getTodaysClassScheduleData(data => {
				this.zone.run(() => {
					this.scheduleItems = data;

					this.scheduleItems.sort((a, b): number => {
						if (a.daySecond > b.daySecond) {
							return 1;
						}
						else if (a.daySecond == b.daySecond) {
							return 0;
						}
						return -1;
					});
					this.schedulePulled = true;
				});
			});
		}
	}

	isGuest(): boolean {
		return this.userStateProvider.getUserState() == UserState.Guest;
	}

	isCredentialed(): boolean {
		return this.userStateProvider.getUserState() == UserState.Credentialed;
	}

	scheduleCached(): boolean {
		return this.schedulePulled;
	}

	hasScheduleDataForToday(): boolean {
		return this.scheduleItems.length > 0;
	}

	isConnected(): boolean {
		let conntype = this.network.type;
		return conntype && conntype !== 'unknown' && conntype !== 'none';
	}

	goToClassSchedule(params) {
		if (!params) params = {};
		this.navCtrl.push(ClassSchedulePage);
	}
	goToCalendar(params) {
		if (!params) params = {};
		this.navCtrl.push(CalendarPage);
	}
	goToNews(params) {
		if (!params) params = {};
		this.navCtrl.push(NewsPage);
	}

	ionViewDidLoad() {
		let current_time = new Date().getTime();
		let midnight = new Date(Math.floor(current_time / 86400000) * 86400000 - 54000000).getTime();
		this.storage.get('last_time').then(val => {
			if ((!val || val <= midnight) && this.isConnected()) {
				// This code will fetch the most recent 3 news titles and links.
				this.storage.set('last_time', current_time);
				this.http.get(`https://www.lcsc.edu/news`, {}, {}).then(data => {
					let html = data.data;
					let list = html.split(/<h4><a href="/g);
					this.news['1']['link'] = list[1].split(/"/g)[0];
					this.news['1']['title'] = list[1].split(/title="/g)[1].split(/"/g)[0].replace(/&amp;/g, '&');
					this.news['1']['date'] = list[1].split(/<span>/g)[1].split('<')[0];
					this.news['2']['link'] = list[2].split(/"/g)[0];
					this.news['2']['title'] = list[2].split(/title="/g)[1].split(/"/g)[0].replace(/&amp;/g, '&');
					this.news['2']['date'] = list[2].split(/<span>/g)[1].split('<')[0];
					this.news['3']['link'] = list[3].split(/"/g)[0];
					this.news['3']['title'] = list[3].split(/title="/g)[1].split(/"/g)[0].replace(/&amp;/g, '&');
					this.news['3']['date'] = list[3].split(/<span>/g)[1].split('<')[0];
					this.news['4']['link'] = list[4].split(/"/g)[0];
					this.news['4']['title'] = list[4].split(/title="/g)[1].split(/"/g)[0].replace(/&amp;/g, '&');
					this.news['4']['date'] = list[4].split(/<span>/g)[1].split('<')[0];
					this.news['5']['link'] = list[5].split(/"/g)[0];
					this.news['5']['title'] = list[5].split(/title="/g)[1].split(/"/g)[0].replace(/&amp;/g, '&');
					this.news['5']['date'] = list[5].split(/<span>/g)[1].split('<')[0];
					this.news['6']['link'] = list[6].split(/"/g)[0];
					this.news['6']['title'] = list[6].split(/title="/g)[1].split(/"/g)[0].replace(/&amp;/g, '&');
					this.news['6']['date'] = list[6].split(/<span>/g)[1].split('<')[0];
					this.news['7']['link'] = list[7].split(/"/g)[0];
					this.news['7']['title'] = list[7].split(/title="/g)[1].split(/"/g)[0].replace(/&amp;/g, '&');
					this.news['7']['date'] = list[7].split(/<span>/g)[1].split('<')[0];
					this.news['8']['link'] = list[8].split(/"/g)[0];
					this.news['8']['title'] = list[8].split(/title="/g)[1].split(/"/g)[0].replace(/&amp;/g, '&');
					this.news['8']['date'] = list[8].split(/<span>/g)[1].split('<')[0];
					this.news['9']['link'] = list[9].split(/"/g)[0];
					this.news['9']['title'] = list[9].split(/title="/g)[1].split(/"/g)[0].replace(/&amp;/g, '&');
					this.news['9']['date'] = list[9].split(/<span>/g)[1].split('<')[0];
					this.news['10']['link'] = list[10].split(/"/g)[0];
					this.news['10']['title'] = list[10].split(/title="/g)[1].split(/"/g)[0].replace(/&amp;/g, '&');
					this.news['10']['date'] = list[10].split(/<span>/g)[1].split('<')[0];
					this.storage.set('news', this.news);
				}).catch(err => { alert(err) });

				/* #######################################################################
				Academics 					- 0rn5mgclnhc7htmh0ht0cc5pgk@group.calendar.google.com
				Entertainment 				- m6h2d5afcjfnmaj8qr7o96q89c@group.calendar.google.com
				Athletics 					- d6jbgjhudph2mpef1cguhn4g9g@group.calendar.google.com
				StudentActivities 		- l9qpkh5gb7dhjqv8nm0mn098fk@group.calendar.google.com
				ResidentLife 				- gqv0n6j15pppdh0t8adgc1n1ts@group.calendar.google.com
				CampusRec 					- h4j413d3q0uftb2crk0t92jjlc@group.calendar.google.com
				####################################################################### */
				let curDay = (new Date().getDate());
				let curMonth = (new Date().getMonth() + 1); //Months are from 0-11 NOT 1-12
				let curYear = (new Date().getFullYear());

				this.http.get(`https://www.googleapis.com/calendar/v3/calendars/0rn5mgclnhc7htmh0ht0cc5pgk@group.calendar.google.com/events?maxResults=2500&timeMin=${curYear}-0${curMonth}-${curDay}T00:00:00-07:00&timeMax=${curYear + 1}-0${curMonth}-${curDay}T00:00:00-07:00&singleEvents=true&key=AIzaSyASiprsGk5LMBn1eCRZbupcnC1RluJl_q0`, {}, {}).then(data => {
					this.Academics = JSON.parse(data.data);
					this.storage.set('Academics', this.Academics);
					this.http.get(`https://www.googleapis.com/calendar/v3/calendars/m6h2d5afcjfnmaj8qr7o96q89c@group.calendar.google.com/events?maxResults=2500&timeMin=${curYear}-0${curMonth}-${curDay}T00:00:00-07:00&timeMax=${curYear + 1}-0${curMonth}-${curDay}T00:00:00-07:00&singleEvents=true&key=AIzaSyASiprsGk5LMBn1eCRZbupcnC1RluJl_q0`, {}, {}).then(data => {
						this.Entertainment = JSON.parse(data.data);
						this.storage.set('Entertainment', this.Entertainment);
						this.http.get(`https://www.googleapis.com/calendar/v3/calendars/d6jbgjhudph2mpef1cguhn4g9g@group.calendar.google.com/events?maxResults=2500&timeMin=${curYear}-0${curMonth}-${curDay}T00:00:00-07:00&timeMax=${curYear + 1}-0${curMonth}-${curDay}T00:00:00-07:00&singleEvents=true&key=AIzaSyASiprsGk5LMBn1eCRZbupcnC1RluJl_q0`, {}, {}).then(data => {
							this.Athletics = JSON.parse(data.data);
							this.storage.set('Athletics', this.Athletics);
							this.http.get(`https://www.googleapis.com/calendar/v3/calendars/l9qpkh5gb7dhjqv8nm0mn098fk@group.calendar.google.com/events?maxResults=2500&timeMin=${curYear}-0${curMonth}-${curDay}T00:00:00-07:00&timeMax=${curYear + 1}-0${curMonth}-${curDay}T00:00:00-07:00&singleEvents=true&key=AIzaSyASiprsGk5LMBn1eCRZbupcnC1RluJl_q0`, {}, {}).then(data => {
								this.StudentActivities = JSON.parse(data.data);
								this.storage.set('StudentActivities', this.StudentActivities);
								this.http.get(`https://www.googleapis.com/calendar/v3/calendars/gqv0n6j15pppdh0t8adgc1n1ts@group.calendar.google.com/events?maxResults=2500&timeMin=${curYear}-0${curMonth}-${curDay}T00:00:00-07:00&timeMax=${curYear + 1}-0${curMonth}-${curDay}T00:00:00-07:00&singleEvents=true&key=AIzaSyASiprsGk5LMBn1eCRZbupcnC1RluJl_q0`, {}, {}).then(data => {
									this.ResidentLife = JSON.parse(data.data);
									this.storage.set('ResidentLife', this.ResidentLife);
									this.http.get(`https://www.googleapis.com/calendar/v3/calendars/h4j413d3q0uftb2crk0t92jjlc@group.calendar.google.com/events?maxResults=2500&timeMin=${curYear}-0${curMonth}-${curDay}T00:00:00-07:00&timeMax=${curYear + 1}-0${curMonth}-${curDay}T00:00:00-07:00&singleEvents=true&key=AIzaSyASiprsGk5LMBn1eCRZbupcnC1RluJl_q0`, {}, {}).then(data => {
										this.CampusRec = JSON.parse(data.data);
										this.storage.set('CampusRec', this.CampusRec);

										let merged = [];
										let acMerged = [];
										let n = 0;
										let offset = 0

										for (var x = 0; x < 3; x++) {
											if (this.Academics.items[x]) {
												let e = { StartDate: new Date((this.Academics.items[x].start.dateTime || this.Academics.items[x].start.date + 'T00:00:00-07:00')).getTime() + offset, EndDate: new Date((this.Academics.items[x].end.dateTime || this.Academics.items[x].end.date + 'T00:00:00-07:00')).getTime() + offset, Summary: this.Academics.items[x].summary, Description: this.Academics.items[x].description, Calendar: this.Academics.summary, Location: this.Academics.items[x].location };
												if ((e.EndDate - e.StartDate) % 86400000 == 0) {
													e.EndDate--;
												}
												acMerged.push(e);
											}
										}
										for (var y = 0; y < 3; y++) {
											if (this.Entertainment.items[y]) {
												let e = { StartDate: new Date((this.Entertainment.items[y].start.dateTime || this.Entertainment.items[y].start.date + 'T00:00:00-07:00')).getTime() + offset, EndDate: new Date((this.Entertainment.items[y].end.dateTime || this.Entertainment.items[y].end.date + 'T00:00:00-07:00')).getTime() + offset, Summary: this.Entertainment.items[y].summary, Description: this.Entertainment.items[y].description, Calendar: this.Entertainment.summary, Location: this.Entertainment.items[y].location };
												if ((e.EndDate - e.StartDate) % 86400000 == 0) {
													e.EndDate--;
												}
												merged.push(e);
											}
										}
										for (var z = 0; z < 3; z++) {
											if (this.Athletics.items[z]) {
												let e = { StartDate: new Date((this.Athletics.items[z].start.dateTime || this.Athletics.items[z].start.date + 'T00:00:00-07:00')).getTime() + offset, EndDate: new Date((this.Athletics.items[z].end.dateTime || this.Athletics.items[z].end.date + 'T00:00:00-07:00')).getTime() + offset, Summary: this.Athletics.items[z].summary, Description: this.Athletics.items[z].description, Calendar: this.Athletics.summary, Location: this.Athletics.items[z].location }
												if ((e.EndDate - e.StartDate) % 86400000 == 0) {
													e.EndDate--;
												}
												merged.push(e);
											}
										}
										for (var i = 0; i < 3; i++) {
											if (this.StudentActivities.items[i]) {
												let e = { StartDate: new Date((this.StudentActivities.items[i].start.dateTime || this.StudentActivities.items[i].start.date + 'T00:00:00-07:00')).getTime() + offset, EndDate: new Date((this.StudentActivities.items[i].end.dateTime || this.StudentActivities.items[i].end.date + 'T00:00:00-07:00')).getTime() + offset, Summary: this.StudentActivities.items[i].summary, Description: this.StudentActivities.items[i].description, Calendar: this.StudentActivities.summary, Location: this.StudentActivities.items[i].location };
												if ((e.EndDate - e.StartDate) % 86400000 == 0) {
													e.EndDate--;
												}
												merged.push(e);
											}
										}
										for (var j = 0; j < 3; j++) {
											if (this.ResidentLife.items[j]) {
												let e = { StartDate: new Date((this.ResidentLife.items[j].start.dateTime || this.ResidentLife.items[j].start.date + 'T00:00:00-07:00')).getTime() + offset, EndDate: new Date((this.ResidentLife.items[j].end.dateTime || this.ResidentLife.items[j].end.date + 'T00:00:00-07:00')).getTime() + offset, Summary: this.ResidentLife.items[j].summary, Description: this.ResidentLife.items[j].description, Calendar: this.ResidentLife.summary, Location: this.ResidentLife.items[j].location };
												if ((e.EndDate - e.StartDate) % 86400000 == 0) {
													e.EndDate--;
												}
												merged.push(e);
											}
										}
										for (var k = 0; k < 3; k++) {
											if (this.CampusRec.items[k]) {
												let e = { StartDate: new Date((this.CampusRec.items[k].start.dateTime || this.CampusRec.items[k].start.date + 'T00:00:00-07:00')).getTime() + offset, EndDate: new Date((this.CampusRec.items[k].end.dateTime || this.CampusRec.items[k].end.date + 'T00:00:00-07:00')).getTime() + offset, Summary: this.CampusRec.items[k].summary, Description: this.CampusRec.items[k].description, Calendar: this.CampusRec.summary, Location: this.CampusRec.items[k].location };
												if ((e.EndDate - e.StartDate) % 86400000 == 0) {
													e.EndDate--;
												}
												merged.push(e);
											}
										}
										merged.sort(function(a, b) { return a.StartDate - b.StartDate }).forEach(event => {
											if (n < 3) {
												this.Events[n++] = event;
											}
										});
										for (let n = 0; n < 3; n++) {
											this.AcademicArr[n] = acMerged[n];
										}
									});
								});
							});
						});
					});
				});
			} else {
				// This code will use the same news that is stored on the phone already.
				this.storage.get('news').then(val => {
					this.news = val;
					this.storage.get('Academics').then(events => {
						this.Academics = events;
						this.storage.get('Entertainment').then(events => {
							this.Entertainment = events;
							this.storage.get('Athletics').then(events => {
								this.Athletics = events;
								this.storage.get('StudentActivities').then(events => {
									this.StudentActivities = events;
									this.storage.get('ResidentLife').then(events => {
										this.ResidentLife = events;
										this.storage.get('CampusRec').then(events => {
											this.CampusRec = events;

											let merged = [];
											let acMerged = [];
											let n = 0;
											let offset = 0

											for (var x = 0; x < 3; x++) {
												if (this.Academics.items[x]) {
													let e = { StartDate: new Date((this.Academics.items[x].start.dateTime || this.Academics.items[x].start.date + 'T00:00:00-07:00')).getTime() + offset, EndDate: new Date((this.Academics.items[x].end.dateTime || this.Academics.items[x].end.date + 'T00:00:00-07:00')).getTime() + offset, Summary: this.Academics.items[x].summary, Description: this.Academics.items[x].description, Calendar: this.Academics.summary, Location: this.Academics.items[x].location };
													if ((e.EndDate - e.StartDate) % 86400000 == 0) {
														e.EndDate--;
													}
													acMerged.push(e);
												}
											}
											for (var y = 0; y < 3; y++) {
												if (this.Entertainment.items[y]) {
													let e = { StartDate: new Date((this.Entertainment.items[y].start.dateTime || this.Entertainment.items[y].start.date + 'T00:00:00-07:00')).getTime() + offset, EndDate: new Date((this.Entertainment.items[y].end.dateTime || this.Entertainment.items[y].end.date + 'T00:00:00-07:00')).getTime() + offset, Summary: this.Entertainment.items[y].summary, Description: this.Entertainment.items[y].description, Calendar: this.Entertainment.summary, Location: this.Entertainment.items[y].location };
													if ((e.EndDate - e.StartDate) % 86400000 == 0) {
														e.EndDate--;
													}
													merged.push(e);
												}
											}
											for (var z = 0; z < 3; z++) {
												if (this.Athletics.items[z]) {
													let e = { StartDate: new Date((this.Athletics.items[z].start.dateTime || this.Athletics.items[z].start.date + 'T00:00:00-07:00')).getTime() + offset, EndDate: new Date((this.Athletics.items[z].end.dateTime || this.Athletics.items[z].end.date + 'T00:00:00-07:00')).getTime() + offset, Summary: this.Athletics.items[z].summary, Description: this.Athletics.items[z].description, Calendar: this.Athletics.summary, Location: this.Athletics.items[z].location }
													if ((e.EndDate - e.StartDate) % 86400000 == 0) {
														e.EndDate--;
													}
													merged.push(e);
												}
											}
											for (var i = 0; i < 3; i++) {
												if (this.StudentActivities.items[i]) {
													let e = { StartDate: new Date((this.StudentActivities.items[i].start.dateTime || this.StudentActivities.items[i].start.date + 'T00:00:00-07:00')).getTime() + offset, EndDate: new Date((this.StudentActivities.items[i].end.dateTime || this.StudentActivities.items[i].end.date + 'T00:00:00-07:00')).getTime() + offset, Summary: this.StudentActivities.items[i].summary, Description: this.StudentActivities.items[i].description, Calendar: this.StudentActivities.summary, Location: this.StudentActivities.items[i].location };
													if ((e.EndDate - e.StartDate) % 86400000 == 0) {
														e.EndDate--;
													}
													merged.push(e);
												}
											}
											for (var j = 0; j < 3; j++) {
												if (this.ResidentLife.items[j]) {
													let e = { StartDate: new Date((this.ResidentLife.items[j].start.dateTime || this.ResidentLife.items[j].start.date + 'T00:00:00-07:00')).getTime() + offset, EndDate: new Date((this.ResidentLife.items[j].end.dateTime || this.ResidentLife.items[j].end.date + 'T00:00:00-07:00')).getTime() + offset, Summary: this.ResidentLife.items[j].summary, Description: this.ResidentLife.items[j].description, Calendar: this.ResidentLife.summary, Location: this.ResidentLife.items[j].location };
													if ((e.EndDate - e.StartDate) % 86400000 == 0) {
														e.EndDate--;
													}
													merged.push(e);
												}
											}
											for (var k = 0; k < 3; k++) {
												if (this.CampusRec.items[k]) {
													let e = { StartDate: new Date((this.CampusRec.items[k].start.dateTime || this.CampusRec.items[k].start.date + 'T00:00:00-07:00')).getTime() + offset, EndDate: new Date((this.CampusRec.items[k].end.dateTime || this.CampusRec.items[k].end.date + 'T00:00:00-07:00')).getTime() + offset, Summary: this.CampusRec.items[k].summary, Description: this.CampusRec.items[k].description, Calendar: this.CampusRec.summary, Location: this.CampusRec.items[k].location };
													if ((e.EndDate - e.StartDate) % 86400000 == 0) {
														e.EndDate--;
													}
													merged.push(e);
												}
											}
											merged.sort(function(a, b) { return a.StartDate - b.StartDate }).forEach(event => {
												if (n < 3) {
													this.Events[n++] = event;
												}
											});
											for (let n = 0; n < 3; n++) {
												this.AcademicArr[n] = acMerged[n];
											}
										});
									});
								});
							});
						});
					});
				});
			}
		});
	}
	shownGroup = null;

	toggleGroup(group) {
		if (this.isGroupShown(group)) {
			this.shownGroup = null;
		} else {
			this.shownGroup = group;
		}
	};

	isGroupShown(group) {
		return this.shownGroup === group;
	};

	addEvent(event) {
		this.calendar.createEventInteractively(event.Summary, event.Location, event.Description, new Date(event.StartDate), new Date(event.EndDate));
	}

	openBrowser(link) {
		this.inAppBrowser.create(link, '_system');
	}
	openNews(link) {
		this.inAppBrowser.create(this.news[link.toString()]['link'], '_system');
	}



	showConfirmAlert(event) {
		let alertConfirm = this.atrCtrl.create({
			title: 'Add to Calendar',
			message: 'Add event to you calendar?',
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
					handler: () => {
						console.log('No clicked');
					}
				},
				{
					text: 'Add',
					handler: () => {
						this.calendar.createEventWithOptions(event.Summary, event.Location, event.Description, new Date(event.StartDate), new Date(event.EndDate), );

					}
				}
			]
		});
		alertConfirm.present();
	}
}
