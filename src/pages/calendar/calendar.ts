import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { CalendarDropdownPage } from '../calendar-dropdown/calendar-dropdown';

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

  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController) {
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(CalendarDropdownPage);
    popover.present({
      ev: myEvent
    });
  }

}
