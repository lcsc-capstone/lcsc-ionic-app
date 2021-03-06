import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
	selector: 'page-building-details',
	templateUrl: 'building-details.html'
})
export class BuildingDetailsPage {

	building: any;
	sundayClosed: boolean = false;
	saturdayClosed: boolean = false;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.building = this.navParams.get('data');

		if (this.building.sunday.close == 'closed') {
			this.sundayClosed = true;
		}

		if (this.building.saturday.close == 'closed') {
			this.saturdayClosed = true;
		}
	}
}
