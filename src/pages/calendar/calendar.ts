import { Component } from '@angular/core';
import { NavController, PopoverController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CalendarDropdownPage } from '../calendar/calendar-dropdown';
import { Calendar } from '@ionic-native/calendar';
import { AlertController } from 'ionic-angular';

@Component({
	selector: 'page-calendar',
	templateUrl: 'calendar.html'
})

@Component({
	template: `
	<ion-list>
	<ion-list-header>Ionic</ion-list-header>
	<button ion-item (click)="close()">Learn Ionic</button>
	<button ion-item (click)="close()">Documentation</button>
	<button ion-item (click)="close()">Showcase</button>
	<button ion-item (click)="close()">GitHub Repo</button>
	</ion-list>
	`
})

@Component({})
export class CalendarPage {
	public Academics;
	public Entertainment;
	public Athletics;
	public StudentActivities;
	public ResidentLife;
	public CampusRec;
	public Days = [];
	public LoadedDays = [];
	public Events = {};
	public showAcademic = true;
	public showEntertainment = true;
	public showAthletics = true;
	public showStudentActivities = true;
	public showResidentLife = true;
	public showCampusRec = true;

	constructor(public atrCtrl: AlertController, public navCtrl: NavController, public popoverCtrl: PopoverController, private storage: Storage, public events: Events, private calendar: Calendar) {
		events.subscribe('toggleAcademic', () => {
			this.showAcademic = !this.showAcademic;
		});
		events.subscribe('toggleEntertainment', () => {
			this.showEntertainment = !this.showEntertainment;
		});
		events.subscribe('toggleAthletics', () => {
			this.showAthletics = !this.showAthletics;
		});
		events.subscribe('toggleStudentActivities', () => {
			this.showStudentActivities = !this.showStudentActivities;
		});
		events.subscribe('toggleResidentLife', () => {
			this.showResidentLife = !this.showResidentLife;
		});
		events.subscribe('toggleCampusRec', () => {
			this.showCampusRec = !this.showCampusRec;
		});
	}

