import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HttpClient } from '@angular/common/http';
import { BuildingDetailsPage } from '../building-details/building-details';

@Component({
	selector: 'page-building-hours',
	templateUrl: 'building-hours.html'
})
export class BuildingHoursPage {
	
	buildings:any = [];

	constructor(
		public navCtrl: NavController,
		private storage: Storage,
		private inAppBrowser: InAppBrowser,
		public loadingCtrl: LoadingController,
		public http: HttpClient
		) {
		const loading = this.loadingCtrl.create()
		loading.present();
		this.http.get('https://raw.githubusercontent.com/lcsc-capstone/lcsc-ionic-app/master/buildinghours.json')
			.subscribe( data => {
				for( let b in data['buildings'] ){
					this.buildings.push(data['buildings'][b]);
					//console.log(data['buildings'][b]);
				}
				loading.dismiss();   
			});
		}
		
		loadhours(b:any)
		{
			this.navCtrl.push(
			BuildingDetailsPage,
			{data:b}
			)
		}
}