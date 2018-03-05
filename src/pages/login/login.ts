import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
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

  constructor(public navCtrl: NavController, private http: Http, private storage: Storage, private secureStorage: SecureStorage) {
  }
  
	goToHomePage(params){
    if (!params) params = {};
    this.navCtrl.setRoot(HomePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  storeCredentials() {
		this.secureStorage.create('credentials').then((storage : SecureStorageObject) => {
			storage.set("loginUsername", this.loginUsername).then(data => this.loginUsername="", err => this.loginPassword="");
			storage.set("loginPassword", this.loginPassword).then(data => this.loginUsername="", err => this.loginPassword="");
		});
	}

}
