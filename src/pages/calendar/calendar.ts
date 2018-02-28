import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { CalendarDropdownPage } from '../calendar/calendar-dropdown';
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
	public merged = [];
	public somthing =[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];


	constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, private storage: Storage) {
	}

	ionViewDidLoad() {

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


								for (var i = 0; i < this.Academics.items.length; i++) {
									this.merged.push({StartDate: new Date((val1.items[i].start.dateTime || val1.items[i].start.date)).getTime(), EndDate: new Date((val1.items[i].end.dateTime || val1.items[i].end.date)).getTime(), Summary:val1.items[i].summary, Description:val1.items[i].description});
								}
								for (var i = 0; i < this.Entertainment.items.length; i++) {
									this.merged.push({StartDate: new Date((val2.items[i].start.dateTime || val2.items[i].start.date)).getTime(), EndDate: new Date((val2.items[i].end.dateTime || val2.items[i].end.date)).getTime(), Summary:val2.items[i].summary, Description:val2.items[i].description});
								}
								for (var i = 0; i < this.Athletics.items.length; i++) {
									this.merged.push({StartDate: new Date((val3.items[i].start.dateTime || val3.items[i].start.date)).getTime(), EndDate: new Date((val3.items[i].end.dateTime || val3.items[i].end.date)).getTime(), Summary:val3.items[i].summary, Description:val3.items[i].description});
								}
								for (var i = 0; i < this.StudentActivities.items.length; i++) {
									this.merged.push({StartDate: new Date((val4.items[i].start.dateTime || val4.items[i].start.date)).getTime(), EndDate: new Date((val4.items[i].end.dateTime || val4.items[i].end.date)).getTime(), Summary:val4.items[i].summary, Description:val4.items[i].description});
								}
								for (var i = 0; i < this.ResidentLife.items.length; i++) {
									this.merged.push({StartDate: new Date((val5.items[i].start.dateTime || val5.items[i].start.date)).getTime(), EndDate: new Date((val5.items[i].end.dateTime || val5.items[i].end.date)).getTime(), Summary:val5.items[i].summary, Description:val5.items[i].description});
								}
								for (var i = 0; i < this.CampusRec.items.length; i++) {
									this.merged.push({StartDate: new Date((val6.items[i].start.dateTime || val6.items[i].start.date)).getTime(), EndDate: new Date((val6.items[i].end.dateTime || val6.items[i].end.date)).getTime(), Summary:val6.items[i].summary, Description:val6.items[i].description});
								}
								this.merged.sort(function(a,b){return a.StartDate - b.StartDate}) // sorts the calendar events by date
								console.log(this.merged);

								});
							});val2
						});
					});
				});
			});
	}

	presentPopover(myEvent) {
		let popover = this.popoverCtrl.create(CalendarDropdownPage);
		popover.present({
			ev: myEvent
		});
	}

}
