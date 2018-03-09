import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';


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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarDropdownPage');
  }
  showAcademic = true;
	showEntertainment = true;
	showStudentActivities = true;
	showCampusRec = true;
	showResidentLife = true;
	showWarriorAthletics = true;

	toggleAcademic(){
		if(this.showAcademic === true){
			this.showAcademic = false;
		} else {
			this.showAcademic = true;
		}
	}

	toggleEntertainment(){
		if(this.showEntertainment === true){
			this.showEntertainment = false;
		} else {
			this.showEntertainment = true;
		}
	}

	toggleStudentAcivities(){
		if(this.showStudentActivities === true){
			this.showStudentActivities = false;
		} else {
			this.showStudentActivities = true;
		}
	}

	toggleCampusRec(){
		if(this.showCampusRec === true){
			this.showCampusRec = false;
		} else {
			this.showCampusRec = true;
		}
	}

	toggleResidentLife(){
		if(this.showResidentLife === true){
			this.showResidentLife = false;
		} else {
			this.showResidentLife = true;
		}
	}

	toggleWarriorAthletics(){
		if(this.showWarriorAthletics === true){
			this.showWarriorAthletics = false;
		} else {
			this.showWarriorAthletics = true;
		}
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
