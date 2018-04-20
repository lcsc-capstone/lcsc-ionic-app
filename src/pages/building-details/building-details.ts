import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BuildingDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-building-details',
  templateUrl: 'building-details.html',
})
export class BuildingDetailsPage {
	
	building:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
	  this.building = this.navParams.get('data');
	  console.log(this.building);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuildingDetailsPage');
  }

}
