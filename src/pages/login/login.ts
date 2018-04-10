import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import { CredentialsProvider } from "../../providers/credentials/credentials";

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {
	private loginUsername : string = "";
	private loginPassword : string = "";

	constructor(public navCtrl: NavController, private secureStorage: SecureStorage, private credentialsProvider : CredentialsProvider) {
		this.credentialsProvider.warriorWebCredentialsExist().then(status => {
			if(status) {
				this.goToHomePage({isGuest : false});
			}
		});
	}

	goToHomePage(params){
		if (!params) params = {isGuest: true};
		this.navCtrl.setRoot(HomePage, params);
	}

	ionViewDidLoad() {
	}

	storeCredentials() {
		this.credentialsProvider.setWarriorWebUsername(this.loginUsername);
		this.credentialsProvider.setWarriorWebPassword(this.loginPassword);

		this.goToHomePage({isGuest : false});
	}
}