	ionViewDidLoad() {
		this.storage.get('showAcademic').then(val => {
			this.showAcademic = val;
			if (val == null) this.showAcademic = true;
			this.storage.get('showAthletics').then(val => {
				this.showAthletics = val;
				if (val == null) this.showAthletics = true;
				this.storage.get('showEntertainment').then(val => {
					this.showEntertainment = val;
					if (val == null) this.showEntertainment = true;
					this.storage.get('showStudentActivities').then(val => {
						this.showStudentActivities = val;
						if (val == null) this.showStudentActivities = true;
						this.storage.get('showCampusRec').then(val => {
							this.showCampusRec = val;
							if (val == null) this.showCampusRec = true;
							this.storage.get('showResidentLife').then(val => {
								this.showResidentLife = val;
								if (val == null) this.showResidentLife = true;
								this.events.publish('toggleCalendars', this.showAcademic, this.showEntertainment, this.showStudentActivities, this.showCampusRec, this.showResidentLife, this.showAthletics);
							});
						});
					});
				});
			});
		});
		this.storage.get('last_time').then(midnight => {
			this.storage.get('Academics').then(val1 => {
				this.Academics = val1;
				this.storage.get('Entertainment').then(val2=> {
					this.Entertainment = val2;
					this.storage.get('Athletics').then(val3 => {
						this.Athletics = val3;
						this.storage.get('StudentActivities').then(val4 => {
							this.StudentActivities = val4;
							this.storage.get('ResidentLife').then(val5 => {
								this.ResidentLife = val5;
								this.storage.get('CampusRec').then(val6 => {
									this.CampusRec = val6;
									let merged = [];
									let offset = 0

									for (let i = 0; i < this.Academics.items.length; i++) {
										let localdate = new Date(new Date((val1.items[i].start.dateTime || val1.items[i].start.date + 'T00:00:00-07:00')));
										let ls = new Date(new Date((val1.items[i].start.dateTime || val1.items[i].start.date + 'T00:00:00-07:00')).getTime()+offset).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
										let le = new Date(new Date((val1.items[i].end.dateTime || val1.items[i].end.date + 'T00:00:00-07:00')).getTime()+offset).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
										let localtime = (ls+" - "+le);
										merged.push({StartDate:new Date((val1.items[i].start.dateTime || val1.items[i].start.date + 'T00:00:00-07:00')).getTime()+offset, EndDate:new Date((val1.items[i].end.dateTime || val1.items[i].end.date + 'T00:00:00-07:00')).getTime()+offset, Summary:val1.items[i].summary, Description:val1.items[i].description, Calendar:val1.summary, Location:val1.items[i].location, Link:val1.items[i].htmlLink, LocalTime:localtime, LocalDate:localdate});
									}
									for (let i = 0; i < this.Entertainment.items.length; i++) {
										let localdate = new Date(new Date((val2.items[i].start.dateTime || val2.items[i].start.date + 'T00:00:00-07:00')));
										let ls = new Date(new Date((val2.items[i].start.dateTime || val2.items[i].start.date + 'T00:00:00-07:00')).getTime()+offset).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
										let le = new Date(new Date((val2.items[i].end.dateTime || val2.items[i].end.date + 'T00:00:00-07:00')).getTime()+offset).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
										let localtime = (ls+" - "+le);
										merged.push({StartDate:new Date((val2.items[i].start.dateTime || val2.items[i].start.date + 'T00:00:00-07:00')).getTime()+offset, EndDate:new Date((val2.items[i].end.dateTime || val2.items[i].end.date + 'T00:00:00-07:00')).getTime()+offset, Summary:val2.items[i].summary, Description:val2.items[i].description, Calendar:val2.summary, Location:val2.items[i].location, Link:val2.items[i].htmlLink, LocalTime:localtime, LocalDate:localdate});
									}
									for (let i = 0; i < this.Athletics.items.length; i++) {
										let localdate = new Date(new Date((val3.items[i].start.dateTime || val3.items[i].start.date + 'T00:00:00-07:00')));
										let ls = new Date(new Date((val3.items[i].start.dateTime || val3.items[i].start.date + 'T00:00:00-07:00')).getTime()+offset).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
										let le = new Date(new Date((val3.items[i].end.dateTime || val3.items[i].end.date + 'T00:00:00-07:00')).getTime()+offset).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
										let localtime = (ls+" - "+le);
										merged.push({StartDate:new Date((val3.items[i].start.dateTime || val3.items[i].start.date + 'T00:00:00-07:00')).getTime()+offset, EndDate:new Date((val3.items[i].end.dateTime || val3.items[i].end.date + 'T00:00:00-07:00')).getTime()+offset, Summary:val3.items[i].summary, Description:val3.items[i].description, Calendar:val3.summary, Location:val3.items[i].location, Link:val3.items[i].htmlLink, LocalTime:localtime, LocalDate:localdate});
									}
									for (let i = 0; i < this.StudentActivities.items.length; i++) {
										let localdate = new Date(new Date((val4.items[i].start.dateTime || val4.items[i].start.date + 'T00:00:00-07:00')));
										let ls = new Date(new Date((val4.items[i].start.dateTime || val4.items[i].start.date + 'T00:00:00-07:00')).getTime()+offset).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
										let le = new Date(new Date((val4.items[i].end.dateTime || val4.items[i].end.date + 'T00:00:00-07:00')).getTime()+offset).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
										let localtime = (ls+" - "+le);
										merged.push({StartDate:new Date((val4.items[i].start.dateTime || val4.items[i].start.date + 'T00:00:00-07:00')).getTime()+offset, EndDate:new Date((val4.items[i].end.dateTime || val4.items[i].end.date + 'T00:00:00-07:00')).getTime()+offset, Summary:val4.items[i].summary, Description:val4.items[i].description, Calendar:val4.summary, Location:val4.items[i].location, Link:val4.items[i].htmlLink, LocalTime:localtime, LocalDate:localdate});
									}
									for (let i = 0; i < this.ResidentLife.items.length; i++) {
										let localdate = new Date(new Date((val5.items[i].start.dateTime || val5.items[i].start.date + 'T00:00:00-07:00')));
										let ls = new Date(new Date((val5.items[i].start.dateTime || val5.items[i].start.date + 'T00:00:00-07:00')).getTime()+offset).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
										let le = new Date(new Date((val5.items[i].end.dateTime || val5.items[i].end.date + 'T00:00:00-07:00')).getTime()+offset).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
										let localtime = (ls+" - "+le);
										merged.push({StartDate:new Date((val5.items[i].start.dateTime || val5.items[i].start.date + 'T00:00:00-07:00')).getTime()+offset, EndDate:new Date((val5.items[i].end.dateTime || val5.items[i].end.date + 'T00:00:00-07:00')).getTime()+offset, Summary:val5.items[i].summary, Description:val5.items[i].description, Calendar:val5.summary, Location:val5.items[i].location, Link:val5.items[i].htmlLink, LocalTime:localtime, LocalDate:localdate});
									}
									for (let i = 0; i < this.CampusRec.items.length; i++) {
										let localdate = new Date(new Date((val6.items[i].start.dateTime || val6.items[i].start.date + 'T00:00:00-07:00')));
										let ls = new Date(new Date((val6.items[i].start.dateTime || val6.items[i].start.date + 'T00:00:00-07:00')).getTime()+offset).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
										let le = new Date(new Date((val6.items[i].end.dateTime || val6.items[i].end.date + 'T00:00:00-07:00')).getTime()+offset).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
										let localtime = (ls+" - "+le);
										merged.push({StartDate:new Date((val6.items[i].start.dateTime || val6.items[i].start.date + 'T00:00:00-07:00')).getTime()+offset, EndDate:new Date((val6.items[i].end.dateTime || val6.items[i].end.date + 'T00:00:00-07:00')).getTime()+offset, Summary:val6.items[i].summary, Description:val6.items[i].description, Calendar:val6.summary, Location:val6.items[i].location, Link:val6.items[i].htmlLink, LocalTime:localtime, LocalDate:localdate});
									}
									merged.sort(function(a,b){return a.StartDate - b.StartDate}).forEach(event => {
										if ((event.EndDate - event.StartDate) > (24*60*60*1000)) { // Event lasts longer than 24 hours.
											let len = Math.floor((event.EndDate - event.StartDate) / (24*60*60*1000)); // Number of days the event lasts minus 1.
											for (let i = 0; i < len; i++) {
												if (!this.Events[Math.floor(((event.LocalDate.getTime()+57600000+(i*86400000))/86400000))]) {
													this.Events[Math.floor(((event.LocalDate.getTime()+57600000+(i*86400000))/86400000))] = {times: []};
													this.Days.push([Math.floor(((event.LocalDate.getTime()+57600000+(i*86400000))/86400000))]);
												}
												this.Events[Math.floor(((event.LocalDate.getTime()+57600000+(i*86400000))/86400000))][event.Summary] = event;
												this.Events[Math.floor(((event.LocalDate.getTime()+57600000+(i*86400000))/86400000))]['times'].push(event.Summary);
											}
										} else {
											if (!this.Events[Math.floor(((event.LocalDate.getTime()+57600000)/86400000))]) {
												this.Events[Math.floor(((event.LocalDate.getTime()+57600000)/86400000))] = {times: []};
												this.Days.push([Math.floor(((event.LocalDate.getTime()+57600000)/86400000))]);
											}
											this.Events[Math.floor(((event.LocalDate.getTime()+57600000)/86400000))][event.Summary] = event;
											this.Events[Math.floor(((event.LocalDate.getTime()+57600000)/86400000))]['times'].push(event.Summary);
										}
									});
									for (let i = 0; i < 8; i++) {
										this.LoadedDays.push(this.Days[i]);
									}
								});
							});
						});
					});
				});
			});
		});
	}

	doInfinite(infiniteScroll) {
		setTimeout(() => {
			let starting = this.LoadedDays.length;
			for (let i = starting; i < starting+3; i++) {
	        this.LoadedDays.push(this.Days[i]);
	      }
	      infiniteScroll.complete();
		}, 1);
  }

	ionViewWillEnter() {
		this.events.subscribe('getCalendars', () => {
			this.events.publish('toggleCalendars', this.showAcademic, this.showEntertainment, this.showStudentActivities, this.showCampusRec, this.showResidentLife, this.showAthletics);
		});
	}

	ionViewWillUnload() {
		this.events.unsubscribe('getCalendars')
	}

	presentPopover(myEvent) {
		let popover = this.popoverCtrl.create(CalendarDropdownPage);
		popover.present({
			ev: myEvent
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
