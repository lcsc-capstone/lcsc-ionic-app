import { Component, NgZone, OnInit } from '@angular/core';
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
import { dateDataSortValue } from 'ionic-angular/umd/util/datetime-util';
import { CalendarSorter } from '../../providers/event-calendar/calendarSort';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage implements OnInit{
	private news = { '1': {}, '2': {}, '3': {}, '4': {}, '5': {}, '6': {}, '7': {}, '8': {}, '9': {}, '10': {} };
	public sortedAcadamic: any;
	public sortedNonacadamic: any;
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
		private userStateProvider: UserStateProvider,
		private sorted: CalendarSorter) {

		this.zone.run(() => {
			this.schedulePulled = false;
		});
		this.sorted.getAcademicEvents().then(data => {
			console.log("fml"+ data)
			this.sortedAcadamic = data;
		});
		console.log("this is constructor academic array")
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

	ngOnInit() {
		let prevDate;
		let currentDate = new Date().getDay();
		
		console.log("this is the home view");
	
		
		this.sortedNonacadamic = this.sorted.getNonacademicEvents();
		this.storage.get('last_time').then(val => {

			if ((prevDate != currentDate) && this.isConnected()) {

				// This code will fetch the most recent 3 news titles and links.
				//this.storage.set('last_time', currentDate);
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
			}
		})
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
