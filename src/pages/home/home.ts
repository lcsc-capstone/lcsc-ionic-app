import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { ClassSchedulePage } from '../class-schedule/class-schedule';
import { CalendarPage } from '../calendar/calendar';
import { NewsPage }	from '../news/news';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import { InAppBrowser, InAppBrowserEvent } from '@ionic-native/in-app-browser';

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

	constructor(public navCtrl: NavController, private http: Http, private storage: Storage, private secureStorage: SecureStorage, private inAppBrowser: InAppBrowser, private zone : NgZone) {
		this.loadScheduleData();
	}

	goToClassSchedule(params){
		if (!params) params = {};
		this.navCtrl.push(ClassSchedulePage);
	}

	goToCalendar(){
		this.navCtrl.push(CalendarPage);
	}
	goToNews(){
		this.navCtrl.push(NewsPage);
	}

	ionViewDidLoad() {
		let current_time = new Date().getTime();
		let midnight = new Date(Math.floor(current_time/86400000)*86400000-57600000).getTime();
		this.storage.get('last_time').then(val => {
			if (!val || val <= midnight) { // TODO: Make sure this is <= midnight for release.
				// This code will fetch the most recent 3 news titles and links.
				this.storage.set('last_time', current_time);
				this.http.get(`http://www.lcsc.edu/news`).subscribe(data => {
					let html = data['_body'];
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
				}, err => {
					console.error(err)
				}, () => {
				});

				/* #######################################################################
				Academics 					- 0rn5mgclnhc7htmh0ht0cc5pgk@group.calendar.google.com
				Entertainment 			- m6h2d5afcjfnmaj8qr7o96q89c@group.calendar.google.com
				Athletics 					- d6jbgjhudph2mpef1cguhn4g9g@group.calendar.google.com
				StudentActivities 	- l9qpkh5gb7dhjqv8nm0mn098fk@group.calendar.google.com
				ResidentLife 				- gqv0n6j15pppdh0t8adgc1n1ts@group.calendar.google.com
				CampusRec 					- h4j413d3q0uftb2crk0t92jjlc@group.calendar.google.com
				####################################################################### */
				let curDay = (new Date().getDate());
				let curMonth = (new Date().getMonth()+1); //For some reason we are pulling 1 month behind current month?
				let curYear = (new Date().getFullYear());

				this.http.get(`https://www.googleapis.com/calendar/v3/calendars/0rn5mgclnhc7htmh0ht0cc5pgk@group.calendar.google.com/events?maxResults=2500&timeMin=${curYear}-0${curMonth}-${curDay}T00:00:00-08:00&singleEvents=true&key=AIzaSyASiprsGk5LMBn1eCRZbupcnC1RluJl_q0`).subscribe(data => {
					this.Academics = data.json();
					this.storage.set('Academics', this.Academics);
					this.http.get(`https://www.googleapis.com/calendar/v3/calendars/m6h2d5afcjfnmaj8qr7o96q89c@group.calendar.google.com/events?maxResults=2500&timeMin=${curYear}-0${curMonth}-${curDay}T00:00:00-08:00&singleEvents=true&key=AIzaSyASiprsGk5LMBn1eCRZbupcnC1RluJl_q0`).subscribe(data => {
						this.Entertainment = data.json();
						this.storage.set('Entertainment', this.Entertainment);
						this.http.get(`https://www.googleapis.com/calendar/v3/calendars/d6jbgjhudph2mpef1cguhn4g9g@group.calendar.google.com/events?maxResults=2500&timeMin=${curYear}-0${curMonth}-${curDay}T00:00:00-08:00&singleEvents=true&key=AIzaSyASiprsGk5LMBn1eCRZbupcnC1RluJl_q0`).subscribe(data => {
							this.Athletics = data.json();
							this.storage.set('Athletics', this.Athletics);
							this.http.get(`https://www.googleapis.com/calendar/v3/calendars/l9qpkh5gb7dhjqv8nm0mn098fk@group.calendar.google.com/events?maxResults=2500&timeMin=${curYear}-0${curMonth}-${curDay}T00:00:00-08:00&singleEvents=true&key=AIzaSyASiprsGk5LMBn1eCRZbupcnC1RluJl_q0`).subscribe(data => {
								this.StudentActivities = data.json();
								this.storage.set('StudentActivities', this.StudentActivities);
								this.http.get(`https://www.googleapis.com/calendar/v3/calendars/gqv0n6j15pppdh0t8adgc1n1ts@group.calendar.google.com/events?maxResults=2500&timeMin=${curYear}-0${curMonth}-${curDay}T00:00:00-08:00&singleEvents=true&key=AIzaSyASiprsGk5LMBn1eCRZbupcnC1RluJl_q0`).subscribe(data => {
									this.ResidentLife = data.json();
									this.storage.set('ResidentLife', this.ResidentLife);
									this.http.get(`https://www.googleapis.com/calendar/v3/calendars/h4j413d3q0uftb2crk0t92jjlc@group.calendar.google.com/events?maxResults=2500&timeMin=${curYear}-0${curMonth}-${curDay}T00:00:00-08:00&singleEvents=true&key=AIzaSyASiprsGk5LMBn1eCRZbupcnC1RluJl_q0`).subscribe(data => {
										this.CampusRec = data.json();
										this.storage.set('CampusRec', this.CampusRec);

										//TODO: This needs changes. Badly. There is no reason to sort every event when only the first 3 are used. It is slow and very inefficient.
										let merged = [];
										let n = 0;
										let offset = 0

										for (var i = 0; i < (this.Academics.items.length-(this.Academics.items.length-3)); i++) {
											merged.push({StartDate: new Date((this.Academics.items[i].start.dateTime || this.Academics.items[i].start.date + 'T00:00:00-08:01')).getTime()+offset, EndDate: new Date((this.Academics.items[i].end.dateTime || this.Academics.items[i].end.date + 'T00:00:00-08:00')).getTime()+offset, Summary:this.Academics.items[i].summary, Description:this.Academics.items[i].description, Calendar:this.Academics.summary});
										}
										for (var i = 0; i < (this.Entertainment.items.length-(this.Entertainment.items.length-3)); i++) {
											merged.push({StartDate: new Date((this.Entertainment.items[i].start.dateTime || this.Entertainment.items[i].start.date + 'T00:00:00-08:01')).getTime()+offset, EndDate: new Date((this.Entertainment.items[i].end.dateTime || this.Entertainment.items[i].end.date + 'T00:00:00-08:00')).getTime()+offset, Summary:this.Entertainment.items[i].summary, Description:this.Entertainment.items[i].description, Calendar:this.Entertainment.summary});
										}
										for (var i = 0; i < (this.Athletics.items.length-(this.Athletics.items.length-3)); i++) {
											merged.push({StartDate: new Date((this.Athletics.items[i].start.dateTime || this.Athletics.items[i].start.date + 'T00:00:00-08:01')).getTime()+offset, EndDate: new Date((this.Athletics.items[i].end.dateTime || this.Athletics.items[i].end.date + 'T00:00:00-08:00')).getTime()+offset, Summary:this.Athletics.items[i].summary, Description:this.Athletics.items[i].description, Calendar:this.Athletics.summary});
										}
										for (var i = 0; i < (this.StudentActivities.items.length-(this.StudentActivities.items.length-3)); i++) {
											merged.push({StartDate: new Date((this.StudentActivities.items[i].start.dateTime || this.StudentActivities.items[i].start.date + 'T00:00:00-08:01')).getTime()+offset, EndDate: new Date((this.StudentActivities.items[i].end.dateTime || this.StudentActivities.items[i].end.date + 'T00:00:00-08:00')).getTime()+offset, Summary:this.StudentActivities.items[i].summary, Description:this.StudentActivities.items[i].description, Calendar:this.StudentActivities.summary});
										}
										for (var i = 0; i < (this.ResidentLife.items.length-(this.ResidentLife.items.length-3)); i++) {
											merged.push({StartDate: new Date((this.ResidentLife.items[i].start.dateTime || this.ResidentLife.items[i].start.date + 'T00:00:00-08:01')).getTime()+offset, EndDate: new Date((this.ResidentLife.items[i].end.dateTime || this.ResidentLife.items[i].end.date + 'T00:00:00-08:00')).getTime()+offset, Summary:this.ResidentLife.items[i].summary, Description:this.ResidentLife.items[i].description, Calendar:this.ResidentLife.summary});
										}
										for (var i = 0; i < (this.CampusRec.items.length-(this.CampusRec.items.length-3)); i++) {
											merged.push({StartDate: new Date((this.CampusRec.items[i].start.dateTime || this.CampusRec.items[i].start.date + 'T00:00:00-08:01')).getTime()+offset, EndDate: new Date((this.CampusRec.items[i].end.dateTime || this.CampusRec.items[i].end.date + 'T00:00:00-08:00')).getTime()+offset, Summary:this.CampusRec.items[i].summary, Description:this.CampusRec.items[i].description, Calendar:this.CampusRec.summary});
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

											//TODO: This needs changes. Badly. There is no reason to sort every event when only the first 3 are used. It is slow and very inefficient.
											let merged = [];
											let n = 0;
											let offset = 0

											for (var i = 0; i < (this.Academics.items.length-(this.Academics.items.length-3)); i++) {
												merged.push({StartDate: new Date((this.Academics.items[i].start.dateTime || this.Academics.items[i].start.date + 'T00:00:00-08:01')).getTime()+offset, EndDate: new Date((this.Academics.items[i].end.dateTime || this.Academics.items[i].end.date + 'T00:00:00-08:00')).getTime()+offset, Summary:this.Academics.items[i].summary, Description:this.Academics.items[i].description, Calendar:this.Academics.summary});
											}
											for (var i = 0; i < (this.Entertainment.items.length-(this.Entertainment.items.length-3)); i++) {
												merged.push({StartDate: new Date((this.Entertainment.items[i].start.dateTime || this.Entertainment.items[i].start.date + 'T00:00:00-08:01')).getTime()+offset, EndDate: new Date((this.Entertainment.items[i].end.dateTime || this.Entertainment.items[i].end.date + 'T00:00:00-08:00')).getTime()+offset, Summary:this.Entertainment.items[i].summary, Description:this.Entertainment.items[i].description, Calendar:this.Entertainment.summary});
											}
											for (var i = 0; i < (this.Athletics.items.length-(this.Athletics.items.length-3)); i++) {
												merged.push({StartDate: new Date((this.Athletics.items[i].start.dateTime || this.Athletics.items[i].start.date + 'T00:00:00-08:01')).getTime()+offset, EndDate: new Date((this.Athletics.items[i].end.dateTime || this.Athletics.items[i].end.date + 'T00:00:00-08:00')).getTime()+offset, Summary:this.Athletics.items[i].summary, Description:this.Athletics.items[i].description, Calendar:this.Athletics.summary});
											}
											for (var i = 0; i < (this.StudentActivities.items.length-(this.StudentActivities.items.length-3)); i++) {
												merged.push({StartDate: new Date((this.StudentActivities.items[i].start.dateTime || this.StudentActivities.items[i].start.date + 'T00:00:00-08:01')).getTime()+offset, EndDate: new Date((this.StudentActivities.items[i].end.dateTime || this.StudentActivities.items[i].end.date + 'T00:00:00-08:00')).getTime()+offset, Summary:this.StudentActivities.items[i].summary, Description:this.StudentActivities.items[i].description, Calendar:this.StudentActivities.summary});
											}
											for (var i = 0; i < (this.ResidentLife.items.length-(this.ResidentLife.items.length-3)); i++) {
												merged.push({StartDate: new Date((this.ResidentLife.items[i].start.dateTime || this.ResidentLife.items[i].start.date + 'T00:00:00-08:01')).getTime()+offset, EndDate: new Date((this.ResidentLife.items[i].end.dateTime || this.ResidentLife.items[i].end.date + 'T00:00:00-08:00')).getTime()+offset, Summary:this.ResidentLife.items[i].summary, Description:this.ResidentLife.items[i].description, Calendar:this.ResidentLife.summary});
											}
											for (var i = 0; i < (this.CampusRec.items.length-(this.CampusRec.items.length-3)); i++) {
												merged.push({StartDate: new Date((this.CampusRec.items[i].start.dateTime || this.CampusRec.items[i].start.date + 'T00:00:00-08:01')).getTime()+offset, EndDate: new Date((this.CampusRec.items[i].end.dateTime || this.CampusRec.items[i].end.date + 'T00:00:00-08:00')).getTime()+offset, Summary:this.CampusRec.items[i].summary, Description:this.CampusRec.items[i].description, Calendar:this.CampusRec.summary});
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
      storage.get("loginUsername").then(data => this.loginUsername = data, err => alert(err));
      storage.get("loginPassword").then(data => this.loginPassword = data, err => alert(err));

      const browser = this.inAppBrowser.create(this.courseDataURL, '_self', 'clearcache=yes,hidden=yes');
      browser.on('loadstop').subscribe((ev : InAppBrowserEvent) => {

          if(this.page_stage == this.NONE) this.page_stage = this.LOGIN_PAGE;
          else if(this.page_stage == this.LOGIN_PAGE) this.page_stage = this.SCHED_PAGE;

          if(this.stage == this.LOGIN && this.page_stage == this.LOGIN_PAGE)
          {
            this.loginToWarriorWeb(browser).then(data => this.stage = this.LOAD_SCHEDULE);
          }
          else if(this.stage == this.LOAD_SCHEDULE && this.page_stage == this.SCHED_PAGE)
          {
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
            alert('Bug: Attempting to load schedule before page ready. Please report');
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
}
