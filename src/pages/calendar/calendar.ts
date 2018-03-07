import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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
	public Events = {};

	constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, private storage: Storage) {
	}

	ionViewDidLoad() {
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

									for (var i = 0; i < this.Academics.items.length; i++) {
										var localdate = new Date(new Date((val1.items[i].start.dateTime || val1.items[i].start.date + 'T00:00:00-08:00')));
										var ls = new Date(new Date((val1.items[i].start.dateTime || val1.items[i].start.date + 'T00:00:00-08:00')).getTime()+offset).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
										var le = new Date(new Date((val1.items[i].end.dateTime || val1.items[i].end.date + 'T00:00:00-08:00')).getTime()+offset).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
										var localtime = (ls+" - "+le);
										merged.push({StartDate:new Date((val1.items[i].start.dateTime || val1.items[i].start.date + 'T00:00:00-08:00')).getTime()+offset, EndDate:new Date((val1.items[i].end.dateTime || val1.items[i].end.date + 'T00:00:00-08:00')).getTime()+offset, Summary:val1.items[i].summary, Description:val1.items[i].description, Calendar:val1.summary, Location:val1.items[i].location, Link:val1.items[i].htmlLink, LocalTime:localtime, LocalDate:localdate});
									}
									for (var i = 0; i < this.Entertainment.items.length; i++) {
										var localdate = new Date(new Date((val2.items[i].start.dateTime || val2.items[i].start.date + 'T00:00:00-08:00')));
										var ls = new Date(new Date((val2.items[i].start.dateTime || val2.items[i].start.date + 'T00:00:00-08:00')).getTime()+offset).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
										var le = new Date(new Date((val2.items[i].end.dateTime || val2.items[i].end.date + 'T00:00:00-08:00')).getTime()+offset).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
										var localtime = (ls+" - "+le);
										merged.push({StartDate:new Date((val2.items[i].start.dateTime || val2.items[i].start.date + 'T00:00:00-08:00')).getTime()+offset, EndDate:new Date((val2.items[i].end.dateTime || val2.items[i].end.date + 'T00:00:00-08:00')).getTime()+offset, Summary:val2.items[i].summary, Description:val2.items[i].description, Calendar:val2.summary, Location:val2.items[i].location, Link:val2.items[i].htmlLink, LocalTime:localtime, LocalDate:localdate});
									}
									for (var i = 0; i < this.Athletics.items.length; i++) {
										var localdate = new Date(new Date((val3.items[i].start.dateTime || val3.items[i].start.date + 'T00:00:00-08:00')));
										var ls = new Date(new Date((val3.items[i].start.dateTime || val3.items[i].start.date + 'T00:00:00-08:00')).getTime()+offset).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
										var le = new Date(new Date((val3.items[i].end.dateTime || val3.items[i].end.date + 'T00:00:00-08:00')).getTime()+offset).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
										var localtime = (ls+" - "+le);
										merged.push({StartDate:new Date((val3.items[i].start.dateTime || val3.items[i].start.date + 'T00:00:00-08:00')).getTime()+offset, EndDate:new Date((val3.items[i].end.dateTime || val3.items[i].end.date + 'T00:00:00-08:00')).getTime()+offset, Summary:val3.items[i].summary, Description:val3.items[i].description, Calendar:val3.summary, Location:val3.items[i].location, Link:val3.items[i].htmlLink, LocalTime:localtime, LocalDate:localdate});
									}
									for (var i = 0; i < this.StudentActivities.items.length; i++) {
										var localdate = new Date(new Date((val4.items[i].start.dateTime || val4.items[i].start.date + 'T00:00:00-08:00')));
										var ls = new Date(new Date((val4.items[i].start.dateTime || val4.items[i].start.date + 'T00:00:00-08:00')).getTime()+offset).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
										var le = new Date(new Date((val4.items[i].end.dateTime || val4.items[i].end.date + 'T00:00:00-08:00')).getTime()+offset).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
										var localtime = (ls+" - "+le);
										merged.push({StartDate:new Date((val4.items[i].start.dateTime || val4.items[i].start.date + 'T00:00:00-08:00')).getTime()+offset, EndDate:new Date((val4.items[i].end.dateTime || val4.items[i].end.date + 'T00:00:00-08:00')).getTime()+offset, Summary:val4.items[i].summary, Description:val4.items[i].description, Calendar:val4.summary, Location:val4.items[i].location, Link:val4.items[i].htmlLink, LocalTime:localtime, LocalDate:localdate});
									}
									for (var i = 0; i < this.ResidentLife.items.length; i++) {
										var localdate = new Date(new Date((val5.items[i].start.dateTime || val5.items[i].start.date + 'T00:00:00-08:00')));
										var ls = new Date(new Date((val5.items[i].start.dateTime || val5.items[i].start.date + 'T00:00:00-08:00')).getTime()+offset).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
										var le = new Date(new Date((val5.items[i].end.dateTime || val5.items[i].end.date + 'T00:00:00-08:00')).getTime()+offset).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
										var localtime = (ls+" - "+le);
										merged.push({StartDate:new Date((val5.items[i].start.dateTime || val5.items[i].start.date + 'T00:00:00-08:00')).getTime()+offset, EndDate:new Date((val5.items[i].end.dateTime || val5.items[i].end.date + 'T00:00:00-08:00')).getTime()+offset, Summary:val5.items[i].summary, Description:val5.items[i].description, Calendar:val5.summary, Location:val5.items[i].location, Link:val5.items[i].htmlLink, LocalTime:localtime, LocalDate:localdate});
									}
									for (var i = 0; i < this.CampusRec.items.length; i++) {
										var localdate = new Date(new Date((val6.items[i].start.dateTime || val6.items[i].start.date + 'T00:00:00-08:00')));
										var ls = new Date(new Date((val6.items[i].start.dateTime || val6.items[i].start.date + 'T00:00:00-08:00')).getTime()+offset).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
										var le = new Date(new Date((val6.items[i].end.dateTime || val6.items[i].end.date + 'T00:00:00-08:00')).getTime()+offset).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
										var localtime = (ls+" - "+le);
										merged.push({StartDate:new Date((val6.items[i].start.dateTime || val6.items[i].start.date + 'T00:00:00-08:00')).getTime()+offset, EndDate:new Date((val6.items[i].end.dateTime || val6.items[i].end.date + 'T00:00:00-08:00')).getTime()+offset, Summary:val6.items[i].summary, Description:val6.items[i].description, Calendar:val6.summary, Location:val6.items[i].location, Link:val6.items[i].htmlLink, LocalTime:localtime, LocalDate:localdate});
									}
									merged.sort(function(a,b){return a.StartDate - b.StartDate}).forEach(event => {
										if (!this.Events[Math.floor(((event.LocalDate.getTime()+16*3600000)/86400000))]) {
											this.Events[Math.floor(((event.LocalDate.getTime()+16*3600000)/86400000))] = {times: []};
											this.Days.push([Math.floor(((event.LocalDate.getTime()+16*3600000)/86400000))]);
										}
										this.Events[Math.floor(((event.LocalDate.getTime()+16*3600000)/86400000))][event.Summary] = event;
										this.Events[Math.floor(((event.LocalDate.getTime()+16*3600000)/86400000))]['times'].push(event.Summary);
									});
								});
							});
						});
					});
				});
			});
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
}
