import { InAppBrowser, InAppBrowserEvent, InAppBrowserObject } from '@ionic-native/in-app-browser';
import { SecureStorage } from '@ionic-native/secure-storage';
import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

/*
  Generated class for the CredentialsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CredentialsProvider {

	warrior_web_link = 'https://www.lcsc.edu/warriorweb/'; /* changed to https */
	warrior_web_enter_selector = 'document.querySelector(\'[title="WarriorWeb"]\').click();';
	warrior_web_login_selector = "document.getElementById('acctLogin').childNodes[1].click();"
	warrior_web_error_check = 'document.querySelector(\'[class="errorText"]\') == null;';


	credentials_warriorweb = 'credentialsWarriorWeb';
	username_warriorweb = 'warriorWebUsername';
	password_warriorweb = 'passwordWarriorWeb';

	constructor(private secureStorage: SecureStorage,
		private inAppBrowser: InAppBrowser,
		private loadingController: LoadingController) {
	}

	async clearWarriorWebCredentials() {
		let storage = await this.secureStorage.create(this.credentials_warriorweb);
		storage.clear();
		await storage.remove(this.username_warriorweb);
		await storage.remove(this.password_warriorweb);
	}

	async setWarriorWebUsername(value: string) {
		let storage = await this.secureStorage.create(this.credentials_warriorweb);
		return storage.set(this.username_warriorweb, value);
	}

	async setWarriorWebPassword(value: string) {
		let storage = await this.secureStorage.create(this.credentials_warriorweb);
		return storage.set(this.password_warriorweb, value);
	}

	async getWarriorWebUsername(): Promise<string> {
		let storage = await this.secureStorage.create(this.credentials_warriorweb);
		return storage.get(this.username_warriorweb);
	}

	async getWarriorWebPassword(): Promise<string> {
		let storage = await this.secureStorage.create(this.credentials_warriorweb);
		return storage.get(this.password_warriorweb);
	}

	async warriorWebCredentialsExist(): Promise<boolean> {
		let storage = await this.secureStorage.create(this.credentials_warriorweb);
		let keys = await storage.keys();
		return (keys.indexOf(this.username_warriorweb) != -1) && (keys.indexOf(this.password_warriorweb) != -1);
	}

	async warriorWebAccessible(handler: (good: boolean) => void) {

		let loader = this.loadingController.create({
			content: 'Accessing Warrior Web...'
		});


		loader.present().then(async () => {
			let username = await this.getWarriorWebUsername();
			let password = await this.getWarriorWebPassword();

			let browser: InAppBrowserObject = this.inAppBrowser.create(this.warrior_web_link, '_blank', 'clearcache=yes,hidden=yes');

			let has_completed = false;

			setTimeout(() => {
				if(!has_completed) {
					browser.close();
					loader.dismiss();
					handler(false);
				}
			}, 90000);

			let load_count = 0;

			browser.on('loadstop').subscribe(async (ev: InAppBrowserEvent) => {
				if (load_count == 0) {
					await browser.executeScript({ code: this.warrior_web_enter_selector });
				}
				else if (load_count == 1) {
					await browser.executeScript({ code: this.warrior_web_login_selector });
				}
				else if (load_count == 2) {
					await browser.executeScript({ code: this.getLoginUsernameFillInScript(username) });
					await browser.executeScript({ code: this.getLoginPasswordFillInScript(password) });
					await browser.executeScript({ code: 'document.querySelector(\'[value="SUBMIT"]\').click();' });
				}
				else if (load_count == 3) {
					await browser.executeScript({ code: this.warrior_web_error_check }).then(result => {
						handler(result.toString() == "true"); // Implicit bool conversion any -> boolean seems to fail :/
						loader.dismiss();
						browser.close();
						has_completed = true;
					});
				}

				load_count++;
			});
		});
	}

	getLoginUsernameFillInScript(username: string) {
		return 'document.getElementById("USER_NAME").value = "' + username + '";';
	}

	getLoginPasswordFillInScript(password: string) {
		return 'document.getElementById("CURR_PWD").value = "' + password + '";';
	}
}
