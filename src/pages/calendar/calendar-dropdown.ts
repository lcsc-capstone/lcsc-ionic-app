import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { Events } from 'ionic-angular';
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
	constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad CalendarDropdownPage');
	}

	toggleAcademic(){
		this.events.publish('toggleAcademic');
	}

	toggleEntertainment(){
		this.events.publish('toggleEntertainment');
	}

	toggleStudentActivities(){
		this.events.publish('toggleStudentActivities');
	}

	toggleCampusRec(){
		this.events.publish('toggleCampusRec');
	}

	toggleResidentLife(){
		this.events.publish('toggleResidentLife');
	}

	toggleWarriorAthletics(){
		this.events.publish('toggleWarriorAthletics');
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
