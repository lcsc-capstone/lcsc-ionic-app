import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { ClassSchedulePage } from '../class-schedule/class-schedule';
import { CalendarPage } from '../calendar/calendar';
import { NewsPage }	from '../news/news';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import { InAppBrowser, InAppBrowserEvent } from '@ionic-native/in-app-browser';
import { Calendar } from '@ionic-native/calendar';
import { Network } from '@ionic-native/network';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	public news = {'1': {}, '2': {}, '3': {}, '4': {}, '5': {}, '6': {}, '7': {}, '8': {}, '9': {}, '10': {}};
	public Academics;
	public Entertainment;
	public Athletics;
	public StudentActivities;
	public ResidentLife;
	public CampusRec;
	public Events = [{}, {}, {}];
	public guest = false;

	private scheduleItems : any = [];
	courseDataURL: any;
	private loginUsername : string = "";
	private loginPassword : string = "";
	private stage         : string = "login";

	readonly buttonClickSource : string = "function getInputByValue(value){var inputs = document.getElementsByTagName('input');for(var i = 0; i < inputs.length; i++){if(inputs[i].value == value){return inputs[i];}}return null;}getInputByValue('Sign In').click();";
	readonly loadScheduleDataSource : string = "var scripts = document.getElementsByTagName('script');scripts[scripts.length - 1].innerHTML;";
	readonly LOGIN : string = "login";
	readonly LOAD_SCHEDULE : string = "LOAD_SCHEDULE";
	readonly NONE : string = "no_page";
	readonly LOGIN_PAGE : string = "login_page";
	readonly SCHED_PAGE : string = "sched_page";
	page_stage : string = this.NONE;

	constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private storage: Storage, private secureStorage: SecureStorage, private inAppBrowser: InAppBrowser, private zone : NgZone, private calendar: Calendar, private network: Network) {
		if (navParams) this.guest = navParams.get('isGuest');
		if (!this.guest) this.loadScheduleData();
	}

	isConnected(): boolean {
		let conntype = this.network.type;
		return conntype && conntype !== 'unknown' && conntype !== 'none';
	}

	goToClassSchedule(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ClassSchedulePage);
  }
	goToCalendar(params){
		if( !params) params = {};
		this.navCtrl.setRoot(CalendarPage);
	}
	goToNews(params){
		if (!params) params = {};
		this.navCtrl.setRoot(NewsPage);
	}

	ionViewDidLoad() {
		let current_time = new Date().getTime();
		let midnight = new Date(Math.floor(current_time/86400000)*86400000-54000000).getTime();
		this.storage.get('last_time').then(val => {
			if ((!val || val/* <= midnight*/) && this.isConnected()) { // TODO: Make sure this is <= midnight for release.
				// This code will fetch the most recent 3 news titles and links.
				this.storage.set('last_time', current_time);
				this.http.get(`https://www.lcsc.edu/news`, {}, {}).then(data => {
					let html = data.data;
					let list = html.split(/<h4><a href="/g);
					this.news['1']['link'] = list[1].split(/"/g)[0];
					this.news['1']['title'] = list[1].split(/title="/g)[1].split(/"/g)[0].replace(/&amp;/g, '&');
					this.news['2']['link'] = list[2];
					this.news['2']['title'] = list[2].split(/title="/g)[1].split(/"/g)[0].replace(/&amp;/g, '&');
					this.news['3']['link'] = list[3].split(/"/g)[0];
					this.news['3']['title'] = list[3].split(/title="/g)[1].split(/"/g)[0].replace(/&amp;/g, '&');
					this.news['4']['link'] = list[4].split(/"/g)[0];
					this.news['4']['title'] = list[4].split(/title="/g)[1].split(/"/g)[0].replace(/&amp;/g, '&');
					this.news['5']['link'] = list[5].split(/"/g)[0];
					this.news['5']['title'] = list[5].split(/title="/g)[1].split(/"/g)[0].replace(/&amp;/g, '&');
					this.news['6']['link'] = list[6].split(/"/g)[0];
					this.news['6']['title'] = list[6].split(/title="/g)[1].split(/"/g)[0].replace(/&amp;/g, '&');
					this.news['7']['link'] = list[7].split(/"/g)[0];
					this.news['7']['title'] = list[7].split(/title="/g)[1].split(/"/g)[0].replace(/&amp;/g, '&');
					this.news['8']['link'] = list[8].split(/"/g)[0];
					this.news['8']['title'] = list[8].split(/title="/g)[1].split(/"/g)[0].replace(/&amp;/g, '&');
					this.news['9']['link'] = list[9].split(/"/g)[0];
					this.news['9']['title'] = list[9].split(/title="/g)[1].split(/"/g)[0].replace(/&amp;/g, '&');
					this.news['10']['link'] = list[10].split(/"/g)[0];
					this.news['10']['title'] = list[10].split(/title="/g)[1].split(/"/g)[0].replace(/&amp;/g, '&');
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
				let curMonth = (new Date().getMonth()+1); //Months are from 0-11 NOT 1-12
				let curYear = (new Date().getFullYear());

				this.http.get(`https://www.googleapis.com/calendar/v3/calendars/0rn5mgclnhc7htmh0ht0cc5pgk@group.calendar.google.com/events?maxResults=2500&timeMin=${curYear}-0${curMonth}-${curDay}T00:00:00-07:00&singleEvents=true&key=AIzaSyASiprsGk5LMBn1eCRZbupcnC1RluJl_q0`).subscribe(data => {
					this.Academics = data.json();
					this.storage.set('Academics', this.Academics);
					this.http.get(`https://www.googleapis.com/calendar/v3/calendars/m6h2d5afcjfnmaj8qr7o96q89c@group.calendar.google.com/events?maxResults=2500&timeMin=${curYear}-0${curMonth}-${curDay}T00:00:00-07:00&singleEvents=true&key=AIzaSyASiprsGk5LMBn1eCRZbupcnC1RluJl_q0`).subscribe(data => {
						this.Entertainment = data.json();
						this.storage.set('Entertainment', this.Entertainment);
						this.http.get(`https://www.googleapis.com/calendar/v3/calendars/d6jbgjhudph2mpef1cguhn4g9g@group.calendar.google.com/events?maxResults=2500&timeMin=${curYear}-0${curMonth}-${curDay}T00:00:00-07:00&singleEvents=true&key=AIzaSyASiprsGk5LMBn1eCRZbupcnC1RluJl_q0`).subscribe(data => {
							this.Athletics = data.json();
							this.storage.set('Athletics', this.Athletics);
							this.http.get(`https://www.googleapis.com/calendar/v3/calendars/l9qpkh5gb7dhjqv8nm0mn098fk@group.calendar.google.com/events?maxResults=2500&timeMin=${curYear}-0${curMonth}-${curDay}T00:00:00-07:00&singleEvents=true&key=AIzaSyASiprsGk5LMBn1eCRZbupcnC1RluJl_q0`).subscribe(data => {
								this.StudentActivities = data.json();
								this.storage.set('StudentActivities', this.StudentActivities);
								this.http.get(`https://www.googleapis.com/calendar/v3/calendars/gqv0n6j15pppdh0t8adgc1n1ts@group.calendar.google.com/events?maxResults=2500&timeMin=${curYear}-0${curMonth}-${curDay}T00:00:00-07:00&singleEvents=true&key=AIzaSyASiprsGk5LMBn1eCRZbupcnC1RluJl_q0`).subscribe(data => {
									this.ResidentLife = data.json();
									this.storage.set('ResidentLife', this.ResidentLife);
									this.http.get(`https://www.googleapis.com/calendar/v3/calendars/h4j413d3q0uftb2crk0t92jjlc@group.calendar.google.com/events?maxResults=2500&timeMin=${curYear}-0${curMonth}-${curDay}T00:00:00-07:00&singleEvents=true&key=AIzaSyASiprsGk5LMBn1eCRZbupcnC1RluJl_q0`).subscribe(data => {
										this.CampusRec = data.json();
										this.storage.set('CampusRec', this.CampusRec);

										let merged = [];
										let n = 0;
										let offset = 0

										for (var x = 0; x < 3; x++) {
											if (this.Academics.items[x]) merged.push({StartDate: new Date((this.Academics.items[x].start.dateTime || this.Academics.items[x].start.date + 'T00:00:00-07:00')).getTime()+offset, EndDate: new Date((this.Academics.items[x].end.dateTime || this.Academics.items[x].end.date + 'T00:00:00-07:00')).getTime()+offset, Summary:this.Academics.items[x].summary, Description:this.Academics.items[x].description, Calendar:this.Academics.summary, Location:this.Academics.items[x].location});
										}
										for (var y = 0; y < 3; y++) {
											if (this.Entertainment.items[y]) merged.push({StartDate: new Date((this.Entertainment.items[y].start.dateTime || this.Entertainment.items[y].start.date + 'T00:00:00-07:00')).getTime()+offset, EndDate: new Date((this.Entertainment.items[y].end.dateTime || this.Entertainment.items[y].end.date + 'T00:00:00-07:00')).getTime()+offset, Summary:this.Entertainment.items[y].summary, Description:this.Entertainment.items[y].description, Calendar:this.Entertainment.summary, Location:this.Entertainment.items[y].location});
										}
										for (var z = 0; z < 3; z++) {
											if (this.Athletics.items[z]) merged.push({StartDate: new Date((this.Athletics.items[z].start.dateTime || this.Athletics.items[z].start.date + 'T00:00:00-07:00')).getTime()+offset, EndDate: new Date((this.Athletics.items[z].end.dateTime || this.Athletics.items[z].end.date + 'T00:00:00-07:00')).getTime()+offset, Summary:this.Athletics.items[z].summary, Description:this.Athletics.items[z].description, Calendar:this.Athletics.summary, Location:this.Athletics.items[z].location});
										}
										for (var i = 0; i < 3; i++) {
											if (this.StudentActivities.items[i]) merged.push({StartDate: new Date((this.StudentActivities.items[i].start.dateTime || this.StudentActivities.items[i].start.date + 'T00:00:00-07:00')).getTime()+offset, EndDate: new Date((this.StudentActivities.items[i].end.dateTime || this.StudentActivities.items[i].end.date + 'T00:00:00-07:00')).getTime()+offset, Summary:this.StudentActivities.items[i].summary, Description:this.StudentActivities.items[i].description, Calendar:this.StudentActivities.summary, Location:this.StudentActivities.items[i].location});
										}
										for (var j = 0; j < 3; j++) {
											if (this.ResidentLife.items[j]) merged.push({StartDate: new Date((this.ResidentLife.items[j].start.dateTime || this.ResidentLife.items[j].start.date + 'T00:00:00-07:00')).getTime()+offset, EndDate: new Date((this.ResidentLife.items[j].end.dateTime || this.ResidentLife.items[j].end.date + 'T00:00:00-07:00')).getTime()+offset, Summary:this.ResidentLife.items[j].summary, Description:this.ResidentLife.items[j].description, Calendar:this.ResidentLife.summary, Location:this.ResidentLife.items[j].location});
										}
										for (var k = 0; k < 3; k++) {
											if (this.CampusRec.items[k]) merged.push({StartDate: new Date((this.CampusRec.items[k].start.dateTime || this.CampusRec.items[k].start.date + 'T00:00:00-07:00')).getTime()+offset, EndDate: new Date((this.CampusRec.items[k].end.dateTime || this.CampusRec.items[k].end.date + 'T00:00:00-07:00')).getTime()+offset, Summary:this.CampusRec.items[k].summary, Description:this.CampusRec.items[k].description, Calendar:this.CampusRec.summary, Location:this.CampusRec.items[k].location});
										}
										merged.sort(function(a,b){return a.StartDate - b.StartDate}).forEach(event => {
											if (n < 3) {
												this.Events[n++] = event;
											}
										});
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
										let n = 0;
										let offset = 0

										for (var x = 0; x < 3; x++) {
											if (this.Academics.items[x]) merged.push({StartDate: new Date((this.Academics.items[x].start.dateTime || this.Academics.items[x].start.date + 'T00:00:00-07:00')).getTime()+offset, EndDate: new Date((this.Academics.items[x].end.dateTime || this.Academics.items[x].end.date + 'T00:00:00-07:00')).getTime()+offset, Summary:this.Academics.items[x].summary, Description:this.Academics.items[x].description, Calendar:this.Academics.summary, Location:this.Academics.items[x].location});
										}
										for (var y = 0; y < 3; y++) {
											if (this.Entertainment.items[y]) merged.push({StartDate: new Date((this.Entertainment.items[y].start.dateTime || this.Entertainment.items[y].start.date + 'T00:00:00-07:00')).getTime()+offset, EndDate: new Date((this.Entertainment.items[y].end.dateTime || this.Entertainment.items[y].end.date + 'T00:00:00-07:00')).getTime()+offset, Summary:this.Entertainment.items[y].summary, Description:this.Entertainment.items[y].description, Calendar:this.Entertainment.summary, Location:this.Entertainment.items[y].location});
										}
										for (var z = 0; z < 3; z++) {
											if (this.Athletics.items[z]) merged.push({StartDate: new Date((this.Athletics.items[z].start.dateTime || this.Athletics.items[z].start.date + 'T00:00:00-07:00')).getTime()+offset, EndDate: new Date((this.Athletics.items[z].end.dateTime || this.Athletics.items[z].end.date + 'T00:00:00-07:00')).getTime()+offset, Summary:this.Athletics.items[z].summary, Description:this.Athletics.items[z].description, Calendar:this.Athletics.summary, Location:this.Athletics.items[z].location});
										}
										for (var i = 0; i < 3; i++) {
											if (this.StudentActivities.items[i]) merged.push({StartDate: new Date((this.StudentActivities.items[i].start.dateTime || this.StudentActivities.items[i].start.date + 'T00:00:00-07:00')).getTime()+offset, EndDate: new Date((this.StudentActivities.items[i].end.dateTime || this.StudentActivities.items[i].end.date + 'T00:00:00-07:00')).getTime()+offset, Summary:this.StudentActivities.items[i].summary, Description:this.StudentActivities.items[i].description, Calendar:this.StudentActivities.summary, Location:this.StudentActivities.items[i].location});
										}
										for (var j = 0; j < 3; j++) {
											if (this.ResidentLife.items[j]) merged.push({StartDate: new Date((this.ResidentLife.items[j].start.dateTime || this.ResidentLife.items[j].start.date + 'T00:00:00-07:00')).getTime()+offset, EndDate: new Date((this.ResidentLife.items[j].end.dateTime || this.ResidentLife.items[j].end.date + 'T00:00:00-07:00')).getTime()+offset, Summary:this.ResidentLife.items[j].summary, Description:this.ResidentLife.items[j].description, Calendar:this.ResidentLife.summary, Location:this.ResidentLife.items[j].location});
										}
										for (var k = 0; k < 3; k++) {
											if (this.CampusRec.items[k]) merged.push({StartDate: new Date((this.CampusRec.items[k].start.dateTime || this.CampusRec.items[k].start.date + 'T00:00:00-07:00')).getTime()+offset, EndDate: new Date((this.CampusRec.items[k].end.dateTime || this.CampusRec.items[k].end.date + 'T00:00:00-07:00')).getTime()+offset, Summary:this.CampusRec.items[k].summary, Description:this.CampusRec.items[k].description, Calendar:this.CampusRec.summary, Location:this.CampusRec.items[k].location});
										}
										merged.sort(function(a,b){return a.StartDate - b.StartDate}).forEach(event => {
											if (n < 3) {
												this.Events[n++] = event;
											}
										});
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

loadScheduleData() {
	this.courseDataURL = "https://warriorwebss.lcsc.edu/Student/Planning/DegreePlans/PrintSchedule?termId=2018SP";
	this.scheduleItems = [];

	this.secureStorage.create('credentials').then((storage : SecureStorageObject) => {
		alert('Logging in');
		storage.get("loginUsername").then(data => this.loginUsername = data, err => alert(err));
		storage.get("loginPassword").then(data => this.loginPassword = data, err => alert(err));

		const browser = this.inAppBrowser.create(this.courseDataURL, '_blank', 'clearcache=yes,hidden=yes');
		browser.on('loadstop').subscribe((ev : InAppBrowserEvent) => {

			if(this.page_stage == this.NONE) {
				this.page_stage = this.LOGIN_PAGE;
			}
			else if(this.page_stage == this.LOGIN_PAGE)
			{
				this.page_stage = this.SCHED_PAGE;
			}

			if(this.stage == this.LOGIN && this.page_stage == this.LOGIN_PAGE)
			{
				this.loginToWarriorWeb(browser);
				this.stage = this.LOAD_SCHEDULE;
			}
			else if(this.stage == this.LOAD_SCHEDULE && this.page_stage == this.SCHED_PAGE)
			{
				alert('Loading schedule stage');
				this.loadScheduleJsonData(browser).then(data => {
					// Don't leave credentials floating around in memory
					this.loginUsername = "";
					this.loginPassword = "";

					let json = JSON.parse(data[0].replace("var result =", "").replace("};", "}"));
					let termCode : string = "2018SP"; // TODO this is easy to calculate, get to later

					let currentTerm = null;

					for(var term of json.Terms)
					{
						if(term.Code == termCode)
						{
							currentTerm = term;
							break;
						}
					}

					for(var course of currentTerm.PlannedCourses)
					{
						let item = course.CourseTitleDisplay + "--" + course.CourseName;
						this.zone.run(() => this.scheduleItems.push(item));
					}
				});
			}
			// We may want to add a handler for this where we'd simply wait for the next page loadstop
			// before loading the schedule data
			else if(this.stage == this.LOAD_SCHEDULE && this.page_stage != this.SCHED_PAGE) {
		}
	});
});
}

async loginToWarriorWeb(browser) : Promise<any> {
	return await browser.executeScript({ code: "document.getElementById('UserName').value = '" + this.loginUsername + "';" }).then(
		browser.executeScript({ code: "document.getElementById('Password').value = '" + this.loginPassword + "';" })).then(
			browser.executeScript({ code: this.buttonClickSource }));
		}

	async loadScheduleJsonData(browser) : Promise<any> {
		return browser.executeScript({ code: this.loadScheduleDataSource });
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
		this.inAppBrowser.create(link, '_blank', 'location=no');
	}
}
