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
			this.showAcademic = null;
		} else {
			this.showAcademic = true;
		}
	}
	
	toggleEntertainment(){
		if(this.showEntertainment === true){
			this.showEntertainment = null;
		} else {
			this.showEntertainment = true;
		}
	}
	
	toggleStudentAcivities(){
		if(this.showStudentAcivities === true){
			this.showStudentAcivities = null;
		} else {
			this.showStudentAcivities = true;
		}
	}
	
	toggleCampusRec(){
		if(this.showCampusRec === true){
			this.showCampusRec = null;
		} else {
			this.showCampusRec = true;
		}
	}

	toggleResidentLife(){
		if(this.showResidentLife === true){
			this.showResidentLife = null;
		} else {
			this.showResidentLife = true;
		}
	}
	
	toggleWarriorAthletics(){
		if(this.showWarriorAthletics === true){
			this.showWarriorAthletics = null;
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
