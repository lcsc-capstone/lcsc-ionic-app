import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';


@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {
	private loginUsername : string = "";
	private loginPassword : string = "";

	constructor(public navCtrl: NavController, private secureStorage: SecureStorage) {
		this.secureStorage.create('credentials').then((storage : SecureStorageObject) => {
			storage.get("loginUsername").then(data => this.goToHomePage({isGuest: false}), err => {});
		});
	}

	goToHomePage(params){
		if (!params) params = {isGuest: true};
		this.navCtrl.setRoot(HomePage, params);
	}

	ionViewDidLoad() {
	}

	storeCredentials() {
		this.secureStorage.create('credentials').then((storage : SecureStorageObject) => {
			storage.set("loginUsername", this.loginUsername).then(data => this.loginUsername="", err => this.loginPassword="");
			storage.set("loginPassword", this.loginPassword).then(data => this.loginUsername="", err => this.loginPassword="");

			this.navCtrl.setRoot(HomePage, {isGuest: false});
		});
	}
}
