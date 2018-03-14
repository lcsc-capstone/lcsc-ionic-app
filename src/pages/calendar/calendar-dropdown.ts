import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CalendarPage } from '../calendar/calendar';


/**
* Generated class for the CalendarDropdownPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
	selector: 'page-calendar-dropdown',
	templateUrl: 'calendar-dropdown.html',
})


export class CalendarDropdownPage {
	public showAcademic = true;
	public showAthletics = true;
	public showEntertainment = true;
	public showStudentActivities = true;
	public showCampusRec = true;
	public showResidentLife = true;
	constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, private storage: Storage) {
		events.subscribe('toggleCalendars', (ac, en, st, ca, re, wa) => {
			this.showAcademic = ac;
			this.showAthletics = wa;
			this.showEntertainment = en;
			this.showStudentActivities = st;
			this.showCampusRec = ca;
			this.showResidentLife = re;
		});
	}

	ionViewDidLoad() {
		this.events.publish('getCalendars');
	}

	ionViewDidLeave() {
		this.events.unsubscribe('toggleCalendars');
	}

	toggleAcademic(){
		this.events.publish('toggleAcademic');
		this.showAcademic = !this.showAcademic;
		this.storage.set('showAcademic', this.showAcademic);
	}

	toggleEntertainment(){
		this.events.publish('toggleEntertainment');
		this.showEntertainment = !this.showEntertainment;
		this.storage.set('showEntertainment', this.showEntertainment);
	}

	toggleStudentActivities(){
		console.log(!this.showStudentActivities)
		this.events.publish('toggleStudentActivities');
		this.showStudentActivities = !this.showStudentActivities;
		this.storage.set('showStudentActivities', this.showStudentActivities);
	}

	toggleCampusRec(){
		this.events.publish('toggleCampusRec');
		this.showCampusRec = !this.showCampusRec;
		this.storage.set('showCampusRec', this.showCampusRec);
	}

	toggleResidentLife(){
		this.events.publish('toggleResidentLife');
		this.showResidentLife = !this.showResidentLife;
		this.storage.set('showResidentLife', this.showResidentLife);
	}

	toggleWarriorAthletics(){
		this.events.publish('toggleAthletics');
		this.showAthletics = !this.showAthletics;
		this.storage.set('showAthletics', this.showAthletics);
	}


}

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
class MyPage {
	constructor(public popoverCtrl: PopoverController) {}

	presentPopover(myEvent) {
		let popover = this.popoverCtrl.create(CalendarDropdownPage);
		popover.present({
			ev: myEvent
		});
	}
}
