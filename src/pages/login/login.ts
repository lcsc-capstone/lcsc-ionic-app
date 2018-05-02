import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CredentialsProvider } from "../../providers/credentials/credentials";
import { UserStateProvider, UserState } from "../../providers/user-state/user-state";
import { Platform } from 'ionic-angular';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {
	private loginUsername: string = "";
	private loginPassword: string = "";

	constructor(public navCtrl: NavController,
		private credentialsProvider: CredentialsProvider,
		navParams: NavParams,
		private userState: UserStateProvider,
		private platform: Platform) {

		this.platform.ready().then((source) => {
			let reuse: boolean = true;
			if (navParams && navParams.get('reuse') != null) { reuse = navParams.get('reuse') };
			if (reuse) {
				this.credentialsProvider.warriorWebCredentialsExist().then(status => {
					if (status) {
						this.handleLogin();
					}
				});
			}
		});
	}

	guestAccess() {
		this.userState.updateUserState(UserState.Guest);
		this.goToHomePage({});
	}

	goToHomePage(params) {
		if (!params) {
			params = { isGuest: true };
			this.userState.updateUserState(UserState.Guest);
		}
		this.navCtrl.setRoot(HomePage, params);
	}

	ionViewDidLoad() {
	}

	storeCredentials() {
		this.credentialsProvider.setWarriorWebUsername(this.loginUsername.toLowerCase());
		this.credentialsProvider.setWarriorWebPassword(this.loginPassword);

		this.handleLogin();
	}

	handleLogin() {
		this.credentialsProvider.warriorWebAccessible((isGood: boolean) => {
			if (isGood) {
				this.userState.updateUserState(UserState.Credentialed);
				this.goToHomePage({ isGuest: false });
			}
			else {
				alert('Login failed');
			}
		});
	}
}
