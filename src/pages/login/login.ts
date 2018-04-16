import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import { CredentialsProvider } from "../../providers/credentials/credentials";
import { UserStateProvider, UserState } from "../../providers/user-state/user-state";

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {
	private loginUsername : string = "";
	private loginPassword : string = "";

	constructor(public navCtrl: NavController,
							private secureStorage: SecureStorage,
							private credentialsProvider : CredentialsProvider,
							private navParams : NavParams,
						  private userState : UserStateProvider) {

		let reuse : boolean = true;

		if (navParams && navParams.get('reuse') != null) { reuse = navParams.get('reuse') };

		if(reuse) {
			this.credentialsProvider.warriorWebCredentialsExist().then(status => {
				if(status) {
					this.handleLogin();
				}
			});
		}
	}

	goToHomePage(params){
		if (!params) {
			params = {isGuest: true};
			this.userState.updateUserState(UserState.Guest);
		}
		this.navCtrl.setRoot(HomePage, params);
	}

	ionViewDidLoad() {
	}

	storeCredentials() {
		this.credentialsProvider.setWarriorWebUsername(this.loginUsername);
		this.credentialsProvider.setWarriorWebPassword(this.loginPassword);

		this.handleLogin();
	}

	handleLogin() {
		this.credentialsProvider.warriorWebAccessible((isGood : boolean) => {
			if(isGood) {
				this.userState.updateUserState(UserState.Credentialed);
				this.goToHomePage({isGuest : false});
			}
			else {
				alert('Login failed');
			}
		});
	}
}
