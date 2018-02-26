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

	public Output: string[]=[];

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
								//console.log(this.Academics.items);
								for (var i = 0; i < this.Academics.items.length; i++) {
									console.log(val1.items[i].summary);
								}

								});
							});
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
